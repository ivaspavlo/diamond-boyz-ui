import { Routes } from '@angular/router';
import { ProfileComponent } from '../pages/profile/profile.component';
import { ProfileTabs } from './profile-tabs.constant';
import { ProfileTicketComponent } from '../pages/profile-ticket/profile-ticket.component';
import { DialogEntryComponent } from '@app/shared/components/dialog-entry/dialog-entry.component';
import { TicketSellComponent } from '../partials/ticket-sell/ticket-sell.component';


export enum PROFILE_ROUTE_NAMES {
  BLANK = '',
  PROFILE_TAB = ':tab',
  TICKET_DETAILS = ':tab/:ticketId',
  SELL_TICKET = 'sell' // TODO: change to 'tickets/:id/sell' when will be a page
}

export const ROUTES: Routes = [
  {
    path: PROFILE_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    redirectTo: ProfileTabs.tickets.id
  }, {
    path: PROFILE_ROUTE_NAMES.PROFILE_TAB,
    component: ProfileComponent
  }, {
    path: PROFILE_ROUTE_NAMES.TICKET_DETAILS,
    component: ProfileTicketComponent,
    children: [
      {
        path: PROFILE_ROUTE_NAMES.SELL_TICKET,
        component: DialogEntryComponent,
        data: {
          component: TicketSellComponent
        }
      }
    ]
  }
];
