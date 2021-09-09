import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PAGES } from './pages';
import { TicketsRoutingModule } from './tickets-routing.module';


@NgModule({
  declarations: [
    ...PAGES
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule
  ]
})
export class TicketsModule { }
