import { Injectable, Injector } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin, from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '@app/shared/classes';
import { IProfileTicket } from '../interfaces';
import { Contract, ethers } from 'ethers';
import { MARKET_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from '@env/environment';
import { AuthService, IPagination, MARKET_ABI, NFT_ABI } from '@app/interfaces';
import { INft } from '@app/features/auction/interfaces';
import {PaginationDefaultValue} from "@app/shared/utils";
import { MOCK_IMAGES } from '@app/interfaces/mock-images';


@Injectable()
export class ProfileService extends ApiService {
  private marketContract: Contract;
  private nftContract: Contract;

  constructor(
    protected injector: Injector,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {
    super(injector);
    if(window.ethereum) {
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any'); //TODO: handle if metamask is not installed
      const signer = provider.getSigner();
      this.marketContract = new ethers.Contract(MARKET_CONTRACT_ADDRESS, MARKET_ABI, signer);
      this.nftContract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
    }
  }

  public getQR(): Observable<SafeResourceUrl> {
    return this.httpClient.get<{qr: string}>(`${this.apiUrl}/mobile/api/v1/auth/qr/`).pipe(
      map(r => this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${r.qr}`))
    );
  }

  public getTicketQR(ticketId: string): Observable<{ ended_timestamp: number, qr: SafeResourceUrl }> {
    return super.get<{ ended_timestamp: number, qr: string }>(`users/profile/tokens/${ticketId}/qr`).pipe(
      map((r: { ended_timestamp: number, qr: string }) => {
        return {
          ended_timestamp: r.ended_timestamp,
          qr: this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${r.qr}`)
        }
      })
    );
  }

  public getTickets(offset: number = 0): Observable<IPagination<IProfileTicket>> {
    return super.get<IPagination<IProfileTicket>>('users/profile/tokens', { params: { object_type: 'ticket', on_sale: false, limit: 10, offset } }).pipe(
      map(r => ({
        ...r,
        results: r.results.map((i) => ({
          ...i,
          // @ts-ignore
          thumbnail_desktop: MOCK_IMAGES[i.attrs.vip_general],
          // @ts-ignore
          thumbnail_mobile: MOCK_IMAGES[i.attrs.vip_general]
        }))
      })),
      catchError(_ => of(PaginationDefaultValue()))
    );
  }

  public getCollections(offset: number = 0): Observable<any> {
    return super.get<IPagination<IProfileTicket>>('users/profile/tokens', { params: { limit: 10, offset }}).pipe(
      map(r => ({
        ...r,
        results: r.results.map((i) => ({
          ...i,
          // @ts-ignore
          thumbnail_desktop: MOCK_IMAGES[i.attrs.vip_general],
          // @ts-ignore
          thumbnail_mobile: MOCK_IMAGES[i.attrs.vip_general]
        }))
      })),
      catchError(_ => of(PaginationDefaultValue()))
    );
  }

  public getSale(offset: number = 0): Observable<any> {
    return super.get<IPagination<IProfileTicket>>('users/profile/tokens', { params: { on_sale: true, limit: 10, offset } }).pipe(
      map(r => ({
        ...r,
        results: r.results.map((i) => ({
          ...i,
          // @ts-ignore
          thumbnail_desktop: MOCK_IMAGES[i.attrs.vip_general],
          // @ts-ignore
          thumbnail_mobile: MOCK_IMAGES[i.attrs.vip_general]
        }))
      })),
      catchError(_ => of(PaginationDefaultValue()))
    );
  }

  public getNFT(id: string): Observable<INft> {
    return super.get<INft>(`users/profile/tokens/${id}`).pipe(
      map(nft => ({
        ...nft,
        // @ts-ignore
        thumbnail_desktop: MOCK_IMAGES[nft.attrs.vip_general],
        // @ts-ignore
        thumbnail_desktop_confirmation: MOCK_IMAGES[nft.attrs.vip_general],
        // @ts-ignore
        thumbnail_mobile: MOCK_IMAGES[nft.attrs.vip_general]
      }))
    );
  }

  // TODO: return type annotation
  public createMarketplaceItem(ticketId: string, priceDBZ: number, nftContract = NFT_CONTRACT_ADDRESS): Observable<any> {
    const weiPrice = ethers.utils.parseUnits(`${priceDBZ}`);
    return this.auth.checkSigner().pipe(
      switchMap(() => this.getNFT(ticketId)),
      switchMap((ticket) => forkJoin({
        ticket: of(ticket),
        receipt: this.nftContract.approve(MARKET_CONTRACT_ADDRESS, ticket.token_id)
      })),
      switchMap(({ticket, receipt }) => {
        // @ts-ignore
        return from(receipt.wait()).pipe(map(() => ticket))
      }),
      switchMap((ticket) => from<Observable<{hash: string}>>(this.marketContract.createMarketItem(ticket.token_id, weiPrice))),
      // switchMap((tr) => this.confirmMarketplaceTransaction(tr.hash).pipe(map(() => tr))),
      // @ts-ignore
      switchMap(tr => from(tr.wait()))
    )
  }

  // TODO: create EventService in the Core
  public getEvent(eventId: number): Observable<any> {
    return this.get(`events/${eventId}`);
  }

  // TODO: return type annotation
  private confirmMarketplaceTransaction(txn_hash: string): Observable<any> {
    return super.post(`nfts/sales`, {txn_hash})
  }

  // TODO: return type annotation
  cancelListing(ticketId: string): Observable<any> {
    return this.auth.checkSigner().pipe(
      switchMap(() => this.getNFT(ticketId)),
      switchMap((nft: INft) => this.marketContract.cancelMarketItem(nft.marketplace.nft_sale.market_contract_item_id)),
      // @ts-ignore
      switchMap(tx => tx.wait())
    );
  }
}
