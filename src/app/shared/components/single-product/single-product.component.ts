import { Component, Input, OnInit } from '@angular/core';
import { strictEqual } from 'assert';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit(): void {
  }

  getExporter(seller) {
    return seller.split("#")[1]
  }

  splitDescription(str) {
    const description = str.split("|")[0];
    return description;
  }

  splitImg(str) {
    const img = str.split("|")[1];
    return img || './assets/images/product.png';
  }

}
