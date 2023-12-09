import { LOCALE_ID, NgModule } from '@angular/core';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { NzMessageServiceModule } from 'ng-zorro-antd/message';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import vi from '@angular/common/locales/vi';
import { en_US, vi_VN, NZ_I18N, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { vi as VI } from 'date-fns/locale';

const ngZorroConfig: NzConfig = {
  notification: { nzMaxStack: 2 },
  message: { nzMaxStack: 3, nzTop: 70 },
  datePicker: { nzSuffixIcon: 'ionicons:calendar-outline' },
  select: { nzSuffixIcon: 'ionicons:chevron-down-outline' },
  modal: { nzCloseOnNavigation: true }
};

registerLocaleData(en);
registerLocaleData(vi);

@NgModule({
  imports: [NzNotificationServiceModule, NzModalModule, NzMessageServiceModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'vi-VN' },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'vi-VN':
            return vi_VN;
          default:
            return en_US;
        }
      },
      deps: [LOCALE_ID]
    },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_DATE_LOCALE, useValue: VI }
  ]
})
export class NzRootModule {}
