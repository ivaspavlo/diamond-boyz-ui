import { Component, ChangeDetectionStrategy } from '@angular/core';
import {map} from "rxjs/operators";
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";
import {EMarketPlaceStatus, IMarketPlaceListItem} from "@app/features/marketplace/interfaces/marketplace-list.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyNowComponent {
  public buyNowItems$: Observable<IMarketPlaceListItem[]> = this.store.store$.pipe(map((state) => state.marketPlaces))
  public totalElements$: Observable<number> = this.store.store$.pipe(map((state) => state.totalElements));
  public loadingMore$: Observable<boolean> = this.store.store$.pipe(map((state) => state.loadingMore));

  constructor(public store: MarketplaceStoreService) {
    this.store.loadMarketPlaces(EMarketPlaceStatus.FIXED_PRICE_SALE);
  }

}
