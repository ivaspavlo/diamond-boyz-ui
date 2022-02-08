import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import SwiperCore, { SwiperOptions, Pagination } from 'swiper';

import { IEvent } from '../../interfaces';
import { EventService } from '../../services';


// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainEventComponent {

  public mainEvent$: Observable<IEvent | null>;

  // TODO: move slider markup and logic to a shared module
  public config: SwiperOptions = {
    loop: true,
    slidesPerView: 1,
    pagination: { clickable: true },
    spaceBetween: 30,
  };

  constructor(
    private eventService: EventService
  ) {
    this.mainEvent$ = this.eventService.getEvents().pipe(
      // map((events: IEvent[] | null) => events ? events[0] : null)
    );
  }
}
