import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Order } from '../../models/Order';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  order: Order;
  totalPrice: number;

  constructor(private cartService: CartService, private router: Router) {
    this.order = {
      id: 0,
      customerName: '',
      address: '',
      creditCart: 0,
      products: []
    };
    this.totalPrice = 0;
  }

  ngOnInit(): void {
    this.order = this.cartService.order;
    this.order.products.forEach((prod) => {
      this.totalPrice += prod.price * prod.option;
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }

}
