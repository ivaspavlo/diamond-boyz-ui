import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './constants/events-routes.constant';


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class EventsRoutingModule { }
