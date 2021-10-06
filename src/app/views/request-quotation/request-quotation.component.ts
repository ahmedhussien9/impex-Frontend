import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { Product } from 'src/app/shared/models/product.model';
import { HttpProductService } from '../home/services/products.service';

@Component({
  selector: 'app-request-quotation',
  templateUrl: './request-quotation.component.html',
  styleUrls: ['./request-quotation.component.scss']
})
export class RequestQuotationComponent implements OnInit {
  formGroup: FormGroup;
  loading = false;
  product: Product;
  hsCodeId: string;
  INCO_LIST = ["FOB"]
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private httpProdcutService: HttpProductService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap(params => {
        this.hsCodeId = params.id;
        return this.httpProdcutService.getSingleProductApi(params.id)
      })).subscribe(data => {
        this.product = data.body;
      });
  }

  submit() { }

}
