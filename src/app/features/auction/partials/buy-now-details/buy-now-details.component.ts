import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { ITicket, SellType, TicketStatus } from '@app/features/events/interfaces';
import { AuctionService } from '@app/features/auction/services/auction.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyNowModalComponent } from '@app/features/auction/partials/buy-now-modal/buy-now-modal.component';
import { INft, NFT_OBJECT_TYPE } from '@app/features/auction/interfaces';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CongratsComponent } from '@app/features/auction/partials/congrats/congrats.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-now-details',
  templateUrl: './buy-now-details.component.html',
  styleUrls: [
    '../auction-details/auction-details.component.scss',
    './buy-now-details.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuyNowDetailsComponent {
  @Input() ticket: ITicket;
  @Output() refresh = new EventEmitter<void>();
  readonly TicketStatus = TicketStatus;

  constructor(
    private service: AuctionService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  buyNow() {
    this.dialog.open(BuyNowModalComponent, {
      data: {
        market_contract_item_id: this.ticket.token_id,
        object_type: NFT_OBJECT_TYPE.TICKET,
        object_id: this.ticket.id,
        title: this.ticket.title,
        price: this.ticket.price,
        price_usd: this.ticket.price_usd,
        image: this.ticket.thumbnail_desktop_marketplace_by_now_confirmation
      },
      closeOnNavigation: true
    }).afterClosed().pipe(
      switchMap((res) => {
        if (res) {
          return this.dialog.open(CongratsComponent, {
            data: {
              txnHash: res.transactionHash,
              sellType: SellType.FIXED_PRICE
            }
          }).afterClosed();
        }

        return of(null);
      })
    ).subscribe(res => {
      if (res !== null) {
        this.router.navigate(['/events', 1]);
      } else {
        this.refresh.emit();
      }
    });
  }
}
