import { Routes } from '@angular/router';
import { MarketplaceComponent } from '../pages/marketplace/marketplace.component';


export enum MARKETPLACE_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: MARKETPLACE_ROUTE_NAMES.BLANK,
    component: MarketplaceComponent
  }
];
