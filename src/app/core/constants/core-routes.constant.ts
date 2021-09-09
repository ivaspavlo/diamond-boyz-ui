import { Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard'; // canActivate: [AuthGuard], TODO: uncomment when roles are implemented

import { CoreComponent } from '../pages/core/core.component';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  AUTH = 'auth',
  MARKETPLACE = 'marketplace',
  TICKETS = 'tickets',
  OTHER = '**',
  NOT_FOUND = '404'
}

export const ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.AUTH,
    loadChildren: () => import('@app/features/auth/auth.module').then(m => m.AuthModule)
  }, {
    path: CORE_ROUTE_NAMES.BLANK,
    component: CoreComponent,
    children: [
      {
        path: CORE_ROUTE_NAMES.BLANK,
        pathMatch: 'full',
        redirectTo: CORE_ROUTE_NAMES.MARKETPLACE
      }, {
        path: CORE_ROUTE_NAMES.MARKETPLACE,
        loadChildren: () => import('@app/features/marketplace/marketplace.module').then(m => m.MarketplaceModule)
      }, {
        path: CORE_ROUTE_NAMES.TICKETS,
        loadChildren: () => import('@app/features/tickets/tickets.module').then(m => m.TicketsModule)
      }
    ]
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND
  }, {
    path: CORE_ROUTE_NAMES.NOT_FOUND,
    loadChildren: () => import('@app/features/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];
