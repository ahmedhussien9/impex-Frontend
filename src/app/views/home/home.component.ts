import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { Product } from 'src/app/shared/models/product.model';
import { HttpProductService } from './services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  product$: Observable<Product[]>;
  constructor(
    private httpProductService: HttpProductService
  ) { }

  ngOnInit(): void {
    this.product$ = this.httpProductService.getProductsApi().pipe(map(data => data['body']));
  }

}
