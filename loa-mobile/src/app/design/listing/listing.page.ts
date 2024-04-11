import { Component, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IonInfiniteScroll, IonSearchbar, ViewDidEnter } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { SubSinkable } from '@loa-shared/models';
import { BottomBarVisibilityService } from '@loa-shared/services/bottom-bar-visibility.service';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { merge, Observable } from 'rxjs';
import { DesignDetailService } from '../detail/detail.service';
import { BookmarkDesignDetail } from '../detail/store';
import { DesignListingService } from './listing.service';
import { DesignListingStateModel } from './store';

export type FilterType =
  | 'all'
  | 'design_type'
  | 'style'
  | 'house_type'
  | 'room_type'
  | 'area'
  | 'price_range';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage extends SubSinkable implements ViewDidEnter {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  @ViewChild(IonInfiniteScroll) private _infiniteScroll: IonInfiniteScroll;

  designs$: Observable<DesignListingStateModel['designs']>;
  hasFilters: boolean;

  private _latestEndCursor: string;

  constructor(
    private _listingService: DesignListingService,
    private _detailService: DesignDetailService,
    private _loginService: LoginService,
    private _notify: NotificationService,
    private _translate: TranslateService,
    private _titleService: Title,
    private _bottomBarVisibility: BottomBarVisibilityService
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this._bottomBarVisibility.show();
    this._translate.get('TITLES.designs').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });

    this.designs$ = this._listingService.designs$;
    this.hasFilters = this._listingService.hasFilters();
    this._infiniteScroll.disabled = true;

    this.searchbar.value = this._listingService.filters?.projectName;
    const designs = this._listingService.designs;
    this._listingService.loadDesignsWithFilters({
      first: designs?.edges.length ? designs?.edges.length : 5,
    });

    this._registerSearching();
    this._registerBookmarkCompleted();
    this._registerLoadDesignsCompleted();
  }

  bookmark(event: Event, id: string) {
    event.preventDefault();
    event.stopImmediatePropagation();
    const user = this._loginService.snapshot?.userNode;
    if (user) {
      this._detailService.bookmark({ id });
    } else {
      this._translate.get('MESSAGE.AUTH.must_login').subscribe((data) => {
        this._notify.openSnackBar(data, 'error', true);
      });
    }
  }

  loadMore() {
    const designs = this._listingService.designs;
    const endCursor = designs.pageInfo.endCursor;
    if (designs.pageInfo.hasNextPage && endCursor !== this._latestEndCursor) {
      this._latestEndCursor = endCursor;
      this._listingService.loadDesignsWithFilters(
        {
          after: endCursor,
        },
        true
      );
      this._infiniteScroll.complete();
    }
  }
  private _registerSearching() {
    this._subSink.sink = this.searchbar.ionChange.subscribe(
      (event: CustomEvent) => {
        this._listingService.patchFilters({ projectName: event.detail.value });
        const designs = this._listingService.designs;
        this._listingService.loadDesignsWithFilters({
          first: designs?.edges.length ? designs.edges.length : 5,
        });
      }
    );
  }
  private _registerBookmarkCompleted(): void {
    this._subSink.sink = this._detailService
      .onBookmarkCompleted()
      .subscribe(({ payload }: BookmarkDesignDetail) => {
        this._listingService.toggleBookmarkStatusById(payload.id);
      });
  }
  private _registerLoadDesignsCompleted() {
    this._subSink.sink = merge(
      this._listingService.onLoadDesignsCompleted(),
      this._listingService.onLoadDesignsMoreCompleted()
    ).subscribe(() => {
      const designs = this._listingService.designs;
      if (designs.pageInfo.hasNextPage) {
        this._infiniteScroll.disabled = false;
      } else {
        this._infiniteScroll.disabled = true;
      }
    });
  }
}
