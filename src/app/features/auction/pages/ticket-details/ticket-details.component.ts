import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { DestroySubscriptions } from '@app/shared/classes';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AuctionService } from '@app/features/auction/services/auction.service';
import { ITicket, SellType } from '@app/features/events/interfaces';
import { NFT_CONTRACT_ADDRESS } from '@env/environment';
import {WINDOW} from "@app/core/providers";

export enum TOKEN_DETAILS {
  DESCRIPTION,
  DETAILS
}

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketDetailsComponent extends DestroySubscriptions implements OnInit {
  ticket$: Observable<ITicket>;

  view: TOKEN_DETAILS = TOKEN_DETAILS.DESCRIPTION;
  eventId: number;
  nft$: Observable<any>;

  readonly SellType = SellType;
  readonly contractAddress = NFT_CONTRACT_ADDRESS;
  readonly TOKEN_DETAILS = TOKEN_DETAILS;

  constructor(
    private route: ActivatedRoute,
    private service: AuctionService,
    @Inject(WINDOW) private window: Window
  ) {
    super();
  }

  ngOnInit(): void {
    this.window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.ticket$ = this.route.params.pipe(
      takeUntil(this.componentDestroyed$),
      tap(({ id }) => { this.eventId = id; }),
      switchMap(({id, ticketId}) => this.service.getTicket(id, ticketId)),
      tap(({token_id}) => {
        if (token_id !== null) {
          this.nft$ = this.service.getNFT(token_id);
        }
      }),
    )
  }
}
