import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Product } from 'src/app/shared/models/product.model';
import { HttpProductService } from '../../home/services/products.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss']
})
export class UserProductsComponent implements OnInit {
  product$: Observable<Product[]>;
  constructor(
    private httpProductService: HttpProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.callProducts();
  }

  callProducts() {
    this.product$ = this.httpProductService.getProductsApi().pipe(map(data => data['body']));
  }
  
  deleteProduct(product: Product) {
    if (confirm(`Are you sure that you want to delete ${product.name}`)) {
      this.httpProductService.deleteProduct(product.HSCode).subscribe(data => {
        console.log(data);
        this.callProducts();
        this.toastr.error(`Product ${product.name} has been deleted successfully`)
      })
    }
  }
  // confirmDelete(body): void {
  //   const lang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
  //   const message = lang === "en" ? `Are you sure you want to delete this item?` : `هل أنت متأكد أنك تريد المضي قدمًا فى الحذف ؟`;
  //   const title = lang === "en" ? "Confirm delete action" : 'تأكيد عملية الحذف';
  //   const dialogData = new ConfirmDialogModel(title, message);
  //   const dialogRef = this.dialogRef.open(ConfirmDialogComponent, {
  //     maxWidth: "400px",
  //     data: dialogData
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       this.delete(body);
  //     }
  //   });
  // }

}
