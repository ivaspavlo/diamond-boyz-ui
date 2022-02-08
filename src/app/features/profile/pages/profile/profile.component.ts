import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {pluck, shareReplay, take} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '@app/features/profile/services/profile.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { AuthService, IUser } from '@app/core/services';
import {keyvaluePreserveOrder, PaginationDefaultValue} from '@app/shared/utils';
import { ProfileTabs } from '../../constants/profile-tabs.constant';
import { IProfileTicket } from '../../interfaces';
import {IPagination} from "@app/interfaces";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  public tabs = ProfileTabs;
  public currentTab$: Observable<string>;
  public user$: Observable<IUser | null>;
  public qr$: Observable<SafeResourceUrl>;

  public tickets: IPagination<IProfileTicket> = PaginationDefaultValue();
  public collections: IPagination<any> = PaginationDefaultValue();
  public saleItems: IPagination<any> = PaginationDefaultValue();

  public qrImageVisible = false;
  public isRecommendVisible = false;
  public preserveOrder = keyvaluePreserveOrder;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentTab$ = this.route.paramMap.pipe(pluck('params', 'tab'));
    this.qr$ = this.profileService.getQR().pipe(shareReplay(1));
    this.user$ = this.authService.user$.asObservable();
    this.loadTickets();
    this.loadCollections();
    this.loadSaleItems();
  }

  public loadSaleItems(): void {
    this.toggleLoading(true);
    const offset = this.saleItems?.results?.length;
    this.profileService.getSale(offset).pipe(take(1)).subscribe((data) => {
      this.saleItems.results = [...this.saleItems.results, ...data.results];
      this.saleItems.count = data.count;
      this.toggleLoading(false);
    })
  }

  public loadCollections(): void {
    this.toggleLoading(true);
    const offset = this.collections?.results?.length;
    this.profileService.getCollections(offset).pipe(take(1)).subscribe((data) => {
      this.collections.results = [...this.collections.results, ...data.results];
      this.collections.count = data.count;
      this.toggleLoading(false);
    })
  }

  public loadTickets(): void {
    this.toggleLoading(true);
    const offset = this.tickets?.results?.length;
    this.profileService.getTickets(offset).pipe(take(1)).subscribe((data) => {
      this.tickets.results = [...this.tickets.results, ...data.results];
      this.tickets.count = data.count;
      this.toggleLoading(false);
    })
  }

  public onToggleQrImage(): void {
    this.qrImageVisible = !this.qrImageVisible;
  }

  private toggleLoading(loading: boolean): void {
    this.loading = loading;
    this.cdr.markForCheck();
  }

}
