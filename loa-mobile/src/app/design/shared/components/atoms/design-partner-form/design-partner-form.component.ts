import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

const { Browser, Clipboard } = Plugins;

@Component({
  templateUrl: './design-partner-form.component.html',
  styleUrls: ['./design-partner-form.component.scss'],
})
export class DesignPartnerFormComponent {
  referenceLink = environment.API_URL;

  constructor(
    private _notificationService: NotificationService,
    private _translator: TranslateService
  ) {}

  async copyLink() {
    await Clipboard.write({
      url: this.referenceLink,
    });
    const message = await this._translator
      .get('HOME.DESIGN_PARTNER_FORM.url_copied')
      .toPromise();
    this._notificationService.openSnackBar(message, 'success');
  }

  async proceedToLink() {
    try {
      await Browser.open({ url: this.referenceLink });
    } catch (error) {
      const message = await this._translator
        .get('HOME.DESIGN_PARTNER_FORM.open_url_failed')
        .toPromise();
      this._notificationService.openSnackBar(message, 'error');
      console.log(error);
    }
  }
}
