import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundRoutingModule } from '@app/features/not-found/not-found-routing.module';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    SharedModule
  ]
})
export class NotFoundModule { }
