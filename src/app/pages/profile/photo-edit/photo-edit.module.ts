import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoEditPageRoutingModule } from './photo-edit-routing.module';

import { PhotoEditPage } from './photo-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoEditPageRoutingModule
  ],
  declarations: [PhotoEditPage]
})
export class PhotoEditPageModule {}
