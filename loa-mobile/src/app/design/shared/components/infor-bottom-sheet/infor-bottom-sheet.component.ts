import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'loa-mobile-infor-bottom-sheet',
  templateUrl: './infor-bottom-sheet.component.html',
  styleUrls: ['./infor-bottom-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InforBottomSheetComponent {
  formGroup: FormGroup;

  constructor(
    // private _bottomSheetRef: MatBottomSheetRef<InforBottomSheetComponent>,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
    });
  }

  close(event: MouseEvent): void {
    // this._bottomSheetRef.dismiss(this.formGroup.value);
    event.preventDefault();
  }
}
