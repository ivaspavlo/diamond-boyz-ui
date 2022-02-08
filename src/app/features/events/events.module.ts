import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { SharedModule } from '@app/shared/shared.module';
import { SpinnerModule } from '@app/shared/modules';

import { PAGES } from './pages';
import { PARTIALS } from './partials';
import { SERVICES } from './services';
import { PIPES } from './pipes';

import { EventsRoutingModule } from './events-routing.module';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS,
    ...PIPES
  ],
  providers: [
    ...SERVICES
  ],
  imports: [
    CommonModule,
    SharedModule,
    SpinnerModule,
    SwiperModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
