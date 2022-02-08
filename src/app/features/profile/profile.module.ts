import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgxJdenticonModule } from 'ngx-jdenticon';

import { SharedModule } from '@app/shared/shared.module';
import {QrModule, SpinnerModule, ToasterModule} from '@app/shared/modules';

import { ProfileRoutingModule } from './profile-routing.module';
import { PAGES } from './pages';
import { PARTIALS } from './partials';
import {ProfileService} from "@app/features/profile/services/profile.service";
import { NgNumbersOnlyInputDirectiveModule } from 'ng-numbers-only-input-directive';


@NgModule({
  declarations: [
    ...PAGES,
    ...PARTIALS
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProfileRoutingModule,
    NgxJdenticonModule,
    MatDialogModule,
    ToasterModule,
    QrModule,
    SpinnerModule,
    NgNumbersOnlyInputDirectiveModule
  ],
  providers: [ProfileService]
})
export class ProfileModule { }
