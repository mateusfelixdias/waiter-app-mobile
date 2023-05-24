import { IProduct } from './product';

export interface ICartItem {
  quantity: number;
  product: IProduct;
}
