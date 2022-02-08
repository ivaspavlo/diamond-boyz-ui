import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IEvent } from "@app/features/events/interfaces";

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventInfoComponent {
  @Input() event: IEvent | null;
  constructor() { }
}
