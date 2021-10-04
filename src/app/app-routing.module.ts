import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlayoutComponent } from './core/userlayout/userlayout.component';

const routes: Routes = [
  {
    path: 'dash',
    component: UserlayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./views/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import("./views/user-management/user-management.module").then((m) => m.UserManagementModule)
      },
      {
        path: 'request-quotation/:id',
        loadChildren: () => import("./views/request-quotation/request-quotation.module").then((m) => m.RequestQuotationModule)
      },
    ],

  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
