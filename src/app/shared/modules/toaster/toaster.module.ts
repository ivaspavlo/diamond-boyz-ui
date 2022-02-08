import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ToasterService } from './services/toaster.service';
import { ToastComponent } from './container/toast.component';


@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [
    ToasterService
  ]
})
export class ToasterModule { }
