import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutsComponent } from './layouts.component';
import { TabsComponent } from './tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { FabsComponent } from './fabs/fabs.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    TabsComponent,
    FabsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
  ],
})
export class LayoutsModule {}