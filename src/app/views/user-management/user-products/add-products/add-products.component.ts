import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { UploadSingleFileClass } from 'src/app/shared/classes/uploadSingleFile/uploadSingleFile.class';
import { HttpProductService } from 'src/app/views/home/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  singleFileSource: File;
  file: File;
  fileDetail: any;
  formGroup: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private httpProdcutService: HttpProductService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      "HSCode": ['', Validators.required],
      "name": ["", Validators.required],
      "mOQ": ["", Validators.required],
      "status": "forSale",
      "unitPrice": ["", Validators.required],
      "notes": "",
      "image": "",
      "description": "",
      "seller": this.authService.getSellerName()
    })
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
      "seller": JSON.parse(localStorage.getItem("userData")).name
    }
    this.httpProdcutService.addProductApi(body).pipe(
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.toastr.success("Product has been added successfully");
      this.formGroup.reset();
    })
  }

}
