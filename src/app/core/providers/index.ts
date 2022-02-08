import { localStorageProvider } from './local-storage.provider';
import { sessionStorageProvider } from './session-storage.provider';
import { windowProvider } from './window.provider';


export * from './local-storage.provider';
export * from './session-storage.provider';
export * from './window.provider';

export const PROVIDERS = [
  localStorageProvider,
  sessionStorageProvider,
  windowProvider
];
