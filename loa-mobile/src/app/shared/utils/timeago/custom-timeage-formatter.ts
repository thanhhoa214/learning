import { Injectable } from '@angular/core';
import { CoreService } from '@loa-mobile/core/services/core.service';
import { TimeagoFormatter } from 'ngx-timeago';
import { TIMEAGO_LANGUAGES } from '../constants';

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const MONTH = DAY * 30;
const YEAR = DAY * 365;
const WEEK_TRANSLATION = {
  en: '%d week',
  vi: '%d tuần',
  ko: '%d 주'
};

@Injectable()
export class CustomTimeagoFormatter extends TimeagoFormatter {
  constructor(private _coreService: CoreService) {
    super();
  }

  format(then: number): string {
    const language = this._coreService.languageCode;
    const i18nStrings = {
      ...TIMEAGO_LANGUAGES[language],
      weeks: WEEK_TRANSLATION[language]
    };

    const now = Date.now();
    const seconds = Math.round(Math.abs(now - then) / 1000);
    let suffix = then < now ? 'suffixAgo' : 'suffixFromNow';
    if (language === 'vi') suffix = 'suffixFromNow';

    const [value, unit] =
      seconds < MINUTE
        ? [1, 'minute']
        : seconds < HOUR
        ? [Math.round(seconds / MINUTE), 'minutes']
        : seconds < DAY
        ? [Math.round(seconds / HOUR), 'hours']
        : seconds < WEEK
        ? [Math.round(seconds / DAY), 'days']
        : seconds < MONTH
        ? [Math.round(seconds / WEEK), 'weeks']
        : seconds < YEAR
        ? [Math.round(seconds / MONTH), 'months']
        : [Math.round(seconds / YEAR), 'years'];

    return `${i18nStrings[unit].replace('%d', value)} ${i18nStrings[suffix]}`;
  }
}
