import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.product$ = this.httpProductService.getProductsApi().pipe(map(data => data['body']));

    this.product$.subscribe(data => {
      data.forEach(product => {
        return {

        }
      })
    })
  }


  addNewProduct() {
    this.router.navigate(["/dash", "user-management", "my-products", "add-product"])
  }

}
