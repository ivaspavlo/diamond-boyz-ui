import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITicket } from '@app/features/events/interfaces';
import { AuctionService } from '@app/features/auction/services/auction.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NFT_OBJECT_TYPE } from '@app/features/auction/interfaces';

@Component({
  selector: 'app-buy-now-modal',
  templateUrl: './buy-now-modal.component.html',
  styleUrls: ['./buy-now-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyNowModalComponent {
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public dialog: MatDialogRef<BuyNowModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      market_contract_item_id: number,
      object_type: NFT_OBJECT_TYPE,
      object_id: string,
      title: string,
      price: string,
      price_usd: string,
      image: string
    },
    private service: AuctionService
  ) { }

  buy(): void {
    this.isLoading$.next(true);
    this.buyNftObject().pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe((r) => this.close(r));
  }

  private buyNftObject(): Observable<any> {
    switch (this.data.object_type) {
      case NFT_OBJECT_TYPE.TICKET:
        return this.service.buyTicketNow(this.data.market_contract_item_id, this.data.object_id, this.data.object_type, this.data.price);
      default:
        return this.service.buyNow(this.data.market_contract_item_id, this.data.object_id, this.data.object_type)
    }
  }

  close(res: any = false): void {
    this.dialog.close(res);
  }
}
