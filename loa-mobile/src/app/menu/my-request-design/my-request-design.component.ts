import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { MyRequestDesignService } from './my-request-design.service';
import { GetAllMyRequestDesignsQuery } from '../shared/services';

@Component({
  templateUrl: './my-request-design.component.html',
  styleUrls: ['./my-request-design.component.scss'],
})
export class MyRequestDesignComponent implements ViewWillEnter {
  requestDesigns: GetAllMyRequestDesignsQuery['designsInquiries'];
  constructor(
    private _myRequestDesignService: MyRequestDesignService,
    private _loginService: LoginService
  ) {}

  ionViewWillEnter() {
    this._myRequestDesignService
      .getNodeConnection()
      .subscribe((requestDesigns) => {
        this.requestDesigns = requestDesigns;
      });
    const userNode = this._loginService.snapshot?.userNode;
    this._myRequestDesignService.loadRequestDesigns({
      userId: userNode.id,
      orderBy: '-id',
    });
  }
}
