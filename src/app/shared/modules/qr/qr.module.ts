import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

import { QrComponent } from './container/qr.component';


@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule
  ],
  exports: [
    QrComponent
  ]
})
export class QrModule { }
