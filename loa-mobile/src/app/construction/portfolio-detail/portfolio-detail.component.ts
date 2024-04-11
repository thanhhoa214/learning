import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@loa-shared/utils';
import { PortfolioDetailService } from './portfolio-detail.service';
import { GetPortfolioQuery } from './services';
import { SubSinkable } from '@loa-shared/models';

@Component({
  selector: 'loa-mobile-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss'],
})
export class PortfolioDetailComponent extends SubSinkable
  implements ViewWillEnter {
  portfolio: GetPortfolioQuery['portfolio'];
  user: LoginUserNode;

  private _id: string;

  constructor(
    public _detailService: PortfolioDetailService,
    private _loginService: LoginService,
    private _activatedRoute: ActivatedRoute,
    private _titleService: Title
  ) {
    super();
  }

  ionViewWillEnter(): void {
    this._id = this._activatedRoute.snapshot.paramMap.get('id');
    this._detailService.clear(this._id);
    this._detailService.loadPortfolioDetail({ id: this._id });
    this._subSink.sink = this._detailService
      .getPortfolioDetail$()
      .subscribe((portfolio) => {
        this.portfolio = portfolio;
        if (portfolio)
          this._titleService.setTitle(`${portfolio.projectName} | Interior Design`);
      });
    this.user = this._loginService.snapshot?.userNode;
  }

  get defaultImage(): string {
    return DEFAULT_IMAGE_PLACEHOLDER;
  }
}
