import { Injectable, Injector } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, from, Observable, of, throwError } from 'rxjs';
import {catchError, map, switchMap, tap, window} from 'rxjs/operators';

import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

import { ToasterService } from '@app/shared/modules/toaster/services/toaster.service';
import { ApiService, APP_ERROR_CODES, AppError } from '@app/shared/classes';
import { StorageKeys } from '@app/core/constants';
import { SMART_CHAIN_NETWORK_PARAMS } from '@env/environment'

import { StorageService } from './storage.service';

export interface IGetSignatureReq {
  otp: string;
  message_template: string;
}

export interface ILogin {
  access: string;
  refresh: string;
  user: IUser;
}

type AuthResponseType = 'NoMetamask';

export interface IAuthResponse {
  errorMsg: string | null;
  result: any;
  type?: AuthResponseType;
}

export interface IUser {
  id: number;
  wallet_address: string;
}

/**
 * copied from https://github.com/pancakeswap/pancake-frontend/blob/292b7b887b98205d9c372a0f6491bef044cb383f/src/utils/web3React.ts
 * BSC Wallet requires a different sign method
 * @see https://docs.binance.org/smart-chain/wallet/wallet_api.html#binancechainbnbsignaddress-string-message-string-promisepublickey-string-signature-string
 */
export const signMessage = async (provider: any, account: string, message: string): Promise<string> => {
  /*if (window.BinanceChain) {
    const { signature } = await window.BinanceChain.bnbSign(account, message)
    return signature
  }*/

  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
    const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
    return signature
  }

  return provider.getSigner(account).signMessage(message)
}


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  public account: string;
  public redirectURL: string;

  private otp: string;
  private messageTpl: string;
  private provider: any;

  isLoggedIn$: BehaviorSubject<boolean>;
  user$: BehaviorSubject<IUser | null>;

  constructor(
    protected injector: Injector,
    private storageService: StorageService,
    private toaster: ToasterService,
    private router: Router,
  ) {
    super(injector);
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());
    this.user$ = new BehaviorSubject<IUser | null>(this.getUser());
  }

  public getToken(): string | null {
    return this.storageService.get(StorageKeys.ACCESS_TOKEN);
  }

  public loginViaMetamask(): Observable<IAuthResponse> {
    return this.getProvider().pipe(
      switchMap(res => this.addSmartchainNetwork(res)),
      switchMap(res => this.getMetamaskAccount(res)),
      switchMap(res => this.getOtp(res)),
      switchMap(res => this.getSignature(res)),
      switchMap(res => this.getJWT(res))
    );
  }

  public getAccountAddress(): Observable<string | null> {
    return this.getProvider().pipe(
      switchMap(p => this.getMetamaskAccount(p)),
      map(res => res.result)
    );
  }

  private getMetamaskAccount(res: IAuthResponse): Observable<IAuthResponse> {
    if (!res.result) {
      return of(res);
    }
    return from(res.result.request({ method: 'eth_requestAccounts' })).pipe(
      map((accounts) => {
        if (Array.isArray(accounts) && accounts.length) {
          this.account = accounts[0];
          return { errorMsg: null, result: this.account };
        }
        return { errorMsg: 'Error while trying to obtain Metamask account.', result: null };
      }),
      catchError(_ => of({ errorMsg: 'Error while trying to obtain Metamask account.', result: null }))
    );
  }

  private addSmartchainNetwork(res: IAuthResponse): Observable<IAuthResponse> {
    if (!res.result) {
      return of(res);
    }

    return from(this.provider.request({
      method: 'wallet_addEthereumChain',
      params: SMART_CHAIN_NETWORK_PARAMS
    })).pipe(
      catchError(() => of(null)),
      map(() => res)
    );
  }

  private getOtp(res: IAuthResponse): Observable<IAuthResponse> {
    const wallet_address = res.result;
    if (!wallet_address) {
      return of(res);
    }
    return this.post<IGetSignatureReq>('auth/otp', { wallet_address }).pipe(
      map((res: IGetSignatureReq) => {
        this.otp = res.otp;
        // TODO: Use this.messageTpl instead hardcoded string
        this.messageTpl = res.message_template;
        return { result: res.otp, errorMsg: null };
      }),
      catchError(_ => of({ errorMsg: 'Could not obtain OTP.', result: null }))
    )
  }

  private getSignature(res: IAuthResponse): Observable<IAuthResponse> {
    const otp = res.result;
    if (!otp) {
      return of(res);
    }

    return this.getProvider().pipe(
      map(({result}) => new ethers.providers.Web3Provider(result)),
      switchMap(provider => signMessage(provider, this.account, `Welcome to us with ${otp} and ${this.account}`))
    ).pipe(
      map(result => ({ result, errorMsg: null })),
      catchError(() => of({ result: null, errorMsg: 'Could not get a signature.' }))
    );
  }

  private getProvider(): Observable<IAuthResponse> {
    return from(detectEthereumProvider()).pipe(
      map((res): IAuthResponse => ({
        errorMsg: res ? null : 'You don`t have the Metamask plugin installed.',
        result: res || null,
        type: 'NoMetamask'
      })),
      catchError((_) => {
        const errResponse: IAuthResponse = { errorMsg: 'You don`t have the Metamask plugin installed.', result: null, type: 'NoMetamask' }
        return of(errResponse)
      }),
      tap(res => this.provider = res.result)
    );
  }

  private getJWT(res: IAuthResponse): Observable<IAuthResponse> {
    const signature = res.result;
    if (!signature) {
      return of(res);
    }
    const body = {
      otp: this.otp,
      wallet_address: this.account,
      message: `Welcome to us with ${this.otp} and ${this.account}`,
      signature
    };
    return super.post<ILogin>('auth/token', body).pipe(
      tap(({access, refresh, user}) => {
        this.storageService.set(StorageKeys.ACCESS_TOKEN, access);
        this.storageService.set(StorageKeys.REFRESH_TOKEN, refresh);
        this.isLoggedIn$.next(true);
        this.user$.next(user);
      }),
      map(result => ({ result, errorMsg: null })),
      catchError(_ =>  {
        this.logout();
        return of({ result: null, errorMsg: 'Could not obtain JWT token.' })
      })
    );
  }

  public refreshToken(): Observable<any> {
    const refresh = this.storageService.get(StorageKeys.REFRESH_TOKEN);
    return super.post<{access: string, refresh: string}>('auth/refresh', {refresh}).pipe(
      tap(({access, refresh}) => {
        this.storageService.set(StorageKeys.ACCESS_TOKEN, access);
        this.storageService.set(StorageKeys.REFRESH_TOKEN, refresh);
      }),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    )
  }

  public logout(): void {
    this.storageService.remove(StorageKeys.ACCESS_TOKEN);
    this.storageService.remove(StorageKeys.REFRESH_TOKEN);
    this.isLoggedIn$.next(false);
    this.user$.next(null);
    this.router.navigate(['/auth'])
  }

  private getUser(): IUser | null {
    const token = this.storageService.get(StorageKeys.ACCESS_TOKEN);
    if (token) {
      try {
        const {user} = JSON.parse(atob(token.split('.')[1]));
        return user;
      } catch (e) {
        return null
      }
    }
    return null;
  }

  public checkSigner(): Observable<boolean> {
    return this.checkMaintenance().pipe(
      switchMap(() => this.getAccountAddress()),
      map(signerAddress => {
        const userWallet = this.user$.getValue();
        if (!userWallet || !signerAddress) {
          throw new AppError('You are not logged in. Please connect Metamask');
        }

        if (userWallet.wallet_address.toLowerCase() !== signerAddress.toLowerCase()) {
          throw new AppError('Metamask address is different from your account wallet address.')
        }

        return true;
      }),
      catchError(error => {
        if (error.code && error.code === APP_ERROR_CODES.TOAST) {
          this.toaster.show({
            state: 'error',
            header: 'Error',
            text: error.message
          })
        }
        return  throwError(error.message);
      })
    )
  }

  public async accountsChanged(): Promise<void> {
    const provider = await detectEthereumProvider();

    provider.on('accountsChanged', (accounts: string[]) => {
      this.logout()
      location.reload();
    });
    provider.on('chainChanged', (_chainId: string) => {
      this.logout()
      location.reload();
    })
  }

  private checkMaintenance(): Observable<boolean> {
    return this.get<{is_switched_on: boolean}>('maintain/mode').pipe(
      map(({is_switched_on}) => {
        if (is_switched_on) {
          throw new AppError('Site is under maintenance mode. Please, try again later');
        }
        return true;
      }),
      catchError(err => {
        throw new AppError('Site is under maintenance mode. Please, try again later');
      })
    );
  }
}

// TODO: check custom tokens https://docs.metamask.io/guide/registering-your-token.html#example
