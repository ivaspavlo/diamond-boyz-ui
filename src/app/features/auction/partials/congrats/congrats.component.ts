import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SellType } from '@app/features/events/interfaces';
import {EMarketPlaceStatus} from "@app/features/marketplace/interfaces/marketplace-list.model";


@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CongratsComponent implements OnInit {
  readonly SellType = SellType;
  readonly MarketPlaceSaleType = EMarketPlaceStatus;

  constructor(
    public dialogRef: MatDialogRef<CongratsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {txnHash: string, sellType: SellType | EMarketPlaceStatus}
  ) { }

  ngOnInit(): void { }

  public onClick(): void {
    this.dialogRef.close(true);
  }
}
