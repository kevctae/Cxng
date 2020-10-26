import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhotoEditPageRoutingModule } from './photo-edit-routing.module';

import { PhotoEditPage } from './photo-edit.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhotoEditPageRoutingModule,
    ImageCropperModule,
  ],
  declarations: [PhotoEditPage]
})
export class PhotoEditPageModule {}
