import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './constants/auth-routes.constant';


@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
