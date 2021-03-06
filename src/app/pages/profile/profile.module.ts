import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProfileEditPageModule } from './profile-edit/profile-edit.module';
import { PhotoEditPageModule } from './photo-edit/photo-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ProfileEditPageModule,
    PhotoEditPageModule,
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
