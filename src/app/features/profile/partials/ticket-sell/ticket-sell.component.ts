import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '@app/features/profile/services/profile.service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ticket-sell',
  templateUrl: './ticket-sell.component.html',
  styleUrls: ['./ticket-sell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketSellComponent implements OnInit {
  amount: number;
  fiat$: Observable<number>;
  ticketId: string;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProfileService,
    private location: Location
  ) {
  }

  ngOnInit(): void {
    const params = this.getParams(this.route);

    if (params.hasOwnProperty('ticketId')) {
      this.ticketId = params.ticketId;
    }

    this.fiat$ = of(0);
  }

  postListing(): void {
    this.isLoading$.next(true);
    this.service.createMarketplaceItem(this.ticketId, this.amount).pipe(
      catchError(err => {
        return throwError(err);
      }),
      finalize(() => this.isLoading$.next(false))
    ).subscribe(() => {
      this.router.navigateByUrl('/profile/sale', {replaceUrl: true});
    });
  }

  private getParams(route: ActivatedRoute): {[key: string]: string} {
    let params = {};
    while (route.firstChild) {
      params = Object.assign(params, route.firstChild.snapshot.params);
      route = route.firstChild;
    }
    return params;
  }

  back(): void {
    this.location.back();
  }
}

// TODO: implement only numbers
