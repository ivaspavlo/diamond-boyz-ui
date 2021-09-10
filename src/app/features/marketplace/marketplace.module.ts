import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
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
    SharedModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }
