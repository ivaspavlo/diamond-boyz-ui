import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IEvent, SellType} from "@app/features/events/interfaces";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {CongratsComponent} from "@app/features/auction/partials/congrats/congrats.component";
import {of} from "rxjs";
import {ENtfSaleStatus} from "@app/features/marketplace/interfaces/ntf-sale";
import { INft, NFT_OBJECT_TYPE } from "@app/features/auction/interfaces";
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";
import {BuyNowModalComponent} from "@app/features/auction/partials/buy-now-modal/buy-now-modal.component";

@Component({
  selector: 'app-marketplace-buy-now',
  templateUrl: './marketplace-buy-now.component.html',
  styleUrls: ['./marketplace-buy-now.component.scss']
})
export class MarketplaceBuyNowComponent {

  @Input() marketplace: INft | null;
  @Input() event: IEvent | null;

  @Output() refresh = new EventEmitter<void>();

  readonly eNtfSaleStatus = ENtfSaleStatus;

  constructor(
    private store: MarketplaceStoreService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  buyNow(): void {
    this.dialog.open(BuyNowModalComponent, {
      data: {
        market_contract_item_id: this.marketplace?.marketplace?.nft_sale?.market_contract_item_id,
        object_type: NFT_OBJECT_TYPE.NFT,
        object_id: this.marketplace?.id,
        title: this.event?.title,
        price: this.marketplace?.marketplace?.nft_sale?.price?.dbz,
        price_usd: this.marketplace?.marketplace?.nft_sale?.price?.usd,
        image: this.marketplace?.thumbnail_desktop_confirmation
      }
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
        this.router.navigateByUrl('marketplace/buynow', {replaceUrl: true});
      } else {
        this.refresh.emit();
      }
    });
  }

}
