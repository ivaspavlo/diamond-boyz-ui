import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ITicket } from '@app/features/events/interfaces';
import { PlaceBidComponent } from '@app/features/auction/partials/place-bid/place-bid.component';
import { IAuction, IAuctionOffer } from '@app/features/auction/interfaces';
import { AuctionService } from '@app/features/auction/services/auction.service';
import { CongratsComponent } from '../congrats/congrats.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auction-details',
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionDetailsComponent implements OnInit {
  
  @Input() ticket: ITicket;

  auction$: Observable<IAuction>;
  offers$: Observable<IAuctionOffer[]>;

  constructor(
    private dialog: MatDialog,
    private auctionService: AuctionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auction$ = of(this.ticket.auction_id).pipe(
      filter(id => id !== null),
      tap(id => this.offers$ = this.auctionService.getOffers(id as string)),
      switchMap(id => this.auctionService.getAuction(id as string))
    );
  }

  placeBid(): void {
    this.dialog.open(PlaceBidComponent, { panelClass: 'app-dialog-container' }).afterClosed().pipe(
      switchMap((res: any) => {
        return res ?
          this.dialog.open(CongratsComponent, { panelClass: 'app-dialog-container' }).afterClosed(): 
          of(false);
      })
    ).subscribe((res: boolean) => {
      if (res) {
        this.router.navigateByUrl('/marketplace');
      }
    });
  }

}
