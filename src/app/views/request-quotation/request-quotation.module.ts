import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestQuotationRoutingModule } from './request-quotation-routing.module';
import { RequestQuotationComponent } from './request-quotation.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RequestQuotationComponent
  ],
  imports: [
    CommonModule,
    RequestQuotationRoutingModule,
    SharedModule
  ]
})
export class RequestQuotationModule { }
