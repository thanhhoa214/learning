export interface ProductListProduct {
    id: number;
    productListId: number;
    productId: number;
    location: number;
}

export type ProductListProducts = Array<ProductListProduct>;