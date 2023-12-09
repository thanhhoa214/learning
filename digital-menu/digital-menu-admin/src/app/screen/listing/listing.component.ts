import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/account.service';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import {
  AccountReadDto,
  ScreenReadDtoPagingResponseDto,
  ScreensService,
  StoreReadDtoPagingResponseDto,
  StoresService,
} from 'src/generated';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  screenResponse: ScreenReadDtoPagingResponseDto;
  stores: StoreReadDtoPagingResponseDto;
  account: AccountReadDto;

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(
    private storeService: StoresService,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private screenService: ScreensService
  ) {}

  async ngOnInit() {
    this.account = this.accountService.getAccount();
    if (this.account.roleId === 1) {
      this.storeService
        .apiStoresIdScreensGet(this.account.id, 1, this.pagingOptions.limit)
        .subscribe((data) => {
          this.screenResponse = data;
        });
    } else if (this.account.roleId === 3) {
      this.screenService
        .apiScreensGet(1, this.pagingOptions.limit)
        .subscribe((data) => {
          this.screenResponse = data;
        });
    }
  }

  loadScreens(page = 1) {
    if (this.account.roleId === 1) {
      this.storeService
        .apiStoresIdScreensGet(this.account.id, 1, this.pagingOptions.limit)
        .subscribe((data) => {
          this.screenResponse = data;
        });
      this.pagingOptions = { ...this.pagingOptions, currentPage: page };
    } else if (this.account.roleId === 3) {
      this.storeService
        .apiStoresIdScreensGet(page, this.pagingOptions.limit)
        .subscribe((data) => {
          this.screenResponse = data;
        });
      this.pagingOptions = { ...this.pagingOptions, currentPage: page };
    }
  }
  getStoreName(storeId: number): string {
    return storeId + '';
  }
  getPagingArray(totolItem: number) {
    const pageCount = Math.round(totolItem / this.pagingOptions.limit);
    return Array(pageCount).fill(1);
  }
  removeScreen(event: any, screenId: number) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.screenService.apiScreensIdDelete(screenId).subscribe(() => {
      this.snackBar.openFromComponent(SnackBarSuccessComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'mat-snack-bar-success',
        data: { title: 'Success !', message: 'Remove screen successfully' },
      });
      this.loadScreens();
    });
  }
}
