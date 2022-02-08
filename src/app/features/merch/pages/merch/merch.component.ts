import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
