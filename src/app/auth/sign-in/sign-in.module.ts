import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignInPageRoutingModule } from './sign-in-routing.module';

import { SignInPage } from './sign-in.page';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInPageRoutingModule,
    NgbAlertModule,
  ],
  declarations: [SignInPage]
})
export class SignInPageModule {}
