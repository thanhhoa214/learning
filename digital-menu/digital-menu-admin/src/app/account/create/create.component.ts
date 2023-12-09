import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SnackBarSuccessComponent } from 'src/app/shared/components';
import { AccountReadDto, AccountRoleReadDtoPagingResponseDto, AccountRolesService, AccountsService } from 'src/generated';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  roles$: Observable<AccountRoleReadDtoPagingResponseDto>;
  constructor(
    private formBuilder: FormBuilder,
    private rolesService: AccountRolesService,
    private accountsService: AccountsService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.roles$ = this.rolesService.apiAccountRolesGet();
  }
  create() {
    const { username, password, roleId } = this.form.value;
    const account: AccountReadDto = JSON.parse(
      localStorage.getItem('accountInfor')
    );
    this.accountsService
      .apiAccountsPost({ username: username, password: password, roleId: roleId, storeId: account.storeId })
      .pipe(take(1))
      .subscribe(() => {
        this._snackBar.openFromComponent(SnackBarSuccessComponent, {
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: 'mat-snack-bar-success',
          data: {
            title: 'Success !',
            message: `Create "${name}" successfully`,
          },
        });
      });

  }
}
