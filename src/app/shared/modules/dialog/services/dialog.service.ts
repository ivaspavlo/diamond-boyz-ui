
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { first } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

import { DialogComponent } from '../container/dialog.component';
import { DialogModule } from '../dialog.module';
import { DialogInjector } from '../dialog-injector';
import { DialogConfig } from '../dialog-config';
import { DialogRef } from '../dialog-ref';


@Injectable({
  providedIn: DialogModule
})
export class DialogService {
  
  private dialogComponentRef: ComponentRef<DialogComponent>;
  private forceCloseDialog$: Subject<void> = new Subject();

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) { }
  
  public appendDialogComponentToBody(injector: Injector): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentRef = componentFactory.create(injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.document.body.appendChild(domElem);
    
    this.dialogComponentRef = componentRef;
  }
  
  public open(componentType: Type<any>, data?: any): DialogRef {
    this.forceCloseDialog$.next();
    
    const contentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    
    // configure and create injector
    const configMap = new WeakMap();
    const dialogRef = new DialogRef();
    this.listenCloseEvent(dialogRef);
    configMap.set(DialogConfig, new DialogConfig(contentFactory, data));
    configMap.set(DialogRef, dialogRef);
    const injector = new DialogInjector(this.injector, configMap);
    
    this.appendDialogComponentToBody(injector);
    return dialogRef;
  }
  
  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
  
  private listenCloseEvent(dialogRef: DialogRef): void {
    merge(
      this.forceCloseDialog$,
      dialogRef.afterClosed
    ).pipe(
      first()
    ).subscribe(() => {
      this.removeDialogComponentFromBody();
    });
  }
  
}
