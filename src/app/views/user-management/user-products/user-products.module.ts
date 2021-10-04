import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProductsRoutingModule } from './user-products-routing.module';
import { UserProductsComponent } from './user-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UserProductsComponent,
    AddProductsComponent,
    EditProductsComponent
  ],
  imports: [
    CommonModule,
    UserProductsRoutingModule,
    SharedModule
  ]
})
export class UserProductsModule { }
