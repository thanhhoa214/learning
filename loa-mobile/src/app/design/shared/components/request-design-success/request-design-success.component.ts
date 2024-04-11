import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'loa-mobile-request-design-success',
  templateUrl: './request-design-success.component.html',
  styleUrls: ['./request-design-success.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDesignSuccessComponent {
  constructor(
    private _dialogRef: MatDialogRef<RequestDesignSuccessComponent>
  ) {}

  close() {
    this._dialogRef.close();
  }
}
