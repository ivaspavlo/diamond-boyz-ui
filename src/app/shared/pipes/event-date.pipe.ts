import { PipeTransform, Pipe } from '@angular/core';


const MonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

interface IEventDate {
  month: string;
  dayNum: number;
  dayName: string;
  time: string;
}

@Pipe({
  name: 'eventDate'
})
export class EventDatePipe implements PipeTransform {
  transform(value: string, fullNames: boolean = true): IEventDate | null {
    if (typeof value !== 'string') {
      return null;
    }
    const date = new Date(value);
    if (!(date instanceof Date)) {
      return null;
    }
    const dayNum = +value.slice(8, 10);
    const hours = +value.slice(11, 13);
    const minutes = +value.slice(14, 16);
    return {
      dayNum,
      dayName: fullNames ? DayNames[date.getDay()] : DayNames[date.getDay()].slice(0, 3),
      month: fullNames ? MonthNames[date.getMonth()] : MonthNames[date.getMonth()].slice(0, 3),
      time: this.formatAMPM(hours, minutes)
    };
  }

  private formatAMPM(hours: number, minutes: number): string {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  }
}