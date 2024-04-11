import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesignListingService } from '@loa-mobile/design/listing/listing.service';
import { SubSinkable } from '@loa-shared/models';
import { DesignStyle } from '@loa-shared/models/graphql.model';
@Component({
  selector: 'loa-mobile-filter-style',
  templateUrl: './filter-style.component.html',
  styleUrls: ['./filter-style.component.scss'],
})
export class FilterStyleComponent extends SubSinkable implements OnChanges {
  @Input() formGroup: FormGroup;

  styles: DesignStyle[] = [
    DesignStyle.Modern,
    DesignStyle.Classic,
    DesignStyle.Luxury,
    DesignStyle.Industrial,
    DesignStyle.Scandinavian,
    DesignStyle.Other,
  ];
  isShowStyleSection = false;
  selectedStyles: DesignStyle[];

  constructor(private _listingService: DesignListingService) {
    super();
  }

  ngOnChanges(): void {
    this.selectedStyles = this._listingService.filters.styles ?? [];
    if (this.selectedStyles.length > 0) {
      this.isShowStyleSection = true;
    }

    this._subSink.sink = this.formGroup.valueChanges.subscribe((value) => {
      const { styles } = value;
      this.selectedStyles = styles ?? [];
    });
  }
  selectStyle(style: DesignStyle): void {
    if (this.selectedStyles.includes(style)) {
      this.formGroup.patchValue({
        styles: this.selectedStyles.filter((s) => style !== s),
      });
    } else {
      this.formGroup.patchValue({
        styles: [...this.selectedStyles, style],
      });
    }
  }
}
