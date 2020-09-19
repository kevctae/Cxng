import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
