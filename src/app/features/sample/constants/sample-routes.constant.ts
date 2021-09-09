import { Routes } from '@angular/router';

import { SampleContainerComponent } from '../pages/sample-container/sample-container.component';
import { SampleOtherPageComponent } from '../pages/sample-other-page/sample-other-page.component';


export enum SAMPLE_ROUTE_NAMES {
  BLANK = '',
  SAMPLE = 'sample'
}

export const ROUTES: Routes = [
  {
    path: SAMPLE_ROUTE_NAMES.BLANK,
    component: SampleContainerComponent,
    children: [
      {
        path: SAMPLE_ROUTE_NAMES.SAMPLE,
        component: SampleOtherPageComponent
      }
    ]
  }
];
