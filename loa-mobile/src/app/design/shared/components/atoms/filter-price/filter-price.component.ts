import { Component, Input, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonRange } from "@ionic/angular";
import { initFormGroupValue } from "@loa-mobile/design/filter/filter.component";
import { DesignListingService } from "@loa-mobile/design/listing/listing.service";
import { PRICE_FILTER_RULE } from "@loa-mobile/design/shared/models";
import { RangeOptions } from "@loa-mobile/design/shared/models/range-options.model";
import { SubSinkable } from "@loa-shared/models";
import { isEquals } from "@loa-shared/utils";

const FAKE_PRICE_FILTER_RULE_MAX = 200000;

@Component({
  selector: "loa-mobile-filter-price",
  templateUrl: "./filter-price.component.html",
  styleUrls: ["./filter-price.component.scss"],
})
export class FilterPriceComponent extends SubSinkable implements AfterViewInit {
  @Input() formGroup: FormGroup;
  @ViewChild("range") range: IonRange;

  isInit = true;
  rangeOptions: RangeOptions = {
    min: PRICE_FILTER_RULE.MIN,
    max: PRICE_FILTER_RULE.MAX,
    step: 50000,
    init: { lower: PRICE_FILTER_RULE.MIN, upper: PRICE_FILTER_RULE.MAX },
  };
  sizeRange = [
    { value: PRICE_FILTER_RULE.MIN, title: "~ 100K" },
    { value: 100000, title: "200K" },
    { value: FAKE_PRICE_FILTER_RULE_MAX, title: "Over 300K" },
  ];
  isShowSizeSection = false;
  isFullRange = true;

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngAfterViewInit(): void {
    this._subSink.sink = this._listingService.filters$.subscribe((value) => {
      const { lowestPrice = 0, highestPrice = PRICE_FILTER_RULE.MAX } = value;

      if (lowestPrice !== 0 && highestPrice !== PRICE_FILTER_RULE.MAX) {
        this.isShowSizeSection = true;
      }
      if (this.range)
        this.range.value = {
          lower: lowestPrice,
          upper: highestPrice,
        };
      this.formGroup.patchValue({ lowestPrice, highestPrice });
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
      lowestPrice: lower,
      highestPrice: upper,
    });

    if (isEquals(this.formGroup.value, initFormGroupValue)) {
      this.isInit = true;
    } else {
      this.isInit = false;
    }
  }
  private _calcSizeRange(size: number): IonRange["value"] {
    const { lowestPrice, highestPrice } = this.formGroup.value;
    /*
    Split into 7 cases:
      1. First both lowestPrice and highestPrice are DEFAULT.
      > Click SIZE with set:
        - lowestPrice = SIZE
        - highestPrice = sizeRange(SIZE) + 1

      4. Either lowestPrice or highestPrice is set already, only 1 chosen node..
      > Click SIZE equal it:
        - lowestPrice = DEFAULT
        - highestPrice = DEFAULT
        - isInit = true

      5. Both lowestPrice and highestPrice are set already.
      > Click SIZE between [lowestPrice, highestPrice] with set:
        - lowestPrice = SIZE
        - highestPrice = sizeRange(SIZE) + 1

      6. Both lowestPrice and highestPrice are set already.
      > Click SIZE lower than lowestPrice with set:
        - lowestPrice = SIZE

      7. Both lowestPrice and highestPrice are set already.
      > Click SIZE higher than highestPrice with set:
        - highestPrice = SIZE

      8. If lowestPrice to highestPrice fill all range.
      > reset

    */
    const lowestPriceStillDefault =
      lowestPrice === undefined || lowestPrice === PRICE_FILTER_RULE.MIN;
    const highestPriceStillDefault =
      highestPrice === undefined || highestPrice === PRICE_FILTER_RULE.MAX;
    const sizeBetween = size >= lowestPrice && size <= highestPrice;
    const indexOfSize = this.sizeRange.findIndex((s) => s.value === size);
    const indexOflowestPrice = this.sizeRange.findIndex(
      (s) => s.value === lowestPrice
    );
    const indexOfhighestPrice = this.sizeRange.findIndex(
      (s) => s.value === highestPrice + 1
    );

    // Case 1:
    if (lowestPriceStillDefault && highestPriceStillDefault) {
      if (indexOfSize === 0) {
        return {
          lower: lowestPrice,
          upper: this.sizeRange[1].value - 1,
        };
      }
      if (indexOfSize === this.sizeRange.length - 1) {
        return {
          lower: this.sizeRange[indexOfSize].value,
          upper: highestPrice,
        };
      }
      return {
        lower: size,
        upper: this.sizeRange[indexOfSize + 1].value - 1,
      };
    } else {
      const lowestPriceNextTohighestPrice =
        indexOflowestPrice + 1 === indexOfhighestPrice ||
        (indexOflowestPrice === this.sizeRange.length - 1 &&
          indexOfhighestPrice === -1);
      if (size === lowestPrice && lowestPriceNextTohighestPrice) {
        return {
          lower: PRICE_FILTER_RULE.MIN,
          upper: PRICE_FILTER_RULE.MAX,
        };
      }
    }

    // Case 3:
    if (sizeBetween) {
      if (size === lowestPrice) {
        return {
          lower: this.sizeRange[indexOflowestPrice + 1].value,
          upper: highestPrice,
        };
      }

      if (
        indexOfSize + 1 === indexOfhighestPrice ||
        (indexOfSize === this.sizeRange.length - 1 &&
          indexOfhighestPrice === -1)
      ) {
        return {
          lower: lowestPrice,
          upper: this.sizeRange[indexOfSize].value - 1,
        };
      }
      if (size === highestPrice && size === this.rangeOptions.max) {
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
          lower: lowestPrice,
          upper: size,
        };
      }
      if (size < lowestPrice) {
        return {
          lower: size,
          upper: highestPrice,
        };
      }
      if (size > highestPrice) {
        if (this.sizeRange[indexOfSize + 1])
          return {
            lower: lowestPrice,
            upper: this.sizeRange[indexOfSize + 1].value - 1,
          };
        return {
          lower: lowestPrice,
          upper: PRICE_FILTER_RULE.MAX,
        };
      }
    }
  }
}
