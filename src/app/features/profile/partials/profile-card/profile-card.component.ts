import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IProfileTicket } from '../../interfaces';


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileCardComponent implements OnInit {

  @Input() card: IProfileTicket;

  constructor() { }

  ngOnInit(): void { }

}
