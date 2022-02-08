import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";

@Component({
  selector: 'app-marketplace-header',
  templateUrl: './marketplace-header.component.html',
  styleUrls: ['./marketplace-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceHeaderComponent {
  public totalElements$: Observable<number> = this.store.store$.pipe(map((state) => state.totalElements));
  public loading$: Observable<boolean> = this.store.store$.pipe(map((state) => state.loading))

  constructor(private store: MarketplaceStoreService) { }

}
