import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize, map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { Product } from 'src/app/shared/models/product.model';
import { HttpProductService } from 'src/app/views/home/services/products.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
  singleFileSource: File;
  file: any;
  fileDetail: any;
  formGroup: FormGroup;
  loading = false;
  hsCodeId: string;
  product: Product;
  constructor(
    private fb: FormBuilder,
    private httpProdcutService: HttpProductService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.formGroup = this.fb.group({
      "HSCode": ['', Validators.required],
      "name": ['', Validators.required],
      "mOQ": ['', Validators.required],
      "status": "forSale",
      "unitPrice": ['', Validators.required],
      "notes": [''],
      "image": [''],
      "description": [''],
      "seller": [''],
    })
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap(params => {
        this.hsCodeId = params.id;
        return this.httpProdcutService.getSingleProductApi(params.id)
      }),
      map(data => data.body)
    ).subscribe(data => {
      this.product = data;
      this.setFormData(this.product)
    });


  }

  setFormData(product: Product) {
    this.formGroup.get("HSCode").setValue(product.HSCode);
    this.formGroup.get("name").setValue(product.name);
    this.formGroup.get("mOQ").setValue(product.mOQ);
    this.formGroup.get("unitPrice").setValue(product.unitPrice);
    this.formGroup.get("notes").setValue(product.notes.split('|')[0]);
    this.formGroup.get("image").setValue(product.notes.split('|')[1]);
    this.formGroup.get("description").setValue(product.notes.split('|')[0]);
    this.formGroup.get("seller").setValue(this.authService.getSellerName());
  }
  // Select file handler
  onSelectFileOfficalLetter(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.convertFileToBase64(file).then(data => {
      this.formGroup.get('image').patchValue(data);
    });
  }

  convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  submit() {
    this.loading = true;
    const body = {
      "$class": "org.acme.supply_chain_network.Product",
      "HSCode": this.formGroup.get("HSCode").value,
      "name": this.formGroup.get("name").value,
      "mOQ": this.formGroup.get("mOQ").value,
      "status": "forSale",
      "unitPrice": this.formGroup.get("unitPrice").value,
      "notes": `${this.formGroup.get("description").value}|${this.formGroup.get("image").value}`,
      "seller": this.formGroup.get("seller").value
    }
    this.httpProdcutService.editProductApi(body, this.hsCodeId).pipe(
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.toastr.success("Product has been updated successfully");
      this.formGroup.reset();
    })
  }
}
