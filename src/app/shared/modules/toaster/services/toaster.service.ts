import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { ToastComponent } from '../container/toast.component';
import { IToastData } from '../interfaces';


@Injectable()
export class ToasterService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public show(data: IToastData = { state: 'info' }, duration: number = 5000, posX: MatSnackBarHorizontalPosition = 'end', posY: MatSnackBarVerticalPosition = 'bottom'): void {
    this.snackBar.openFromComponent(
      ToastComponent,
      {
        data,
        duration,
        horizontalPosition: posX,
        verticalPosition: posY,
      }
    );
  }

  public hide(): void {
    this.snackBar.dismiss();
  }

}
