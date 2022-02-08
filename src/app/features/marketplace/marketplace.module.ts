import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { COMPONETS } from './pages';
import { PARTIALS } from './partials';
import {MarketplaceService} from "@app/features/marketplace/services/marketplace.service";
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";
import {SpinnerModule, ToasterModule} from "@app/shared/modules";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ...COMPONETS,
    ...PARTIALS,
  ],
    imports: [
      CommonModule,
      SharedModule,
      MarketplaceRoutingModule,
      SpinnerModule,
      MatDialogModule,
      ToasterModule
    ],
  providers: [MarketplaceService, MarketplaceStoreService]
})
export class MarketplaceModule { }
