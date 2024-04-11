import { AfterViewInit, Component, Input, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IonRange } from "@ionic/angular";
import { initFormGroupValue } from "@loa-mobile/design/filter/filter.component";
import { DesignListingService } from "@loa-mobile/design/listing/listing.service";
import { CONSTRUCTION_PRICE_FILTER_RULE } from "@loa-mobile/design/shared/models";
import { RangeOptions } from "@loa-mobile/design/shared/models/range-options.model";
import { SubSinkable } from "@loa-shared/models";
import { isEquals } from "@loa-shared/utils";
@Component({
  selector: "loa-mobile-filter-construction-price",
  templateUrl: "./filter-construction-price.component.html",
  styleUrls: ["./filter-construction-price.component.scss"],
})
export class FilterConstructionPriceComponent extends SubSinkable
  implements AfterViewInit {
  @Input() formGroup: FormGroup;
  @ViewChild("range") range: IonRange;

  rangeOptions: RangeOptions = {
    min: 0,
    max: CONSTRUCTION_PRICE_FILTER_RULE.MAX,
    step: 100000000,
    init: { lower: 0, upper: CONSTRUCTION_PRICE_FILTER_RULE.MAX },
  };

  sizeRange = [
    { value: CONSTRUCTION_PRICE_FILTER_RULE.MIN, title: "~ 100 M" },
    { value: 400000000, title: "400 M" },
    { value: 800000000, title: "800 M" },
    { value: 1000000000, title: "1 B" },
    { value: 1200000000, title: "1.2 B" },
    { value: CONSTRUCTION_PRICE_FILTER_RULE.MAX, title: "Over 1.4 B" },
  ];
  isShowSizeSection = false;
  isInit = true;
  isFullRange = true;

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngAfterViewInit(): void {
    this._subSink.sink = this._listingService.filters$.subscribe((value) => {
      const {
        lowestConstructionPrice = 0,
        highestConstructionPrice = CONSTRUCTION_PRICE_FILTER_RULE.MAX,
      } = value;
      if (
        lowestConstructionPrice !== 0 &&
        highestConstructionPrice !== CONSTRUCTION_PRICE_FILTER_RULE.MAX
      ) {
        this.isShowSizeSection = true;
      }
      if (this.range)
        this.range.value = {
          lower: lowestConstructionPrice,
          upper: highestConstructionPrice,
        };
      this.formGroup.patchValue({
        lowestConstructionPrice,
        highestConstructionPrice,
      });
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
      lowestConstructionPrice: lower,
      highestConstructionPrice: upper,
    });

    if (isEquals(this.formGroup.value, initFormGroupValue)) {
      this.isInit = true;
    } else {
      this.isInit = false;
    }
  }
  private _calcSizeRange(size: number): IonRange["value"] {
    const {
      lowestConstructionPrice,
      highestConstructionPrice,
    } = this.formGroup.value;
    /*
    Split into 7 cases:
      1. First both lowestConstructionPrice and highestConstructionPrice are DEFAULT.
      > Click SIZE with set:
        - lowestConstructionPrice = SIZE
        - highestConstructionPrice = sizeRange(SIZE) + 1

      4. Either lowestConstructionPrice or highestConstructionPrice is set already, only 1 chosen node..
      > Click SIZE equal it:
        - lowestConstructionPrice = DEFAULT
        - highestConstructionPrice = DEFAULT
        - isInit = true

      5. Both lowestConstructionPrice and highestConstructionPrice are set already.
      > Click SIZE between [lowestConstructionPrice, highestConstructionPrice] with set:
        - lowestConstructionPrice = SIZE
        - highestConstructionPrice = sizeRange(SIZE) + 1

      6. Both lowestConstructionPrice and highestConstructionPrice are set already.
      > Click SIZE lower than lowestConstructionPrice with set:
        - lowestConstructionPrice = SIZE

      7. Both lowestConstructionPrice and highestConstructionPrice are set already.
      > Click SIZE higher than highestConstructionPrice with set:
        - highestConstructionPrice = SIZE

      8. If lowestConstructionPrice to highestConstructionPrice fill all range.
      > reset

    */
    const lowestConstructionPriceStillDefault =
      lowestConstructionPrice === undefined ||
      lowestConstructionPrice === CONSTRUCTION_PRICE_FILTER_RULE.MIN;
    const highestConstructionPriceStillDefault =
      highestConstructionPrice === undefined ||
      highestConstructionPrice === CONSTRUCTION_PRICE_FILTER_RULE.MAX;
    const sizeBetween =
      size >= lowestConstructionPrice && size <= highestConstructionPrice;
    const indexOfSize = this.sizeRange.findIndex((s) => s.value === size);
    const indexOflowestConstructionPrice = this.sizeRange.findIndex(
      (s) => s.value === lowestConstructionPrice
    );
    const indexOfHighestConstructionPrice = this.sizeRange.findIndex(
      (s) => s.value === highestConstructionPrice + 1
    );

    // Case 1:
    if (
      lowestConstructionPriceStillDefault &&
      highestConstructionPriceStillDefault
    ) {
      if (indexOfSize === 0) {
        return {
          lower: lowestConstructionPrice,
          upper: this.sizeRange[1].value - 1,
        };
      }
      if (indexOfSize === this.sizeRange.length - 1) {
        return {
          lower: this.sizeRange[indexOfSize].value,
          upper: highestConstructionPrice,
        };
      }
      return {
        lower: size,
        upper: this.sizeRange[indexOfSize + 1].value - 1,
      };
    } else {
      const lowestConstructionPriceNextTohighestConstructionPrice =
        indexOflowestConstructionPrice + 1 ===
          indexOfHighestConstructionPrice ||
        (indexOflowestConstructionPrice === this.sizeRange.length - 1 &&
          indexOfHighestConstructionPrice === -1);
      if (
        size === lowestConstructionPrice &&
        lowestConstructionPriceNextTohighestConstructionPrice
      ) {
        return {
          lower: CONSTRUCTION_PRICE_FILTER_RULE.MIN,
          upper: CONSTRUCTION_PRICE_FILTER_RULE.MAX,
        };
      }
    }

    // Case 3:
    if (sizeBetween) {
      if (size === lowestConstructionPrice) {
        return {
          lower: this.sizeRange[indexOflowestConstructionPrice + 1].value,
          upper: highestConstructionPrice,
        };
      }

      if (
        indexOfSize + 1 === indexOfHighestConstructionPrice ||
        (indexOfSize === this.sizeRange.length - 1 &&
          indexOfHighestConstructionPrice === -1)
      ) {
        return {
          lower: lowestConstructionPrice,
          upper: this.sizeRange[indexOfSize].value - 1,
        };
      }
      if (size === highestConstructionPrice && size === this.rangeOptions.max) {
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
          lower: lowestConstructionPrice,
          upper: size,
        };
      }
      if (size < lowestConstructionPrice) {
        return {
          lower: size,
          upper: highestConstructionPrice,
        };
      }
      if (size > highestConstructionPrice) {
        return {
          lower: lowestConstructionPrice,
          upper: this.sizeRange[indexOfSize + 1].value - 1,
        };
      }
    }
  }
}
