import { FactoryProvider, InjectionToken } from '@angular/core';
import { WINDOW } from './window.provider';


export const SESSION_STORAGE = new InjectionToken('SessionStorageToken');

export const sessionStorageProvider: FactoryProvider = {
  provide: SESSION_STORAGE,
  useFactory: (window: Window) => window.sessionStorage,
  deps: [WINDOW]
}
