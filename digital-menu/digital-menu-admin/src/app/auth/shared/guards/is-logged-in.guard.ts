import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { SnackBarWarnComponent } from 'src/app/shared/components';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivateChild {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  async canActivateChild() {
    const isLogined = !!localStorage.getItem('accessToken');
    if (!isLogined) {
      this.snackBar.openFromComponent(SnackBarWarnComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'end',
        panelClass: 'mat-snack-bar-warn',
        data: {
          title: 'Authentication denied !',
          message: 'Please login first to access your management site.',
        },
      });
      return this.router.navigateByUrl('/auth');
    }
    return true;
  }
}
