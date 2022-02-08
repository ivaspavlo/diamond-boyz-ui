import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


export interface ICountdown {
  hours: number;
  minutes: number;
  seconds: number;
  timeline: number;
}

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  public countdown$: Observable<ICountdown>;

  @Input() startDate: Date | string;
  @Input() endDate: Date | string = new Date('Nov 21 2021 20:00:00 EST');

  private timeDifference: number;
  private milliSecondsInASecond = 1000;
  private hoursInADay = 24;
  private minutesInAnHour = 60;
  private SecondsInAMinute  = 60;

  ngOnInit() {
    this.initStartDate();
    this.initCountdown();
  }

  private getTimeDifference(): ICountdown {
    this.timeDifference = new Date(this.endDate).getTime() - new Date().getTime();

    if (this.timeDifference < 0) {
      return { hours: 0, minutes: 0, seconds: 0, timeline: 100 }
    }

    const days = Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
    const hours = Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    const minutes = Math.floor((this.timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    const seconds = Math.floor((this.timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    const fullHours = days && days > 0 ? hours + (days * this.hoursInADay) : hours;

    // timeline
    const totalDifSec = Math.abs(new Date(this.endDate).getTime() - new Date(this.startDate).getTime());
    const percent = Math.floor(this.timeDifference * 100 / totalDifSec);

    return {
      hours: fullHours > 0 ? fullHours : 0,
      minutes: minutes > 0 ? minutes : 0,
      seconds: seconds > 0 ? seconds : 0,
      timeline: 100 - percent
    }
  }

  private initCountdown(): void {
    this.countdown$ = interval(1000).pipe(
      startWith(null),
      map(_ => this.getTimeDifference())
    );
  }

  private initStartDate(): void {
    if (!this.startDate) {
      this.startDate = new Date();
      this.startDate.setDate(new Date(this.endDate).getDate() - 31);
    } else {
      //TODO implement flow if startDate not present
      this.startDate = new Date();
    }
  }

}
