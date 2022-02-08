import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { IToastData } from '../interfaces';
import { ToasterService } from '../services/toaster.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: IToastData,
    public toasterService: ToasterService
  ) { }

}
