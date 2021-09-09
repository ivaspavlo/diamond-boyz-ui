import { Routes } from '@angular/router';
import { SigninComponent } from '../pages/signin/signin.component';


export enum CORE_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: CORE_ROUTE_NAMES.BLANK,
    component: SigninComponent
  }
];