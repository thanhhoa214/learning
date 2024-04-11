import { Location } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { BottomBarVisibilityService } from '@loa-mobile/shared/services/bottom-bar-visibility.service';
import { SubSinkable } from '@loa-shared/models';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ContentPageService } from './content-page.service';
import { GetContentPageQuery } from './services';

@Component({
  selector: 'loa-mobile-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss'],
})
export class ContentPageComponent extends SubSinkable
  implements ViewWillEnter, ViewWillLeave {
  @ViewChild('myImg') imageElement: ElementRef<HTMLImageElement>;
  contentPage$: Observable<GetContentPageQuery['contentPage']>;
  imgAttributes = { width: '100%', height: '100%' };
  isShowHeader = true;
  id: string;

  constructor(
    public location: Location,
    private _activatedRoute: ActivatedRoute,
    private _contentPageService: ContentPageService,
    private _bottomBarVisibility: BottomBarVisibilityService,
    private _loadingController: LoadingController,
    private _translate: TranslateService
  ) {
    super();
    this._bottomBarVisibility.hide();
  }

  ionViewWillEnter(): void {
    this._bottomBarVisibility.hide();
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    this.contentPage$ = this._contentPageService.getContentPage$();
    this._translate
      .get('CORE.please_wait')
      .toPromise()
      .then((message: string) =>
        this._loadingController.create({
          message,
          duration: 200,
        })
      )
      .then((spinner) => spinner.present());
    this._contentPageService.loadContentPage({ id: this.id });
    this._subSink.sink = this._contentPageService
      .onLoadContentPage()
      .subscribe(() => {
        this._loadingController.dismiss();
      });
  }
  ionViewWillLeave(): void {
    this._loadingController.dismiss();
    this._bottomBarVisibility.show();
  }
}
