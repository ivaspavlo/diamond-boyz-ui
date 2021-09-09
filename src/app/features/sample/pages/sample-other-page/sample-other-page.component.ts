import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-sample-other-page',
  templateUrl: './sample-other-page.component.html',
  styleUrls: ['./sample-other-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleOtherPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
