import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonContent, ModalController, ViewWillEnter, ViewWillLeave } from '@ionic/angular';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { LoginUserNode } from '@loa-mobile/auth/login/store';
import { ShareTypes } from '@loa-shared/models';
import { BottomBarVisibilityService } from '@loa-shared/services/bottom-bar-visibility.service';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, merge, from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CartService } from '../cart/cart.service';
import { AddToCartSuccessComponent } from '../shared/components/add-to-cart-success/add-to-cart-success.component';
import { RequestDesignComponent } from '../shared/components/request-design/request-design.component';
import { GetDesignQuery } from '../shared/services';
import { DesignDetailService } from './detail.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements ViewWillEnter, ViewWillLeave, OnInit {
  @ViewChild(IonContent) mainContainer: IonContent;

  design$: Observable<GetDesignQuery['design']>;
  isShowComment = true;
  isShowPolicy = false;
  isShowRefund = false;
  isShowServiceAnnounce = false;
  user$: Observable<LoginUserNode>;

  private cacheDesign: GetDesignQuery['design'];

  constructor(
    private _detailService: DesignDetailService,
    private _cartService: CartService,
    private _loginService: LoginService,
    private _translate: TranslateService,
    private _notify: NotificationService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _bottomBarVisibility: BottomBarVisibilityService,
    private _router: Router,
    private _modalCtrl: ModalController
  ) {}

  async addToCart(id: string) {
    this._cartService.addToCart({ design: id });
  }

  bookmark(id: string) {
    this._detailService.bookmarkStatic();
    this._detailService.bookmark({ id });
  }

  ionViewWillEnter(): void {
    this._bottomBarVisibility.hide();
  }

  ionViewWillLeave(): void {
    this._bottomBarVisibility.show();
  }

  like(id: string) {
    this._detailService.likeStatic();
    this._detailService.like({ id });
  }

  ngOnInit(): void {
    this.user$ = this._loginService.userNode$;
    this.design$ = this._detailService.designDetail$.pipe(
      tap((design) => (this.cacheDesign = design))
    );
    this._registerAddToCart();
    this._registerSubFunctionCompleted();
    this._activatedRoute.paramMap.pipe(map((paramMap) => paramMap.get('id'))).subscribe((id) => {
      this._detailService.clear(id);
      this._detailService.loadDesignDetail({ id });
    });
  }

  openDesign() {
    this._detailService.openDesign();
  }

  openRequestDesignDialog(id: string) {
    this._dialog.open(RequestDesignComponent, {
      data: { id }
    });
  }

  share(design: GetDesignQuery['design'], type: ShareTypes) {
    if (Capacitor.isNative) {
      this._detailService.share(design, type);
      return;
    }
    this._notify.openSnackBar('Web Share not supported', 'error');
  }

  shareDesign(id: string) {
    localStorage.setItem('shareDesign', id);
    this._router.navigateByUrl('/construction');
  }

  toggleCommentVisibility() {
    this.isShowComment = !this.isShowComment;
    if (this.isShowComment) {
      this.mainContainer.scrollToBottom();
    }
  }

  private _registerAddToCart(): void {
    this._cartService.onAddToCartSuccessful$
      .pipe(
        switchMap(() =>
          from(
            this._modalCtrl.create({
              component: AddToCartSuccessComponent,
              componentProps: { design: this.cacheDesign },
              showBackdrop: true,
              mode: 'ios',
              cssClass: 'auto-height bottom'
            })
          )
        ),
        tap((presentModel) => presentModel.present()),
        untilDestroyed(this)
      )
      .subscribe();
    this._cartService.onAddToCartFailed$
      .pipe(
        switchMap(() => this._translate.get('DESIGN.DETAIL.ADD_TO_CART.already_add')),
        tap((message) => this._notify.openSnackBar(message, 'error')),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private _registerSubFunctionCompleted(): void {
    merge(
      this._detailService.onBookmarkCompleted(),
      this._detailService.onLikeCompleted(),
      this._detailService.onCommentCompleted(),
      this._detailService.onDeleteCommentCompleted(),
      this._detailService.onReplyCompleted()
    )
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this._detailService.loadDesignDetail({ id: this.cacheDesign.id });
      });
  }
}
