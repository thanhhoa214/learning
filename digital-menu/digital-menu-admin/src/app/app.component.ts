import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from './token.service';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('drawer') public drawer: MatDrawer;

  drawerMode: MatDrawerMode = 'side';
  isLessThanSmall$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    breakpointObserver: BreakpointObserver,
    private tokenService: TokenService,
    private drawerService: DrawerService
  ) {
    this.isLessThanSmall$ = breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map((state) => state.matches),
        shareReplay({
          refCount: false,
        })
      );
    this.isLoggedIn$ = this.tokenService
      .getAccessToken$()
      .pipe(map((accessToken) => !!accessToken));
  }
  ngAfterViewInit(): void {
    this.drawerService.setDrawer(this.drawer);
  }
}
