import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { DesignDetailService } from '@loa-mobile/design/detail/detail.service';
import { SubSinkable } from '@loa-shared/models';
import { RequestDesignSuccessComponent } from '../request-design-success/request-design-success.component';

@Component({
  templateUrl: './request-design.component.html',
  styleUrls: ['./request-design.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDesignComponent extends SubSinkable implements OnInit {
  email = new FormControl('', [Validators.email]);

  constructor(
    private _dialogRef: MatDialogRef<RequestDesignComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private _dialog: MatDialog,
    private _loginService: LoginService,
    private _designService: DesignDetailService
  ) {
    super();
  }

  ngOnInit(): void {
    this.email.patchValue(this._loginService.snapshot.userNode.email);
    this._subSink.sink = this._designService
      .onRequestSuccessful()
      .subscribe(() => {
        this._dialogRef.close();
        this._openRequestDesignSuccessDialog();
      });
  }

  send() {
    if (this.email.valid)
      this._designService.request({
        email: this.email.value,
        design: this.data.id,
      });
  }

  private _openRequestDesignSuccessDialog() {
    this._dialog.open(RequestDesignSuccessComponent, {});
  }
}
