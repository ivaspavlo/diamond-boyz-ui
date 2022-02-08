import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-sample-container',
  templateUrl: './sample-container.component.html',
  styleUrls: ['./sample-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

}
