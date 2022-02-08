import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerModule } from '@app/shared/modules';

import { AuctionRoutingModule } from './auction-routing.module';
import { PAGES } from './pages';
import { COMPONENTS } from './partials';
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    ...PAGES,
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    AuctionRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    SpinnerModule,
    SharedModule,
    ClipboardModule
  ]
})
export class AuctionModule { }
