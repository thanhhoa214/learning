import { Products } from './product.model';

export interface ProductList {
  id: number;
  title: string;
  boxId: number;
  maxSize: number;
  products?: Products;
  location?: number;
}

export type ProductLists = Array<ProductList>;
