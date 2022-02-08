import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

export interface ICountdown {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

@Component({
  selector: 'app-auction-timer',
  templateUrl: './auction-timer.component.html',
  styleUrls: ['./auction-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionTimerComponent implements OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  timeline$: Observable<number>;
  countdown$: Observable<ICountdown>
  initialCounter: ICountdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  }

  constructor() { }

  ngOnInit(): void {
    const endStamp = new Date(this.endDate).getTime();
    const startStamp = new Date(this.startDate).getTime();

    this.countdown$ = timer(0,1000).pipe(
      startWith(this.initialCounter),
      map(() => {
        if(new Date().getTime() > endStamp) {
          return this.initialCounter
        }
        // FIXME
        let secondsLeft = (endStamp - new Date().getTime()) / 1000;
        const days = Math.floor(secondsLeft/(60*60*24)).toString();
        secondsLeft -= +days * 60*60*24;
        const hours = Math.floor(secondsLeft/(60*60)).toString();
        secondsLeft -= +hours * 60*60
        const minutes = Math.floor(secondsLeft/60).toString();
        const seconds = Math.floor(secondsLeft - +minutes * 60).toString()
        return {days, hours, minutes, seconds}
      })
    )



    // TODO: recheck vertices (start and end)
    const secondsRange = (endStamp - startStamp) / 1000;
    this.timeline$ = timer(0, 1000).pipe(
      map(() => (endStamp - new Date().getTime()) / 1000),
      takeWhile(left => left > 0),
      map(left => 100 - (left * 100 / secondsRange))
    )
  }

}
