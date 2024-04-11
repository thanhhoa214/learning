import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './choose-user-type.component.html',
  styleUrls: ['./choose-user-type.component.scss'],
})
export class ChooseUserTypeComponent {
  constructor(translate: TranslateService, titleService: Title) {
    translate.get('TITLES.register').subscribe((title) => {
      titleService.setTitle(`${title} | Interior Design`);
    });
  }
}
