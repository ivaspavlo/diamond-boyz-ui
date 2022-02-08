import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ITicket, SellType } from '../../interfaces';


@Component({
  selector: 'app-ticket-card',
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketCardComponent {

  @Input() ticket: ITicket;
  @Input() daysLeft: number;

  readonly SellType = SellType;

  constructor() { }
}
