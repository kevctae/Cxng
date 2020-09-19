import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PagesRoutingModule } from './pages-routing.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}