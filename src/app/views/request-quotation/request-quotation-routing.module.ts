import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestQuotationComponent } from './request-quotation.component';

const routes: Routes = [
  {
    path: "",
    component: RequestQuotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestQuotationRoutingModule { }
