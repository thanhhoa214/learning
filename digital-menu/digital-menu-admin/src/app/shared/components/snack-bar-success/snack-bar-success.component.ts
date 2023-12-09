import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-success',
  templateUrl: './snack-bar-success.component.html',
  styleUrls: ['./snack-bar-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarSuccessComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string }
  ) {}
}
