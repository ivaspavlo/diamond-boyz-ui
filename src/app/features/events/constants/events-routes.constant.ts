import { Routes } from '@angular/router';
import { MainEventComponent } from '../pages/main-event/main-event.component';
import { EventComponent } from '../pages/event/event.component';


export enum EVENTS_ROUTE_NAMES {
  BLANK = '',
  TICKETS = ':id',
  BUY_TICKET = ':id/buy/:ticketId',

}

export const ROUTES: Routes = [
  {
    path: EVENTS_ROUTE_NAMES.BLANK,
    component: MainEventComponent
  }, {
    path: EVENTS_ROUTE_NAMES.TICKETS,
    component: EventComponent
  }, {
    path: EVENTS_ROUTE_NAMES.BUY_TICKET,
    loadChildren: () => import('@app/features/auction/auction.module').then(m => m.AuctionModule)
  }
];
