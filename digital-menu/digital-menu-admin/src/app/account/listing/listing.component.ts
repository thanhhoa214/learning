import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AccountReadDtoPagingResponseDto,
  AccountsService,
} from 'src/generated';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  account$: Observable<AccountReadDtoPagingResponseDto>;
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(private _accountService: AccountsService) {}

  ngOnInit() {
    this.account$ = this._accountService.apiAccountsGet(
      1,
      this.pagingOptions.limit
    );
  }
  loadAccounts(page: number) {
    const searchValue = this.search.value;
    this.account$ = this._accountService.apiAccountsGet(
      page,
      this.pagingOptions.limit,
      searchValue
    );
    this.pagingOptions = { ...this.pagingOptions, currentPage: page };
  }

  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
}
