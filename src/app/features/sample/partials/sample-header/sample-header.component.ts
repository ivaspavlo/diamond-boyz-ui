import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-sample-header',
  templateUrl: './sample-header.component.html',
  styleUrls: ['./sample-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
