import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IsNotLoggedInGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild() {
    const isLogined = !!localStorage.getItem('accessToken');
    if (isLogined) {
      return this.router.navigateByUrl('/home');
    }
    return true;
  }

  async canActivate() {
    console.log(
      !!localStorage.getItem('accessToken'),
      localStorage.getItem('accessToken')
    );

    const isLogined = !!localStorage.getItem('accessToken');
    if (isLogined) {
      return this.router.navigateByUrl('/home');
    }
    return true;
  }
}
