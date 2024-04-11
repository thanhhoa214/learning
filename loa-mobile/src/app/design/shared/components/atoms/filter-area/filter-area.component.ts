import { Component, Input, AfterViewInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonRange } from "@ionic/angular";
import { DesignListingService } from "@loa-mobile/design/listing/listing.service";
import { AREA_FILTER_RULE } from "@loa-mobile/design/shared/models";
import { RangeOptions } from "@loa-mobile/design/shared/models/range-options.model";
import { SubSinkable } from "@loa-shared/models";
import { isEquals } from "@loa-shared/utils";
import { initFormGroupValue } from "@loa-mobile/design/filter/filter.component";
@Component({
  selector: "loa-mobile-filter-area",
  templateUrl: "./filter-area.component.html",
  styleUrls: ["./filter-area.component.scss"],
})
export class FilterAreaComponent extends SubSinkable implements AfterViewInit {
  @Input() formGroup: FormGroup;
  @ViewChild("range") range: IonRange;

  isInit = true;
  rangeOptions: RangeOptions = {
    min: AREA_FILTER_RULE.MIN,
    max: AREA_FILTER_RULE.MAX,
    step: 50,
    init: { lower: AREA_FILTER_RULE.MIN, upper: AREA_FILTER_RULE.MAX },
  };
  sizeRange = [
    { value: AREA_FILTER_RULE.MIN, title: "~ 50sqm" },
    { value: 50, title: "50sqm" },
    { value: 100, title: "100sqm" },
    { value: 150, title: "150sqm" },
    { value: 200, title: "200sqm" },
    { value: 250, title: "250sqm" },
    { value: 300, title: "300sqm" },
    { value: 350, title: "350sqm" },
    { value: AREA_FILTER_RULE.MAX, title: "Over 400sqm" },
  ];
  isShowSizeSection = false;
  isFullRange = true;

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngAfterViewInit(): void {
    this._subSink.sink = this._listingService.filters$.subscribe((value) => {
      const { areaFrom = 0, areaTo = AREA_FILTER_RULE.MAX } = value;

      if (areaFrom !== 0 && areaTo !== AREA_FILTER_RULE.MAX) {
        this.isShowSizeSection = true;
      }
      if (this.range)
        this.range.value = {
          lower: areaFrom,
          upper: areaTo,
        };
      this.formGroup.patchValue({ areaFrom, areaTo });
    });
  }

  setSliderValue(size: number): void {
    const sliderValue = this._calcSizeRange(size);
    this.range.value = sliderValue;
  }
  ionChange({ detail }: CustomEvent): void {
    const { lower, upper } = detail.value;

    if (isEquals(detail.value, this.rangeOptions.init)) {
      this.isFullRange = true;
    } else {
      this.isFullRange = false;
    }
    this.formGroup.patchValue({
      areaFrom: lower,
      areaTo: upper,
    });

    if (isEquals(this.formGroup.value, initFormGroupValue)) {
      this.isInit = true;
    } else {
      this.isInit = false;
    }
  }

  private _calcSizeRange(size: number): IonRange["value"] {
    const { areaFrom, areaTo } = this.formGroup.value;
    /*
    Split into 7 cases:
      1. First both areaFrom and areaTo are DEFAULT.
      > Click SIZE with set:
        - areaFrom = SIZE
        - areaTo = sizeRange(SIZE) + 1

      4. Either areaFrom or areaTo is set already, only 1 chosen node..
      > Click SIZE equal it:
        - areaFrom = DEFAULT
        - areaTo = DEFAULT
        - isInit = true

      5. Both areaFrom and areaTo are set already.
      > Click SIZE between [areaFrom, areaTo] with set:
        - areaFrom = SIZE
        - areaTo = sizeRange(SIZE) + 1

      6. Both areaFrom and areaTo are set already.
      > Click SIZE lower than areaFrom with set:
        - areaFrom = SIZE

      7. Both areaFrom and areaTo are set already.
      > Click SIZE higher than areaTo with set:
        - areaTo = SIZE

      8. If areaFrom to areaTo fill all range.
      > reset

    */
    const areaFromStillDefault =
      areaFrom === undefined || areaFrom === AREA_FILTER_RULE.MIN;
    const areaToStillDefault =
      areaTo === undefined || areaTo === AREA_FILTER_RULE.MAX;
    const sizeBetween = size >= areaFrom && size <= areaTo;
    const indexOfSize = this.sizeRange.findIndex((s) => s.value === size);
    const indexOfAreaFrom = this.sizeRange.findIndex(
      (s) => s.value === areaFrom
    );
    const indexOfAreaTo = this.sizeRange.findIndex(
      (s) => s.value === areaTo + 1
    );

    // Case 1:
    if (areaFromStillDefault && areaToStillDefault) {
      if (indexOfSize === 0) {
        return {
          lower: areaFrom,
          upper: this.sizeRange[1].value - 1,
        };
      }
      if (indexOfSize === this.sizeRange.length - 1) {
        return {
          lower: this.sizeRange[indexOfSize].value,
          upper: areaTo,
        };
      }
      return {
        lower: size,
        upper: this.sizeRange[indexOfSize + 1].value - 1,
      };
    } else {
      const areaFromNextToAreaTo =
        indexOfAreaFrom + 1 === indexOfAreaTo ||
        (indexOfAreaFrom === this.sizeRange.length - 1 && indexOfAreaTo === -1);
      if (size === areaFrom && areaFromNextToAreaTo) {
        return {
          lower: AREA_FILTER_RULE.MIN,
          upper: AREA_FILTER_RULE.MAX,
        };
      }
    }

    // Case 3:
    if (sizeBetween) {
      if (size === areaFrom) {
        return {
          lower: this.sizeRange[indexOfAreaFrom + 1].value,
          upper: areaTo,
        };
      }

      if (
        indexOfSize + 1 === indexOfAreaTo ||
        (indexOfSize === this.sizeRange.length - 1 && indexOfAreaTo === -1)
      ) {
        return {
          lower: areaFrom,
          upper: this.sizeRange[indexOfSize].value - 1,
        };
      }
      if (size === areaTo && size === this.rangeOptions.max) {
        return {
          lower: size,
          upper: size,
        };
      }
      return {
        lower: size,
        upper: this.sizeRange[indexOfSize + 1].value - 1,
      };
    } else {
      if (size === this.rangeOptions.max) {
        return {
          lower: areaFrom,
          upper: size,
        };
      }
      if (size < areaFrom) {
        return {
          lower: size,
          upper: areaTo,
        };
      }
      if (size > areaTo) {
        return {
          lower: areaFrom,
          upper: this.sizeRange[indexOfSize + 1].value - 1,
        };
      }
    }
  }
}
