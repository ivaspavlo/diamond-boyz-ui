import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
