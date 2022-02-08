import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MarketplaceService} from "@app/features/marketplace/services/marketplace.service";
import {INft} from "@app/features/auction/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, takeUntil, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {DestroySubscriptions} from "@app/shared/classes";
import {NFT_CONTRACT_ADDRESS} from "@env/environment";
import {IEvent} from '@app/features/events/interfaces';
import { TOKEN_DETAILS } from '@app/features/auction/pages/ticket-details/ticket-details.component';
import {MarketplaceStoreService} from "@app/features/marketplace/services/marketplace-store.service";
import {EMarketPlaceStatus} from "@app/features/marketplace/interfaces/marketplace-list.model";
import {WINDOW} from "@app/core/providers";

@Component({
  selector: 'app-marketplace-details',
  templateUrl: './marketplace-details.component.html',
  styleUrls: ['./marketplace-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceDetailsComponent extends DestroySubscriptions implements OnInit {
  public marketplace$: Observable<INft | null>;
  public event$: Observable<IEvent | null> = this.store.store$.pipe(map(st => st.event));
  public view: TOKEN_DETAILS = TOKEN_DETAILS.DESCRIPTION;
  public backPrevPage: string = '/marketplace/buynow';
  public parentTitle: string;
  public id;
  readonly SellType = EMarketPlaceStatus;
  readonly contractAddress = NFT_CONTRACT_ADDRESS;
  readonly TOKEN_DETAILS = TOKEN_DETAILS;

  constructor(private service: MarketplaceService,
              private activeRoute: ActivatedRoute,
              public store: MarketplaceStoreService,
              private router: Router,
              @Inject(WINDOW) private window: Window) {
    super();
    this.id = this.activeRoute.snapshot.params['id'];
    this.store.loadSingleMarketplace(this.id);
  }

  ngOnInit(): void {
    this.window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    this.marketplace$ = this.store.store$.pipe(
      map(st => st.marketPlace),
      takeUntil(this.componentDestroyed$),
      tap((data) => {
        /**
         * Catch an error if a ticket has already been bought & redirect to the parent page
         */
        // @ts-ignore
        if(data?.status === 404) {
          return this.router.navigateByUrl(this.backPrevPage);
        }
        this.backPrevPage = data?.marketplace?.status === 'fixed_price_sale' ? '/marketplace/buynow' : '/marketplace/auction';
        this.parentTitle = data?.marketplace?.status === 'fixed_price_sale' ? 'Marketplace' : 'Auction';
      })
    );
  }

}
