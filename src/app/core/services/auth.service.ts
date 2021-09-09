import { Inject, Injectable, Injector } from '@angular/core';

import { ApiService } from '@app/shared/classes';
import { WINDOW } from '@app/core/providers';
 
import { StorageService } from './storage.service';
import { BehaviorSubject, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  public account$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    protected injector: Injector,
    private storageService: StorageService,
    @Inject(WINDOW) private window: any
  ) {
    super(injector);
  }

  public getToken(): any {
    return true;
  }

  public hasMetamaskInstalled(): boolean {
    return typeof this.window.ethereum !== 'undefined';
  }

  public connectMetamask(): void {
    from(this.window.ethereum.request({ method: 'eth_requestAccounts' })).subscribe(
      (accounts: any) => {
        if (Array.isArray(accounts) && accounts.length) {
          this.account$.next(accounts[0]);
        }
      }
    );
  }

}
