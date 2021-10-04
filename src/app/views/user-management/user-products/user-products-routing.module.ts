import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { UserProductsComponent } from './user-products.component';

const routes: Routes = [
  {
    path: "",
    component: UserProductsComponent
  },
  {
    path: "add-product",
    component: AddProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProductsRoutingModule { }
