import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/Product';
import { CartProduct } from '../../models/CartProduct';
import { CartService } from '../../services/cart/cart.service';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() quantityOptions: Number[];
  @Output() productHiddenSignal = new EventEmitter<number>();

  selectedQuantityOption: number;

  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      url: '',
      description: ''
    };
    this.quantityOptions = [];
    this.selectedQuantityOption = 1;
  }

  ngOnInit(): void {
  }

  addToCart(event: any) {
    let selectedObtion = event.target[0].options[event.target[0].options.selectedIndex].value;
    let cartProduct: CartProduct = {...this.product, option: Number(this.selectedQuantityOption)};
    this.cartService.checkProductInCart(cartProduct);
    window.alert("Added to cart!");
  }

  onChange(quantityOption: Number) {
    if(!(quantityOption > 0)) {
      this.productHiddenSignal.emit(this.product.id);
    }
  }

}
