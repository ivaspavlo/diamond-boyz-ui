import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './constants/main-routes.constant';


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule { }
