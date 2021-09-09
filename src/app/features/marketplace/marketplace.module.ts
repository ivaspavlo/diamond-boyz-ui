import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { COMPONETS } from './pages';
import { PARTIALS } from './partials';


@NgModule({
  declarations: [
    ...COMPONETS,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }
