import { Inject, Injectable, Injector } from '@angular/core';
import { ApiService } from '@app/shared/classes';
import { forkJoin, from, Observable, of } from 'rxjs';
import { IAuction, IAuctionOffer, INft, NFT_OBJECT_TYPE } from '@app/features/auction/interfaces';
import { ITicket } from '@app/features/events/interfaces';
import { WINDOW } from '@app/core/providers';
import { DBZ_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from '@env/environment';
import { AuthService } from '@app/core/services';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import { BigNumber, Contract, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { DBZ_ABI, MARKET_ABI, NFT_ABI } from '@app/interfaces';
import { ToasterService } from '@app/shared/modules/toaster/services/toaster.service';
import { MOCK_IMAGES } from '@app/interfaces/mock-images';

@Injectable({
  providedIn: 'root'
})
export class AuctionService extends ApiService {
  private marketContract: Contract;
  private dbzContract: Contract;
  private nftContract: Contract;
  private provider: Web3Provider;

  constructor(
    protected injector: Injector,
    private auth: AuthService,
    private toast: ToasterService,
    @Inject(WINDOW) private window: Window
  ) {
    super(injector);
    // @ts-ignore
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    const signer = this.provider.getSigner();
    this.marketContract = new ethers.Contract(MARKET_CONTRACT_ADDRESS, MARKET_ABI, signer);
    this.nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
    this.dbzContract = new ethers.Contract(DBZ_CONTRACT_ADDRESS, DBZ_ABI, signer);
  }

  getAuction(id: string): Observable<IAuction> {
    return this.get<IAuction>(`auctions/${id}`);
  }

  getOffers(id: string): Observable<IAuctionOffer[]> {
    return this.get(`auctions/${id}/offers`);
  }

  getTicket(eventId: string, ticketId: any): Observable<ITicket> {
    return this.get<ITicket>(`events/${eventId}/tickets/${ticketId}`).pipe(
      map(ticket => ({
        ...ticket,
        // @ts-ignore
        thumbnail_desktop: MOCK_IMAGES[ticket.zone_id],
        // @ts-ignore
        thumbnail_desktop_marketplace_by_now_confirmation: MOCK_IMAGES[ticket.zone_id],
        // @ts-ignore
        thumbnail_desktop_ticket_details: MOCK_IMAGES[ticket.zone_id],
        // @ts-ignore
        thumbnail_mobile: MOCK_IMAGES[ticket.zone_id]
      }))
    );
  }

  getNFT(token_id: string): Observable<INft> {
    return this.get(`nfts/${token_id}`);
  }

  // TODO: return type annotation
  /** Buy ticket hash */
  submitTicketHash(ticketId: string, tr: any): Observable<any> {
    /*return super.post(`events/tickets/${ticketId}/buy`, {txn_hash: tr.hash}).pipe(
      switchMap(() => from(tr.wait())),
      catchError((err) => {
        this.showError(err);
        return of(null);
      })
    );*/

    return from(tr.wait()).pipe(
      catchError((err) => {
        this.showError(err);
        return of(null);
      })
    );
  }

  // TODO: return type annotation
  /** Buy from marketplace hash */
  submitNftHash(nftId: string, tr: any): Observable<any> {
    // return super.post(`nfts/${nftId}/buy`, {txn_hash: tr.hash}).pipe(
    //   switchMap(() => from(tr.wait())),
    //   catchError((err) => {
    //     this.showError(err);
    //     return of(null);
    //   })
    // );

    return from(tr.wait()).pipe(
      catchError((err) => {
        this.showError(err);
        return of(null);
      })
    );
  }

  buyNow(scItemId: number, objectId: string, objectType: NFT_OBJECT_TYPE, nftContract: string = NFT_CONTRACT_ADDRESS): Observable<any> {
    return this.auth.checkSigner().pipe(
      switchMap(() => from<Observable<BigNumber>>(this.marketContract.getItemPrice(scItemId))),
      switchMap((dbz) => forkJoin({
        dbz: of(dbz),
        tr: from(this.dbzContract.approve(
          MARKET_CONTRACT_ADDRESS,
          dbz.toString()
        ))
      })),
      switchMap(({dbz, tr}) => {
        return forkJoin({
          dbz: of(dbz),
          // @ts-ignore
          receipt: from(tr.wait())
        })
      }),
      // @ts-ignore
      switchMap(({dbz}) => from(this.marketContract.createMarketSale(
        scItemId,
        dbz.toString()
      ))),
      // @ts-ignore
      switchMap((tr) => this.submitHash(objectType, objectId, tr)),
      catchError((err) => {
        this.showError(err);
        return of(null);
      })
    );
  }

  buyTicketNow(tokenId: number, objectId: string, objectType: NFT_OBJECT_TYPE.TICKET, price: string, nftContract: string = NFT_CONTRACT_ADDRESS): Observable<any> {
    // TODO: RECHECK PRICE
    // @ts-ignore
    return this.auth.checkSigner().pipe(
      // switchMap(() => {
      //   debugger
      //   return from(this.nftContract.getTicket(Number(0)))
      // }),
      // map((res) => {
      //   debugger
      //   return res;
      // }),
      map(() => ethers.utils.parseEther(price)),
      switchMap((dbz) => forkJoin({
        dbz: of(dbz),
        tr: from(this.dbzContract.approve(
          MARKET_CONTRACT_ADDRESS,
          dbz.toString()
        ))
      })),
      // @ts-ignore
      switchMap(({dbz, tr}) => from(tr.wait()).pipe(map(() => dbz))),
      // @ts-ignore
      switchMap((dbz: BigNumber) => from(this.marketContract.initialTicketSale(
        tokenId,
        dbz.toString()
      ))),
      // @ts-ignore
      switchMap((tr) => this.submitHash(objectType, objectId, tr)),
      catchError((err) => {
        this.showError(err);
        return of(null);
      })
    );
  }

  submitHash(objectType: NFT_OBJECT_TYPE, objectId: string, tr: any): Observable<any> {
    switch(objectType) {
      case NFT_OBJECT_TYPE.NFT:
        return this.submitNftHash(objectId, tr);
      case NFT_OBJECT_TYPE.TICKET:
        return this.submitTicketHash(objectId, tr);
      case NFT_OBJECT_TYPE.MERCH:
        /* TODO: MERCH hash */
        return of(null);
    }
  }

  //TODO implement error handler per each status from metamask https://docs.metamask.io/guide/ethereum-provider.html#errors
  // separate error handler for our backend
  private showError(err: any): void {
    if(!err) {
      return
    }
    if(typeof err === 'string') {
      if(err?.includes('code":-32603')
        || err.includes('in status bought')
        || err?.includes('nonce has already been used')) {
        this.toast.show({ state: 'error', header: 'Error', text: 'This ticket has already been bought' });
      }
    } else if(typeof err !== 'string') {
      if((err?.code === -32603 && (err?.message?.includes('already known') || err.toString().includes('transfer caller is not owner nor approved')))
        || err?.detail?.includes('in status bought')
        || JSON.stringify(err).includes('This tokenId is already sold')
        || JSON.stringify(err).includes("Active sale doesn't exists")
        || JSON.stringify(err).includes("is not on the sale")
        || JSON.stringify(err).includes("This NFT is not on the sale")
        || err.toString().includes('nonce has already been used')
      ) {
        this.toast.show({ state: 'error', header: 'Error', text: 'This ticket has already been bought' });
      }
      else if(JSON.stringify(err).includes('amount exceeds balance')) {
        this.toast.show({ state: 'error', header: 'Error', text: 'There is not enough money in the metamask wallet'});
      } else if(JSON.stringify(err).includes('User denied transaction signature')) {
        this.toast.show({ state: 'error', header: 'Error', text: 'User denied transaction signature'});
      }
    }
  }
}
