import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private drawer: MatDrawer;

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  close(): void {
    this.drawer.close();
  }
  open(): void {
    this.drawer.open();
  }

  setMode(mode: MatDrawerMode) {
    this.drawer.mode = mode;
  }
}
