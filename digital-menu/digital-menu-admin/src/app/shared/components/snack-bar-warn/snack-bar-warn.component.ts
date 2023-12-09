import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-warn',
  templateUrl: './snack-bar-warn.component.html',
  styleUrls: ['./snack-bar-warn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarWarnComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { title: string; message: string }
  ) {}
}
