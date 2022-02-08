import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from '@app/features/auction/constants';


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AuctionRoutingModule { }
