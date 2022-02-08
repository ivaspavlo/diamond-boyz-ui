import { SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { catchError, finalize, map, shareReplay, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { AuthService, IUser } from '@app/core/services';
import { ProfileService } from '@app/features/profile/services/profile.service';
import { INft, NFT_OBJECT_TYPE, NFT_STATUS } from '@app/features/auction/interfaces';
import { DestroySubscriptions } from '@app/shared/classes';
import { NFT_CONTRACT_ADDRESS } from '@env/environment';


@Component({
  selector: 'app-profile-ticket',
  templateUrl: './profile-ticket.component.html',
  styleUrls: ['./profile-ticket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileTicketComponent extends DestroySubscriptions implements OnInit {

  private ticketId: string;

  public tab: string;
  public readonly NFT_OBJECT_TYPE = NFT_OBJECT_TYPE;
  public readonly NFT_CONTRACT_ADDRESS = NFT_CONTRACT_ADDRESS;
  public readonly NFT_STATUS = NFT_STATUS;

  public descButtons = [ { uiName: 'Description' }, { uiName: 'Use Case' } ];
  public currentButton = this.descButtons[0];

  public ticketQr$: Observable<{ qr: SafeResourceUrl; ended_timestamp: number; } | null>;
  public nft$: Observable<INft | null>;
  public user$: Observable<IUser | null>
  public countDown$: BehaviorSubject<number> = new BehaviorSubject(0);
  public loadQr$: BehaviorSubject<null> = new BehaviorSubject(null);
  public isRunningOut$: Observable<boolean>;
  public event$: Observable<any>;
  public isProcessing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tab = this.route.snapshot.paramMap.get('tab') as string;
    this.ticketId = this.route.snapshot.paramMap.get('ticketId') as string;

    this.user$ = this.authService.user$.asObservable();

    this.nft$ = this.profileService.getNFT(this.ticketId).pipe(
      catchError(() => of(null)),
      shareReplay(1)
    );

    this.ticketQr$ = this.loadQr$.pipe(
      switchMap(() => this.getTicketQr()),
      tap(res => this.initCountDown(res)),
      takeUntil(this.componentDestroyed$)
    );

    this.isRunningOut$ = this.countDown$.pipe(
      map((secondsLeft: number) => secondsLeft <= 5)
    );

    this.event$ = this.nft$.pipe(
      switchMap((res: any) => this.profileService.getEvent(res.event_id)),
      shareReplay(1)
    );
  }

  private initCountDown(qr: { ended_timestamp: number; qr: SafeResourceUrl; } | null): void {
    if (qr === null) {
      return;
    }
    const requestBuffer = 3;
    const secondsLeft = qr.ended_timestamp - Math.ceil(new Date().getTime()/1000) + requestBuffer;
    interval(1000).pipe(
      take(secondsLeft),
      map(res => secondsLeft - 1 - res),
      tap((res) => {
        res <= 0 ? this.loadQr$.next(null) : null;
      }),
      takeUntil(this.componentDestroyed$)
    ).subscribe(sec => this.countDown$.next(sec))
  }

  private getTicketQr(): Observable<{ ended_timestamp: number; qr: SafeResourceUrl; } | null> {
    return this.profileService.getTicketQR(this.ticketId).pipe(
      catchError(() => of(null))
    );
  }

  public cancelListing(): void {
    this.isProcessing$.next(true)
    this.profileService.cancelListing(this.ticketId).pipe(
      finalize(() => this.isProcessing$.next(false))
    ).subscribe(tx => {
      this.router.navigateByUrl('/profile/tickets', {replaceUrl: true});
    })
  }
}
