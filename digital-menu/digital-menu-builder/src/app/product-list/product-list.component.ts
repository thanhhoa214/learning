import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ProductList } from '../shared/models/product-list.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  ownName: 'swd-product-list';
  @Input() productList: ProductList = {
    id: 1,
    title: 'Today Special',
    boxId: 1,
    maxSize: 6,
    products: [
      {
        id: 1,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
      {
        id: 2,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
      {
        id: 2,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
      {
        id: 2,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
      {
        id: 2,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
      {
        id: 2,
        title: 'Hello World',
        description: 'description',
        price: '123123',
        src: null,
        storeId: null,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  getFilteredProducts() {
    return this.productList.products?.filter(
      (_, i) => i < this.productList.maxSize
    );
  }
}
