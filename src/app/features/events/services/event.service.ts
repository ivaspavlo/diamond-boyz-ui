import { Injectable, Injector } from "@angular/core";
import { ApiService } from "@app/shared/classes";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IEvent, ITicket, ITicketsCount } from "../interfaces";
import { IPagination } from '@app/interfaces';
import {PaginationDefaultValue} from "@app/shared/utils";
import { MOCK_IMAGES } from '@app/interfaces/mock-images';


@Injectable()
export class EventService extends ApiService {

  constructor(protected injector: Injector) {
    super(injector);
  }

  public getEvents(): Observable<IEvent | null> {
    return this.get<IEvent>('events/1').pipe(
      catchError(_ => of(null))
    );
  }

  public getTickets(id: string, offset: number = 0, zone_id: number): Observable<IPagination<ITicket>> {
    // @ts-ignore
    return this.get<IPagination<ITicket>>(`events/${id}/tickets`, {params: {limit: 12, offset: offset, zone_id}}).pipe(
      map(res => ({
        ...res,
        results: res.results.map((i: ITicket) => ({
          ...i,
          // @ts-ignore
          thumbnail_desktop: MOCK_IMAGES[i.zone_id],
          // @ts-ignore
          thumbnail_desktop_marketplace_by_now_confirmation: MOCK_IMAGES[i.zone_id],
          // @ts-ignore
          thumbnail_desktop_ticket_details: MOCK_IMAGES[i.zone_id],
          // @ts-ignore
          thumbnail_mobile:  MOCK_IMAGES[i.zone_id]
        }))
      })),
      catchError(_ => of(PaginationDefaultValue()))
    );
  }

  public getSingleEvent(id: string | number): Observable<IEvent | null> {
    return this.get<IEvent>(`events/${id}`).pipe(
      catchError(_ => of(null))
    );
  }

  public getTicketsCount(event_id: string, zone_id: number): Observable<ITicketsCount> {
    return this.get<ITicketsCount>(`events/${event_id}/tickets-count`, { params: { zone_id } });
  }

}
