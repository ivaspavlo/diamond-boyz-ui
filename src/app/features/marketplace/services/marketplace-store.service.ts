import { Injectable } from '@angular/core';
import {BehaviorSubject, of, Subscription} from "rxjs";
import {EMarketPlaceStatus, IMarketPlaceListItem} from "@app/features/marketplace/interfaces/marketplace-list.model";
import {MarketplaceService} from "@app/features/marketplace/services/marketplace.service";
import {catchError, first} from "rxjs/operators";
import {IEvent} from "@app/features/events/interfaces";
import {INft} from "@app/features/auction/interfaces";
import {DBZ_CONTRACT_ADDRESS, MARKET_CONTRACT_ADDRESS} from "@env/environment";
import {Contract, ethers} from "ethers";
import {Web3Provider} from "@ethersproject/providers";
import {DBZ_ABI, IPagination, MARKET_ABI} from "@app/interfaces";
import {ToasterService} from "@app/shared/modules/toaster/services/toaster.service";

class MarketPlaceStore {
  marketPlaces: IMarketPlaceListItem[];
  loading: boolean;
  event: IEvent | null;
  marketPlace: INft | null;
  activeTab: EMarketPlaceStatus;
  totalElements: number;
  loadingMore: boolean;
  constructor() {
    this.event = null;
    this.marketPlace = null;
    this.totalElements = 0;
    this.marketPlaces = [];
    this.loadingMore = false;
  }
}

@Injectable()
export class MarketplaceStoreService {
  public store$: BehaviorSubject<MarketPlaceStore> = new BehaviorSubject<MarketPlaceStore>(new MarketPlaceStore());
  private marketContract: Contract;
  private provider: Web3Provider;
  private dbzContract: Contract;
  private loadingSubscription: Subscription = new Subscription();
  constructor(private service: MarketplaceService,
              private toasterService: ToasterService) {
    if(window.ethereum) {
      // @ts-ignore
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
      const signer = this.provider.getSigner();
      this.marketContract = new ethers.Contract(MARKET_CONTRACT_ADDRESS, MARKET_ABI, signer);
      this.dbzContract = new ethers.Contract(DBZ_CONTRACT_ADDRESS, DBZ_ABI, signer);
    } else {
      this.toasterService.show({ state: 'error', header: 'Error', text: 'You don`t have the Metamask plugin installed.' });
    }
  }

  public loadMarketPlaces(status: EMarketPlaceStatus): void {
    // Clear previous subscription for cases when a user switch tabs faster than it can be loaded
    this.loadingSubscription.unsubscribe();
    this.setMarketPlaces([]);
    this.setLoading(true);
    this.setTotalElements(0)
    // Save active filter
    this.store$.next({ ...this.store$.value, ...{activeTab: status} });
    this.loadingSubscription = this.service.getMarketplace(status).subscribe((data:IPagination<IMarketPlaceListItem>) => {
      this.setLoading(false);
      this.setTotalElements(data.count)
      this.setNextPageToken(data.next)
      const marketPlaces = this.extendData(data.results)
      this.setMarketPlaces(marketPlaces);
    });
  }

  public loadSingleEvent(eventId: string | number): void {
    if(!eventId) {
      return
    }
    this.service.getSingleEvent(eventId).pipe(first()).subscribe(event => {
      this.store$.next({ ...this.store$.value, ...{event} });
    })
  }

  public loadSingleMarketplace(id: string): void {
    this.service.getSingleMarketplace(id).pipe(first(),
      catchError((err: any) => {
        this.toasterService.show({ state: 'error', header: 'Error', text: 'This ticket has already been bought' });
        return of(err)
      })).subscribe(marketPlace => {
      this.loadSingleEvent(marketPlace.event_id);
      this.store$.next({ ...this.store$.value, ...{marketPlace} });
    })
  }

  public loadMore(): void {
    // Clear previous subscription for cases when a user switch tabs faster than it can be loaded
    this.loadingSubscription.unsubscribe();
    const activeTab = this.store$.value.activeTab;
    const offset = this.store$.value.marketPlaces?.length;

    this.store$.next({ ...this.store$.value, ...{loadingMore: true} });
    this.loadingSubscription = this.service.getMarketplace(activeTab, offset).subscribe(data => {
      this.setTotalElements(data.count)
      this.setNextPageToken(data.next)
      const currentItems = this.store$.value.marketPlaces;
      const newItems = this.extendData(data.results);
      const marketPlaces = [...currentItems, ...newItems];
      this.setMarketPlaces(marketPlaces);
      this.store$.next({ ...this.store$.value, ...{loadingMore: false} });
    })
  }

  private setMarketPlaces(marketPlaces: IMarketPlaceListItem[]): void {
    this.store$.next({ ...this.store$.value, ...{marketPlaces} });
  }

  private setTotalElements(totalElements: number): void {
    this.store$.next({ ...this.store$.value, ...{totalElements} });
  }

  private setNextPageToken(nextPageToken: string | null): void {
    this.store$.next({ ...this.store$.value, ...{nextPageToken} });
  }

  /**
   *  Calculating how many days to finished_date
   *  Detecting is item new, if createdDateTime < 7 days from current time
   */
  private extendData(marketPlaces: IMarketPlaceListItem[] = []): IMarketPlaceListItem[] {
    const dayMS: number = 1000 * 3600 * 24;
    marketPlaces.forEach(marketPlace => {
      // Checking days_left
      if(marketPlace.finished_date) {
        const differentMS = new Date(marketPlace.finished_date).getTime() - new Date().getTime();
        const daysLeft: number = Math.floor(differentMS / dayMS);
        marketPlace.days_left = daysLeft > 0 ? daysLeft : null;
      }
      // Checking "New" label to set if an item was created less that 7 days ago
      if(marketPlace.created_date) {
        const diffMS = new Date(marketPlace.created_date).getTime() - new Date().getTime();
        const daysCreateAgo = diffMS / dayMS;
        marketPlace.new = daysCreateAgo < 7;
      }
    })
    return marketPlaces
  }

  private setLoading(loading: boolean): void {
    this.store$.next({ ...this.store$.value, ...{loading} });
  }
}
