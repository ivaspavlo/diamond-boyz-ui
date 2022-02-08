import {Injectable, Injector} from '@angular/core';
import {ApiService} from "@app/shared/classes";
import {Observable, of} from "rxjs";
import { catchError, map } from "rxjs/operators";
import {EMarketPlaceStatus, IMarketPlaceListItem} from "@app/features/marketplace/interfaces/marketplace-list.model";
import {INft} from "@app/features/auction/interfaces";
import {IEvent} from "@app/features/events/interfaces";
import {INtfSale} from "@app/features/marketplace/interfaces";
import { IPagination } from '@app/interfaces';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MOCK_IMAGES } from '@app/interfaces/mock-images';

@Injectable()
export class MarketplaceService extends ApiService  {

  constructor(protected injector: Injector,) {
    super(injector)
  }

  public getMarketplace(status: EMarketPlaceStatus, offset: number = 0): Observable<IPagination<IMarketPlaceListItem>> {
    return super.get<IPagination<IMarketPlaceListItem>>('nfts/marketplace',  { params: { status, limit: 10, offset } }).pipe(
      map((r) => ({
        ...r,
        results: r.results.map((i) => ({
          ...i,
          // @ts-ignore
          thumbnail_desktop: MOCK_IMAGES[i.attrs.vip_general],
          // @ts-ignore
          thumbnail_mobile: MOCK_IMAGES[i.attrs.vip_general]
        }))
      })),
      catchError(() => of( {count: 0, next: '', prev: '', results: []} ) )
    )
  }

  public getSingleMarketplace(id: string): Observable<INft> {
    return super.get<INft>(`nfts/${id}`).pipe(
      map(r => {
        if (r.marketplace) {
          return {
            ...r,
            // @ts-ignore
            thumbnail_desktop: MOCK_IMAGES[r.attrs.vip_general],
            // @ts-ignore
            thumbnail_desktop_confirmation: MOCK_IMAGES[r.attrs.vip_general],
            // @ts-ignore
            thumbnail_mobile: MOCK_IMAGES[r.attrs.vip_general]
          };
        }
        // FIXME
        throw new HttpErrorResponse({
          error: 'This NFT is not on the sale',
          status: 404,
          statusText: 'This NFT is not on the sale'
        });
      })
    );
  }

  public getSingleSale(nft_sale: string): Observable<INtfSale> {
    return super.get<INtfSale>(`nfts/sales/${nft_sale}`)
  }

  public buyNFTS(id: string, txn_hash: string): Observable<void> {
    return super.post<void>(`nfts/${id}/buy/`, {txn_hash});
  }

  public getSingleEvent(id: string | number): Observable<IEvent | null> {
    return this.get<IEvent>(`events/${id}`).pipe(catchError(_ => of(null)));
  }

}
