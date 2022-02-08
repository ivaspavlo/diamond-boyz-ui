import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { PARTIALS } from './partials';
import { PAGES } from './pages';
import {EventService} from "@app/features/events/services";


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  providers: [EventService],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
