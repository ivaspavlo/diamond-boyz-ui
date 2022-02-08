import { Routes } from '@angular/router';
import { AuthGuard } from '../guards';

import { CoreComponent } from '../pages/core/core.component';


export enum CORE_ROUTE_NAMES {
  BLANK = '',
  MAIN = 'main',
  AUTH = 'auth',
  MARKETPLACE = 'marketplace',
  EVENTS = 'events',
  PROFILE = 'profile',
  MERCH = 'merch',
  SUPPORT = 'support',
  OTHER = '**',
  NOT_FOUND = 'not-found'
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
        redirectTo: CORE_ROUTE_NAMES.MAIN
      }, {
        path: CORE_ROUTE_NAMES.MAIN,
        loadChildren: () => import('@app/features/main/main.module').then(m => m.MainModule)
      }, {
        path: CORE_ROUTE_NAMES.MARKETPLACE,
        loadChildren: () => import('@app/features/marketplace/marketplace.module').then(m => m.MarketplaceModule)
      }, {
        path: CORE_ROUTE_NAMES.EVENTS,
        loadChildren: () => import('@app/features/events/events.module').then(m => m.EventsModule)
      }, {
        path: CORE_ROUTE_NAMES.PROFILE,
        canLoad: [AuthGuard],
        loadChildren: () => import('@app/features/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: CORE_ROUTE_NAMES.MERCH,
        loadChildren: () => import('@app/features/merch/merch.module').then(m => m.MerchModule)
      }, {
        path: CORE_ROUTE_NAMES.NOT_FOUND,
        loadChildren: () => import('@app/features/not-found/not-found.module').then(m => m.NotFoundModule)
      }, {
        path: CORE_ROUTE_NAMES.SUPPORT,
        loadChildren: () => import('@app/features/support/support.module').then(m => m.SupportModule)
      }
    ]
  }, {
    path: CORE_ROUTE_NAMES.OTHER,
    pathMatch: 'full',
    redirectTo: CORE_ROUTE_NAMES.NOT_FOUND
  }
];
