import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyI18n',
})
export class CurrencyI18nPipe implements PipeTransform {
  transform(value: string): string {
    return value.replace('M', 'Million').replace('B', 'Billion');
  }
}
