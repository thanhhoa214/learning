import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/token.service';
import { AccountReadAfterAuthenDto } from 'src/generated';
import { SnackBarSuccessComponent } from '../snack-bar-success/snack-bar-success.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  @Input() isLoggedIn = false;
  @Output() toggleSidebar = new EventEmitter();
  user: AccountReadAfterAuthenDto;

  constructor(
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _tokenService: TokenService
  ) {
    this.user = JSON.parse(localStorage.getItem('accountInfor'));
  }

  notificationCount = 2;
  mailCount = 2;

  logout() {
    this._snackBar.openFromComponent(SnackBarSuccessComponent, {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: 'mat-snack-bar-success',
      data: { title: 'Success !', message: 'Logout successfully' },
    });

    this._tokenService.removeAccessToken();
    this._router.navigateByUrl('/auth');
  }
}
