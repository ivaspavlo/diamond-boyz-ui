import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
  name: 'filler'
})
export class FillerPipe implements PipeTransform {
  transform(value: number, initIndex = 1) {
    if (typeof value !== 'number' || typeof initIndex !== 'number') { return; }
    return new Array(value).fill(null).map((_, index) => initIndex + index);
  }
}
