import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonSearchbar,
  IonInfiniteScroll,
  ViewWillLeave,
  ViewDidEnter,
} from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { ConstructionListingService } from '@loa-mobile/construction/listing/listing.service';
import { ConstructionListingStateModel } from '@loa-mobile/construction/listing/store';
import { SubSinkable } from '@loa-shared/models';
import { merge, Observable } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent extends SubSinkable
  implements ViewDidEnter, ViewWillLeave {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;
  @ViewChild(IonInfiniteScroll) private _infiniteScroll: IonInfiniteScroll;

  constructions$: Observable<ConstructionListingStateModel['constructions']>;
  private _latestEndCursor: string;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedStar = 1;
  tempImages = [];
  imagesNew = [];
  checkImage = false;
  checkEmpty = true;
  checkSubmit = false;
  user;
  constructor(
    private _listingService: ConstructionListingService,
    private _router: Router,
    private _loginService: LoginService
  ) {
    super();
  }
  ionViewDidEnter(): void {
    this.constructions$ = this._listingService.constructions$;
    const constructions = this._listingService.constructions;
    this._listingService.loadConstructions({
      first: constructions?.edges.length ? constructions.edges.length : 10,
      name: this.searchbar.value,
    });
    this._infiniteScroll.disabled = true;
    this.user = this._loginService.snapshot?.userNode;

    this._registerSearching();
    this._registerLoadConstructionsCompleted();
  }

  deleteMyReview(ev: Event) {
    console.log(ev);
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

  ngOnInit() {
    console.log('Init>>>>');
  }

  writeReview(id) {
    this._router.navigate([
      '/menu/my-construction-review/write-review/create/' + id,
    ]);
  }
}
