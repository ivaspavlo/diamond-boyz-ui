import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import { WINDOW } from '@app/core/providers';
import { ServiceCards } from '../../constants';
import {EventService} from "@app/features/events/services";
import {map, take} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  public serviceCards = ServiceCards;
  public finished_sales_date: Observable<string>;

  constructor(
    @Inject(WINDOW) private window: Window,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.finished_sales_date = this.eventService.getEvents().pipe(
      take(1),
      map((ev) => ev?.finished_sales_date || '')
    )
  }

  public onScrollDown(): void {
    this.window.scrollBy(0, this.window.innerHeight);
  }

}
