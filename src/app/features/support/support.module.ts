import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './pages/support/support.component';
import { SharedModule } from "@app/shared/shared.module";
import { SupportRoutingModule } from "@app/features/support/support-routing.module";



@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
