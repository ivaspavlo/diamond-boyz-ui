import { Routes } from '@angular/router';

import { BuyNowComponent } from '../pages/buy-now/buy-now.component';
import { AuctionComponent } from '../pages/auction/auction.component';
import {MarketplaceDetailsComponent} from "@app/features/marketplace/pages/marketplace-details/marketplace-details.component";


export enum MARKETPLACE_ROUTE_NAMES {
  BLANK = '',
  BUYNOW = 'buynow',
  AUCTION = 'auction',
  DETAIL = ':id'
}

export const ROUTES: Routes = [
  {
    path: MARKETPLACE_ROUTE_NAMES.BLANK,
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
      }, {
        path: MARKETPLACE_ROUTE_NAMES.DETAIL,
        component: MarketplaceDetailsComponent
      }
    ]
  }
];
