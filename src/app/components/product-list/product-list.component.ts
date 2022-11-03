import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  quantityOptions: Number[];

  constructor(private productService: ProductService) {
    this.products = [];
    this.quantityOptions = [];
  }

  ngOnInit(): void {
    this.quantityOptions = this.productService.quantityOptions;
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  hideProductItem(prodId: number) {
    this.products = this.products.filter((prod) => {
      return prod.id != prodId;
    });
  }

}
