import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import {IMarketPlaceListItem} from "@app/features/marketplace/interfaces/marketplace-list.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() card: IMarketPlaceListItem;
}
