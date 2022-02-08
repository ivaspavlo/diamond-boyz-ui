import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'daysLeft'
})
export class DaysLeftPipe implements PipeTransform {
  transform(value: string): number {
    if (typeof value !== 'string') {
      return 0;
    }
    const date = new Date(value);
    if (!(date instanceof Date)) {
      return 0;
    }
    const daysLeft = this.daysBetween(
      new Date(),
      new Date(value)
    );
    return daysLeft > 0 ? Math.floor(daysLeft) : 0;
  }

  private treatAsUTC(date: Date) {
    return date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  }

  private daysBetween(startDate: Date, endDate: Date): number {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay;
  }
}