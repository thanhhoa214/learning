import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesignListingService } from '@loa-mobile/design/listing/listing.service';
import { SubSinkable } from '@loa-shared/models';
import {
  DesignDesignType,
  DesignRoomRoomType,
} from '@loa-shared/models/graphql.model';

@Component({
  selector: 'loa-mobile-filter-design-type',
  templateUrl: './filter-design-type.component.html',
  styleUrls: ['./filter-design-type.component.scss'],
})
export class FilterDesignTypeComponent extends SubSinkable
  implements OnChanges {
  @Input() formGroup: FormGroup;

  designTypes: DesignDesignType[] = [
    DesignDesignType.WholeHouse,
    DesignDesignType.Room,
  ];
  roomTypes: DesignRoomRoomType[] = [
    DesignRoomRoomType.Bathroom,
    DesignRoomRoomType.Kitchen,
    DesignRoomRoomType.Bedroom,
    DesignRoomRoomType.LivingRoom,
    DesignRoomRoomType.Other,
  ];
  selectedDesignType: DesignDesignType;
  selectedRoomTypes: DesignRoomRoomType[] = [];

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngOnChanges(): void {
    const { designType, roomTypes } = this._listingService.filters;
    this.selectedDesignType = designType;
    this.selectedRoomTypes = roomTypes ?? [];
    this._subSink.sink = this.formGroup.valueChanges.subscribe((value) => {
      const {
        designType: updatedDesignType,
        roomTypes: updatedRoomTypes,
      } = value;

      this.selectedDesignType = updatedDesignType;
      this.selectedRoomTypes = updatedRoomTypes ?? [];
    });
  }

  setDesignTypeAndRoomType(
    designType: DesignDesignType,
    roomType?: DesignRoomRoomType
  ): void {
    if (designType === DesignDesignType.WholeHouse) {
      this.formGroup.patchValue({ designType, roomTypes: [] });
    } else {
      if (this.selectedRoomTypes.includes(roomType)) {
        this.formGroup.patchValue({
          designType,
          roomTypes: this.selectedRoomTypes.filter((type) => roomType !== type),
          houseTypes: [],
        });
      } else {
        this.formGroup.patchValue({
          designType,
          roomTypes: [...this.selectedRoomTypes, roomType],
          houseTypes: [],
        });
      }
    }
  }
}
