import { Component, Input, OnChanges } from "@angular/core";
import {
  DesignDesignType,
  DesignTypeOfHouse,
} from "@loa-shared/models/graphql.model";
import { FormGroup } from "@angular/forms";
import { DesignListingService } from "@loa-mobile/design/listing/listing.service";
import { SubSinkable } from "@loa-shared/models";

@Component({
  selector: "loa-mobile-filter-house-type",
  templateUrl: "./filter-house-type.component.html",
  styleUrls: ["./filter-house-type.component.scss"],
})
export class FilterHouseTypeComponent extends SubSinkable implements OnChanges {
  @Input() formGroup: FormGroup;

  houseTypes: DesignTypeOfHouse[] = [
    DesignTypeOfHouse.Studio,
    DesignTypeOfHouse.OneBedroom,
    DesignTypeOfHouse.TwoBedroom,
    DesignTypeOfHouse.Duplex,
    DesignTypeOfHouse.ThreeBedroom,
    DesignTypeOfHouse.FourBedroom,
    DesignTypeOfHouse.Villa,
    DesignTypeOfHouse.Penthouse,
  ];

  isShowHouseTypeSection = false;
  selectedHouseTypes: DesignTypeOfHouse[] = [];

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngOnChanges(): void {
    this.selectedHouseTypes = this._listingService.filters.houseTypes ?? [];
    if (this.selectedHouseTypes.length > 0) {
      this.isShowHouseTypeSection = true;
    }

    this._subSink.sink = this.formGroup.valueChanges.subscribe((value) => {
      const { houseTypes } = value;
      this.selectedHouseTypes = houseTypes ?? [];
    });
  }

  selectHouseType(houseType: DesignTypeOfHouse): void {
    if (this.selectedHouseTypes.includes(houseType)) {
      this.formGroup.patchValue({
        houseTypes: this.selectedHouseTypes.filter(
          (type) => houseType !== type
        ),
        designType: DesignDesignType.WholeHouse,
        roomTypes: [],
      });
    } else {
      this.formGroup.patchValue({
        houseTypes: [...this.selectedHouseTypes, houseType],
        designType: DesignDesignType.WholeHouse,
        roomTypes: [],
      });
    }
    console.table(this.formGroup.value);
  }
}
