import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account.service';
import {
  AccountReadDto,
  ProductReadDtoPagingResponseDto,
  ProductsService,
  StoresService,
} from 'src/generated';
@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  products$: Observable<ProductReadDtoPagingResponseDto>;
  search: FormControl = new FormControl('');
  account: AccountReadDto;

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(
    private productService: ProductsService,
    private storeService: StoresService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.account = this.accountService.getAccount();
    if (this.account.roleId === 1) {
      this.products$ = this.storeService.apiStoresIdProductsGet(
        this.account.storeId,
        1,
        this.pagingOptions.limit
      );
    } else if (this.account.roleId === 3) {
      this.products$ = this.productService.apiProductsGet(
        1,
        this.pagingOptions.limit
      );
    }
  }

  loadProducts(page: number) {
    const searchValue = this.search.value;
    if (this.account.roleId === 1) {
      this.products$ = this.storeService.apiStoresIdProductsGet(
        this.account.storeId,
        page,
        this.pagingOptions.limit,
        searchValue
      );
      this.pagingOptions = { ...this.pagingOptions, currentPage: page };
    } else if (this.account.roleId === 3) {
      this.products$ = this.productService.apiProductsGet(
        page,
        this.pagingOptions.limit,
        searchValue
      );
      this.pagingOptions = { ...this.pagingOptions, currentPage: page };
    }
  }

  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
}
