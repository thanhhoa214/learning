import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  ScreenTemplateReadDtoPagingResponseDto,
  ScreenTemplatesService,
} from 'src/generated';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {
  display$: Observable<ScreenTemplateReadDtoPagingResponseDto>;
  search: FormControl = new FormControl('');

  pagingOptions = {
    limit: 10,
    currentPage: 1,
  };

  constructor(private _displayService: ScreenTemplatesService) {}

  ngOnInit() {
    this.display$ = this._displayService.apiScreenTemplatesGet(
      1,
      this.pagingOptions.limit
    );
  }

  loadDisplays(page = 1) {
    const searchValue = this.search.value;
    this.display$ = this._displayService.apiScreenTemplatesGet(
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
