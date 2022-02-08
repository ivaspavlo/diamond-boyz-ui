import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';


export enum MAIN_ROUTE_NAMES {
  BLANK = ''
}

export const ROUTES: Routes = [
  {
    path: MAIN_ROUTE_NAMES.BLANK,
    component: MainComponent
  }
];