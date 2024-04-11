import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './switch-to-business.component.html',
  styleUrls: ['./switch-to-business.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchToBusinessComponent {
  constructor(public dialogRef: MatDialogRef<SwitchToBusinessComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
