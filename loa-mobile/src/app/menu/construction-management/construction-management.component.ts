import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

const { Clipboard } = Plugins;
@Component({
  selector: 'app-construction-management',
  templateUrl: './construction-management.component.html',
  styleUrls: ['./construction-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstructionManagementComponent {
  adminUrl = environment.API_URL;

  constructor(
    private _notificationService: NotificationService,
    private _translator: TranslateService
  ) {}

  async copyLink() {
    await Clipboard.write({
      url: this.adminUrl,
    });
    const message = await this._translator
      .get('HOME.DESIGN_PARTNER_FORM.url_copied')
      .toPromise();
    this._notificationService.openSnackBar(message, 'success');
  }
}
