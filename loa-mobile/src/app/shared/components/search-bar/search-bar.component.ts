import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'loa-mobile-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements ViewWillEnter {
  @Input() value: string;
  @Input() placeholder: string;
  @Output() queryChanged = new EventEmitter<string>();
  searchControl: FormControl = new FormControl('');

  ionViewWillEnter(): void {
    // #TODO: Update search value for search bar in Listing Design
    console.log('================================', this.value);

    this.searchControl.setValue(this.value);
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((value) => this.queryChanged.emit(value));
  }
}
