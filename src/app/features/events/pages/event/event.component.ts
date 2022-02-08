import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { IEvent, ITicket, ITicketsCount, SellType } from '../../interfaces';
import { EventService } from '../../services';
import {IPagination} from "@app/interfaces";
import {PaginationDefaultValue} from "@app/shared/utils";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {
  public fixed_price: IPagination<ITicket> = PaginationDefaultValue();
  public auction: IPagination<ITicket> = PaginationDefaultValue();
  public event$: Observable<IEvent | null>;
  readonly SellType = SellType;
  activeView: SellType = SellType.FIXED_PRICE;
  loading: boolean = false;
  loadingMore: boolean = false;
  private eventId: string;
  public ticketsCount: { [key:string]: string } = {};

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params['id'];
    this.loading = true;
    this.loadTickets(SellType.FIXED_PRICE)
    this.event$ = this.eventService.getSingleEvent(this.eventId)
    this.updateTicketsCount(SellType.FIXED_PRICE);
  }

  public loadMore(status: SellType): void {
    this.loadingMore = true;
    this.ref.markForCheck();
    const offset = status === SellType.AUCTION ? this.auction?.results?.length : this.fixed_price?.results?.length;
    this.loadTickets(status, offset);
  }

  /**
   * Load items if user changes active tag & there is no items.
   * If items are, user should click 'Load more'
   */
  public changeTab(sellType: SellType): void {
    this.activeView = sellType;
    this.updateTicketsCount(sellType);
    const exists = this.activeView === SellType.AUCTION ? Boolean(this.auction?.results?.length) : Boolean(this.fixed_price?.results?.length);
    if(!exists) {
      this.loading = true;
      this.loadTickets(this.activeView);
    }
  }

  private loadTickets(type: SellType, offset?: number): void {
    const zone_id = this.getZoneId(type);
    this.eventService.getTickets(this.eventId, offset, zone_id).pipe(
     take(1)
    ).subscribe(data => {
      if(type === SellType.AUCTION) {
        this.auction.results = [...this.auction.results, ...data.results];
        this.auction.count = data.count;
      } else {
        this.fixed_price.results = [...this.fixed_price.results, ...data.results];
        this.fixed_price.count = data.count;
      }
      this.loading = false;
      this.loadingMore = false;
      this.ref.markForCheck();
    })
  }

  private getZoneId(type: SellType): number {
    return type === SellType.AUCTION ? 2 : 1;
  }

  private updateTicketsCount(type: SellType): void {
    if (this.ticketsCount[type] !== undefined) {
      return;
    }
    this.eventService.getTicketsCount(
      this.eventId, this.getZoneId(type)
    ).pipe(
      map((res: ITicketsCount) => ({ [type]: `${res.bought} / ${res.all}` })),
      tap((res) => { this.ticketsCount = { ...this.ticketsCount, ...res }; })
    ).subscribe(() => this.ref.markForCheck());
  }

}
