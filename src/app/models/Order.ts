import { CartProduct } from './CartProduct';

export interface Order {
  id: number;
  customerName: string;
  address: string;
  creditCart: number;
  products: CartProduct[];
}
