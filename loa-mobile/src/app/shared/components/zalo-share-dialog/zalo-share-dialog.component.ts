import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginZaloService } from '@loa-mobile/auth/login/services/login-zalo.service';
import { ShareInput } from 'zalo-auth-capacitor-plugin';

@Component({
  templateUrl: './zalo-share-dialog.component.html',
  styleUrls: ['./zalo-share-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZaloShareDialogComponent {
  constructor(
    private _dialogRef: MatDialogRef<ZaloShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public input: ShareInput,
    private _zaloService: LoginZaloService
  ) {}

  share(type: 'message' | 'wall') {
    this._zaloService.share({
      ...this.input,
      type,
    });
    this._dialogRef.close();
  }
}
