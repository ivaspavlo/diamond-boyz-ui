import { Routes } from '@angular/router';
import { MerchComponent } from '../pages/merch/merch.component';


export enum SAMPLE_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: SAMPLE_ROUTE_NAMES.BLANK,
    component: MerchComponent
  }
];
