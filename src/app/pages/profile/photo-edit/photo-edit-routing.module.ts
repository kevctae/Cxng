import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoEditPage } from './photo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PhotoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhotoEditPageRoutingModule {}
