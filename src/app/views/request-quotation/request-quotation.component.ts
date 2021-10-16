import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Product } from 'src/app/shared/models/product.model';
import { HttpProductService } from '../home/services/products.service';
import { RequestQuotationService } from './services/request-quotation.service';

@Component({
  selector: 'app-request-quotation',
  templateUrl: './request-quotation.component.html',
  styleUrls: ['./request-quotation.component.scss'],
})
export class RequestQuotationComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  product: Product;
  hsCodeId: string;
  INCO_LIST = ['FOB', 'FCA', 'EXW'];
  PAYMENT_TERMS = [
    'Cash against documnets',
    'Open account',
    'letter of credit',
  ];
  userData = JSON.parse(localStorage.getItem('userData'));
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private httpProdcutService: HttpProductService,
    public datepipe: DatePipe,
    private httpRqtQuotation: RequestQuotationService
  ) {
    this.formGroup = this.fb.group({
      $class: 'org.acme.supply_chain_network.RFQ',
      rFQId: parseInt((Date.now() + Math.random()).toFixed()), // done
      date: [new Date().toISOString()], // done
      quantity: [null, Validators.required], // done
      units: [null, Validators.required], // done
      notes: ['', Validators.required], // done
      offeringPrice: [null, Validators.required], // done
      shipeFrom: [null, Validators.required], // done
      shipeTo: [null, Validators.required], // done
      shippingTerms: ['', Validators.required], // done
      status: 'pending', // done
      referenceDoc: [[], Validators.required],
      preferredArrival: ['', Validators.required],
    });
  }

  selectDate(event) {
    const date = new Date(event.target.value);
    this.formGroup
      .get('preferredArrival')
      .setValue(this.datepipe.transform(date, 'yyyy-MM-dd'));
  }

  ngOnInit(): void {
    this.activeRoute.params
      .pipe(
        switchMap((params) => {
          this.hsCodeId = params.id;
          return this.httpProdcutService.getSingleProductApi(this.hsCodeId);
        })
      )
      .subscribe((data) => {
        this.product = data.body;
        this.formGroup.get('units').setValue(this.getUnit(this.product.mOQ));
      });
  }

  getExporter(seller) {
    return seller.split('#')[1];
  }

  getUnit(unit) {
    return unit.split(' ')[1];
  }
  
  submit() {
    const body = {
      $class: 'org.acme.supply_chain_network.BuyerSendRFQ',
      rFQ: {
        ...this.formGroup.value,
        shippingTerms: [this.formGroup.value.shippingTerms],
        buyer: `resource:org.acme.supply_chain_network.User#${this.userData.participantKey}`,
        seller: `resource:org.acme.supply_chain_network.User#${this.getExporter(
          this.product.seller
        )}`,
        bank: `resource:org.acme.supply_chain_network.Bank#${this.userData.bankId}`,
        product: `resource:org.acme.supply_chain_network.Product#${this.product.HSCode}`,
      },
      transactionId: '',
      timestamp: new Date().toISOString(),
    };

    this.httpRqtQuotation.createRqQuotation(body).subscribe((data) => {
      console.log(data);
    });
  }
}
