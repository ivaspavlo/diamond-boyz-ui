import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardImageComponent {

  @Input() src: string;
  @Input() label: string;

  constructor() { }

}
