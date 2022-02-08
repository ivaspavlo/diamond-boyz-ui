import { Routes } from '@angular/router';
import { SigninComponent } from '../pages/signin/signin.component';
import { LogoutResolver } from '@app/features/auth/services/logout.resolver';


export enum AUTH_ROUTE_NAMES {
  BLANK = '',
  LOGOUT = 'logout'
}

export const ROUTES: Routes = [
  {
    path: AUTH_ROUTE_NAMES.BLANK,
    pathMatch: 'full',
    component: SigninComponent
  },
  {
    path: AUTH_ROUTE_NAMES.LOGOUT,
    resolve: {logout: LogoutResolver}
  }
];
