import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchRoutingModule } from './merch-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';


@NgModule({
  declarations: [
    PAGES,
    PARTIALS
  ],
  imports: [
    CommonModule,
    MerchRoutingModule
  ]
})
export class MerchModule { }
