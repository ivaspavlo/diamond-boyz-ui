import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './constants/marketplace-routes.constant';


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class MarketplaceRoutingModule { }