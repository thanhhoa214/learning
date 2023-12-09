import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-failed',
  templateUrl: './snack-bar-failed.component.html',
  styleUrls: ['./snack-bar-failed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarFailedComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string }
  ) {}
}
