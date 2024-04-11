import { Component, ViewChild } from '@angular/core';
import {
  IonInfiniteScroll,
  IonSearchbar,
  ViewDidEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { ConstructionListingService } from './listing.service';
import {
  ConstructionListingStateModel,
  ShareDeSignConstruction,
} from './store';
import { merge, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { SubSinkable } from '@loa-shared/models';
import { Store } from '@ngxs/store';
import { BranchDeepLinksWeb } from 'capacitor-branch-deep-links';
import { Plugins } from '@capacitor/core';
const { BranchDeepLinks } = Plugins;

export type FilterType =
  | 'all'
  | 'construction_type'
  | 'style'
  | 'house_type'
  | 'room_type'
  | 'area'
  | 'price_range';

@Component({
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent extends SubSinkable
  implements ViewDidEnter, ViewWillLeave {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  @ViewChild(IonInfiniteScroll) private _infiniteScroll: IonInfiniteScroll;

  constructions$: Observable<ConstructionListingStateModel['constructions']>;

  private _latestEndCursor: string;

  constructor(
    private _listingService: ConstructionListingService,
    private _translate: TranslateService,
    private _titleService: Title,
    private _store: Store
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this._translate.get('TITLES.constructions').subscribe((title) => {
      this._titleService.setTitle(`${title} | Interior Design`);
    });

    this.constructions$ = this._listingService.constructions$;
    const constructions = this._listingService.constructions;
    this._listingService.loadConstructions({
      first: constructions?.edges.length ? constructions.edges.length : 10,
      name: this.searchbar.value,
    });
    this._infiniteScroll.disabled = true;

    this._registerSearching();
    this._registerLoadConstructionsCompleted();
  }
  ionViewWillLeave() {
    localStorage.removeItem('shareDesign');
  }

  async mailToDesign(node) {
    const designId = localStorage.getItem('shareDesign');
    const routingUrl = `/design/${designId}`;
    const {
      url,
    } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl({
      analytics: null,
      properties: {
        custom_string: routingUrl,
      },
    });
    const params = {
      constructor: node.id,
      design: JSON.parse(designId),
    };
    if (JSON.parse(designId)) {
      this._store.dispatch(new ShareDeSignConstruction(params));
      const mailText = 'mailto:' + node.email + '?subject=' + '&body=' + url;
      window.location.href = mailText;
    } else {
      const mailText = 'mailto:' + node.email;
      window.location.href = mailText;
    }
  }

  loadMore() {
    const constructions = this._listingService.constructions;
    const endCursor = constructions.pageInfo.endCursor;
    if (
      constructions.pageInfo.hasNextPage &&
      endCursor !== this._latestEndCursor
    ) {
      this._latestEndCursor = endCursor;
      this._listingService.loadConstructionsMore({
        name: this.searchbar.value,
        after: endCursor,
      });
      this._infiniteScroll.complete();
    }
  }

  private _registerSearching() {
    this._subSink.sink = this.searchbar.ionChange.subscribe(
      (event: CustomEvent) => {
        this._listingService.loadConstructions({
          name: event.detail.value,
        });
      }
    );
  }

  private _registerLoadConstructionsCompleted() {
    this._subSink.sink = merge(
      this._listingService.onLoadConstructionsCompleted(),
      this._listingService.onLoadConstructionsMoreCompleted()
    ).subscribe(() => {
      const constructions = this._listingService.constructions;
      if (constructions?.pageInfo.hasNextPage) {
        this._infiniteScroll.disabled = false;
      } else {
        this._infiniteScroll.disabled = true;
      }
    });
  }
}
