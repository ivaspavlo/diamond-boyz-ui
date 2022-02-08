import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";
import {Observable} from "rxjs";
import {EMarketPlaceStatus, IMarketPlaceListItem} from "@app/features/marketplace/interfaces/marketplace-list.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionComponent {
  public auctionItems$: Observable<IMarketPlaceListItem[]> = this.store.store$.pipe(map((state) => state.marketPlaces));
  public totalElements$: Observable<number> = this.store.store$.pipe(map((state) => state.totalElements));
  public loadingMore$: Observable<boolean> = this.store.store$.pipe(map((state) => state.loadingMore));

  constructor(public store: MarketplaceStoreService) {
    this.store.loadMarketPlaces(EMarketPlaceStatus.AUCTION_SALE);
  }
}
