export interface Product {
  id: number;
  title: string;
  description: string;
  price: string | number;
  src: string;
  storeId?: string;
  location?: number;
}

export type Products = Array<Product>;
