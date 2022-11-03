import { Injectable } from '@angular/core';
import { CartProduct } from '../../models/CartProduct';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartProduct[];
  order: Order;

  constructor() {
    this.items = [];
    this.order = {
      id: 0,
      customerName: '',
      address: '',
      creditCart: 0,
      products: []
    };
  }

  addToCart(product: CartProduct): void {
    this.items.push(product);
  }

  getItems(): CartProduct[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }

  updateCart(item: CartProduct): void {
    if(item.option <= 0) {
      this.items = this.items.filter((it, index) => {
        return it.id != item.id;
      });
    } else {
      let _item = this.items.filter((it) => {
        return it.id == item.id;
      })[0];
      _item.option = item.option;
    }

  }

  checkProductInCart(item: CartProduct):void {
    let _item = this.items.filter((it) => {
      return it.id == item.id;
    });
    if(_item.length > 0) {
      let _item = this.items.filter((it) => {
        return it.id == item.id;
      })[0];
      _item.option += item.option;
    } else {
      this.addToCart(item);
    }

  }

  setOrder(order: Order) {
    this.order = order;
  }
}
