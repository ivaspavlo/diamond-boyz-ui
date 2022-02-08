import { FillerPipe } from './filler.pipe';
import { EllipsisPipe } from '@app/shared/pipes/ellipsis.pipe';
import { EventDatePipe } from './event-date.pipe';


export * from './filler.pipe';

export const PIPES = [
  FillerPipe,
  EllipsisPipe,
  EventDatePipe
];
