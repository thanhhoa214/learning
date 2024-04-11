import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { TooltipComponent } from '@loa-shared/components/tooltip/tooltip.component';
@Component({
  selector: 'loa-mobile-back-bar',
  templateUrl: './back-bar.component.html',
  styleUrls: ['./back-bar.component.scss'],
})
export class BackBarComponent {
  @Input() fullWidth: string;
  @Input() title: string;
  @Input() backTo: string;

  constructor(
    private _router: Router,
    private _location: Location,
    private _popoverController: PopoverController
  ) {}

  back() {
    if (this.backTo) {
      this._router.navigateByUrl(this.backTo);
    } else {
      this._location.back();
    }
  }
  async presentPopover(ev: any, text: string) {
    const popover = await this._popoverController.create({
      component: TooltipComponent,
      componentProps: {
        text,
      },
      event: ev,
      cssClass: 'tooltip-custom',
      translucent: true,
    });
    return await popover.present();
  }
}
