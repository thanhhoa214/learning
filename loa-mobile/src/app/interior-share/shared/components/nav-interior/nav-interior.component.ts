import { Component } from '@angular/core';
import { SubSinkable } from '@loa-mobile/shared/models';
import { BottomBarVisibilityService } from '@loa-mobile/shared/services/bottom-bar-visibility.service';

@Component({
  selector: 'loa-mobile-nav-interior',
  templateUrl: './nav-interior.component.html',
  styleUrls: ['./nav-interior.component.scss']
})
export class NavInteriorComponent extends SubSinkable {
  navLinks: any[];
  constructor(
    public bottomBarVisibility: BottomBarVisibilityService,
    ) {
    super();
    this.navLinks = [
      {
        label: 'CORE.home',
        link: './home',
        icon: 'home',
      },
    ];
  }
}
