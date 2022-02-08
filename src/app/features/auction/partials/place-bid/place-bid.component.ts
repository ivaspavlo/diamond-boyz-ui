import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CurrencyList } from '../../constants/currency-list.constant';
import { ICurrencyItem } from '../../../../interfaces/currency-item.interface';


@Component({
  selector: 'app-place-bid',
  templateUrl: './place-bid.component.html',
  styleUrls: ['./place-bid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceBidComponent implements OnInit {

  public form: FormGroup;
  public currencyList: ICurrencyItem[] = CurrencyList;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PlaceBidComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      bid: ['', Validators.required],
      currency: [this.currencyList[0], Validators.required]
    });
  }

  public onPlaceBid(): void {
    this.dialogRef.close(this.form.value);
  }

}
