import { Routes } from '@angular/router';

import { MarketplaceComponent } from '../pages/marketplace/marketplace.component';
import { BuyNowComponent } from '../pages/buy-now/buy-now.component';
import { AuctionComponent } from '../pages/auction/auction.component';


export enum MARKETPLACE_ROUTE_NAMES {
  BLANK = '',
  BUYNOW = 'buynow',
  AUCTION = 'auction'
}

export const ROUTES: Routes = [
  {
    path: MARKETPLACE_ROUTE_NAMES.BLANK,
    component: MarketplaceComponent,
    children: [
      {
        path: MARKETPLACE_ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: MARKETPLACE_ROUTE_NAMES.BUYNOW
      }, {
        path: MARKETPLACE_ROUTE_NAMES.BUYNOW,
        component: BuyNowComponent
      }, {
        path: MARKETPLACE_ROUTE_NAMES.AUCTION,
        component: AuctionComponent
      }
    ]
  }
];
