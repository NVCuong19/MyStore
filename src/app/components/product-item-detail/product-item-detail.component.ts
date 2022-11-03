import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/products/product.service';
import { CartProduct } from '../../models/CartProduct';
import { CartService } from '../../services/cart/cart.service';



@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  products: Product[];
  product: Product;
  quantityOptions: Number[];

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) {
    this.products = [];
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    };
    this.quantityOptions = [];
  }

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.product = res.filter((prod) => {
        return prod.id == params['id'];
      })[0];
    });
    this.quantityOptions = this.productService.quantityOptions.slice(1);
  }


  onSubmit(event: any) {
    let selectedObtion = event.target[0].options[event.target[0].options.selectedIndex].value;
    let cartProduct: CartProduct = {...this.product, option: Number(selectedObtion)};
    this.cartService.checkProductInCart(cartProduct);
    window.alert("Added to cart!");
  }

}
