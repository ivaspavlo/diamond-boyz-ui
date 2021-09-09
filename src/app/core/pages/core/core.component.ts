import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {

  constructor() { }

}
