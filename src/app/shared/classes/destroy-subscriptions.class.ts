import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class DestroySubscriptions implements OnDestroy {

  protected componentDestroyed$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
