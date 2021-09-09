import { Routes } from '@angular/router';
import { TicketsComponent } from '../pages/tickets/tickets.component';


export enum TICKETS_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: TICKETS_ROUTE_NAMES.BLANK,
    component: TicketsComponent
  }
];