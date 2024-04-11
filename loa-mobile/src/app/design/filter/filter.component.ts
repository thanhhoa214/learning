import { Location } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { IonSearchbar, ViewDidEnter, ViewWillLeave } from "@ionic/angular";
import { DesignListingService } from "@loa-mobile/design/listing/listing.service";
import { SubSinkable } from "@loa-shared/models";
import { DesignDesignType } from "@loa-shared/models/graphql.model";
import { BottomBarVisibilityService } from "@loa-shared/services/bottom-bar-visibility.service";
import {
  AREA_FILTER_RULE,
  CONSTRUCTION_PRICE_FILTER_RULE,
  PRICE_FILTER_RULE,
} from "../shared/models";
import { Filters } from "../shared/models/filter.model";

export const initFormGroupValue = {
  lowestPrice: 0,
  highestPrice: 300000,
  lowestConstructionPrice: 0,
  highestConstructionPrice: 1400000000,
  houseTypes: [],
  styles: [],
  roomTypes: [],
  designType: undefined,
  areaFrom: 0,
  areaTo: 500,
};
@Component({
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent extends SubSinkable
  implements ViewDidEnter, ViewWillLeave {
  @ViewChild(IonSearchbar) searchbar: IonSearchbar;

  designTypes: DesignDesignType[] = [
    DesignDesignType.WholeHouse,
    DesignDesignType.Room,
  ];
  formGroup: FormGroup;
  isInit = true;
  private _initFilter: Filters;

  constructor(
    private _formBuilder: FormBuilder,
    private _listingService: DesignListingService,
    private _router: Router,
    private _bottomBarVisibility: BottomBarVisibilityService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location
  ) {
    super();
    this.formGroup = this._formBuilder.group({ projectName: [""] });
    this._loadFilterValue();
  }
  ionViewDidEnter() {
    this.formGroup = this._formBuilder.group({ projectName: [""] });
    const { fromHome } = this._activatedRoute.snapshot.queryParams;
    if (fromHome) {
      this.searchbar.setFocus();
    }
    this._loadFilterValue();
    this.searchbar.value = this._initFilter.projectName;
    this._bottomBarVisibility.hide();
  }
  ionViewWillLeave(): void {
    this._bottomBarVisibility.show();
  }

  back() {
    this._listingService.saveFilters(this._initFilter);
    this._location.back();
  }

  reset() {
    this.searchbar.value = "";
    this._listingService.saveFilters({});
    this._patchFilterValue();
  }

  applyChanges() {
    this._listingService.saveFilters({
      ...this.formGroup.value,
      projectName: this.searchbar.value ?? undefined,
    });
    this._router.navigateByUrl("design/listing");
  }

  private _loadFilterValue() {
    this._initFilter = this._listingService.filters;
    const {
      areaFrom = AREA_FILTER_RULE.MIN,
      areaTo = AREA_FILTER_RULE.MAX,
      designType,
      houseTypes = [],
      styles = [],
      roomTypes = [],
      lowestPrice = PRICE_FILTER_RULE.MIN,
      highestPrice = PRICE_FILTER_RULE.MAX,
      lowestConstructionPrice = 0,
      highestConstructionPrice = CONSTRUCTION_PRICE_FILTER_RULE.MAX,
    } = this._listingService.filters;

    this.formGroup = this._formBuilder.group({
      lowestPrice: [lowestPrice],
      highestPrice: [highestPrice],
      lowestConstructionPrice: [lowestConstructionPrice],
      highestConstructionPrice: [highestConstructionPrice],
      designType: [designType],
      houseTypes: [houseTypes],
      styles: [styles],
      roomTypes: [roomTypes],
      areaFrom: [areaFrom],
      areaTo: [areaTo],
    });
  }
  private _patchFilterValue() {
    const {
      areaFrom = 0,
      areaTo = AREA_FILTER_RULE.MAX,
      designType,
      houseTypes = [],
      styles = [],
      roomTypes = [],
      lowestPrice = 0,
      highestPrice = PRICE_FILTER_RULE.MAX,
      lowestConstructionPrice = 0,
      highestConstructionPrice = CONSTRUCTION_PRICE_FILTER_RULE.MAX,
    } = this._listingService.filters;

    this.formGroup.patchValue({
      lowestPrice,
      highestPrice,
      lowestConstructionPrice,
      highestConstructionPrice,
      designType,
      houseTypes,
      styles,
      roomTypes,
      areaFrom,
      areaTo,
    });
  }
}
