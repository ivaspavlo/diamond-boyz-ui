import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAuctionOffer } from '@app/features/auction/interfaces';

@Component({
  selector: 'app-auction-offers',
  templateUrl: './auction-offers.component.html',
  styleUrls: ['./auction-offers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuctionOffersComponent {
  @Input() offers: IAuctionOffer[] | null = [];
}
