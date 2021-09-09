import { Injectable } from '@angular/core';
import { SampleModule } from '../sample.module';


@Injectable({
  providedIn: SampleModule
})
export class SampleService {

  constructor() { }

}
