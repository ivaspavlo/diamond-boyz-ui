import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportComponent } from "@app/features/support/pages/support/support.component";

const ROUTES: Routes = [
  {
    path: '',
    component: SupportComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class SupportRoutingModule { }
