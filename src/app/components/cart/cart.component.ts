import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartProduct } from '../../models/CartProduct';
import { Order } from '../../models/Order';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customerInfo: FormGroup;
  items: CartProduct[];
  order: Order;
  totalPrice: number;

  constructor(private cartService: CartService, private router: Router) {
    this.items = [];
    this.customerInfo = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      address: new FormControl('', [Validators.required, Validators.minLength(6)]),
      creditCardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)])
    });
    this.totalPrice = 0;
    this.order = {
      id: 0,
      customerName: '',
      address: '',
      creditCart: 0,
      products: []
    };
  }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.totalPrice = this.getTotalPrice();
  }

  onSubmit() {
    if(this.customerInfo.valid && this.totalPrice > 0) {
      const controls = this.customerInfo.controls;
      this.order = {
        id: 1,
        customerName: controls['fullName'].value,
        address: controls['address'].value,
        creditCart: controls['creditCardNumber'].value,
        products: this.items
      };
      this.cartService.setOrder(this.order);
      this.router.navigate(['/confirmation']);
    }
  }

  valueChange(item: CartProduct, event: any): void {
    this.cartService.updateCart(item);
    if(item.option <= 0) {
      this.items = this.items.filter((cartP, index) => {
        return cartP.id != item.id;
      });
      setTimeout(() => {
        window.alert('Removed from cart!')
      }, 500);
    }
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice():number {
   let total = 0;
    this.items.forEach((item) => {
      total += item.price * item.option;
    });
    return Number(total.toFixed(2));
  }
}
