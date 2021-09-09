import { ComponentFactory } from '@angular/core';


export class DialogConfig {
  
  public contentFactory: ComponentFactory<any>;
  public data: any;
  
  constructor(contentFactory: ComponentFactory<any>, data?: any) {
    this.contentFactory = contentFactory;
    this.data = data;
  }

}
