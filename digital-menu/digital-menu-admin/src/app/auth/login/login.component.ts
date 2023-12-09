import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/generated';
import {
  SnackBarFailedComponent,
  SnackBarSuccessComponent,
} from 'src/app/shared/components';
import { TokenService } from 'src/app/token.service';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    this.authService
      .apiAuthenticationPost(this.form.value)
      .pipe(take(1))
      .subscribe((result) => {
        if (typeof result !== 'object') {
          this.snackBar.openFromComponent(SnackBarFailedComponent, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: 'mat-snack-bar-failed',
            data: {
              title: 'Failed !',
              message: 'Login failed. Username or password is incorrect.',
            },
          });
          return;
        }
        if (result.token) {
          this.snackBar.openFromComponent(SnackBarSuccessComponent, {
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: 'mat-snack-bar-success',
            data: { title: 'Success !', message: 'Login successfully' },
          });
          this.tokenService.updateAccessToken(result.token);

          this.accountService.setAccount(result.account);
          this.router.navigateByUrl('/templates');
        }
      });
  }
}
