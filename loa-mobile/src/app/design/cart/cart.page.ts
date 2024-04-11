import { Component, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { SubSinkable } from '@loa-shared/models';
import {
  BranchDeepLinksWeb,
  BranchShortUrlParams,
} from 'capacitor-branch-deep-links';
import { PluginListenerHandle, Plugins } from '@capacitor/core';
import { IonCheckbox, ViewDidEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartStateModel } from './store';
import { CartService } from './cart.service';
import { OrderStatus } from '@loa-shared/models/graphql.model';
import { VnPay, VnPayConnect } from './vnpay/models';
import { CoreService } from '@loa-mobile/core/services/core.service';
import { merge } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';
const { BranchDeepLinks, Browser } = Plugins;

@Component({
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage extends SubSinkable implements ViewDidEnter {
  @ViewChild('checkboxAll') checkboxAll: IonCheckbox;
  @ViewChildren('checkbox') checkboxs: QueryList<IonCheckbox>;

  cart: CartStateModel['cart'];
  invoice: {
    subTotal: number;
    discount: number;
    vat: number;
    total: number;
  } = {
    subTotal: 0,
    discount: 0,
    vat: 10,
    total: 0,
  };

  private _browserEventHandler: PluginListenerHandle;

  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _coreService: CoreService
  ) {
    super();
  }

  ionViewDidEnter(): void {
    this._subSink.sink = this._cartService.cart$
      .pipe(
        tap((cart) => {
          this.cart = cart;
        }),
        delay(500),
        switchMap(() =>
          merge<CustomEvent>(...this.checkboxs.map((item) => item.ionChange))
        )
      )
      .subscribe(() => {
        const isAllChecked = Array.from(this.checkboxs).every(
          (item) => item.checked
        );
        this.checkboxAll.checked = isAllChecked;
      });

    this._cartService.loadCart();
    this._registerLoadCartSuccessful();
    this._registerRemoveFromCart();
    this._registerBeforeCheckout();
  }

  ionViewWillLeave() {
    super.ionViewWillLeave();
    this._browserEventHandler?.remove();
  }

  checkboxAllClickHandler() {
    if (this.checkboxAll.checked) {
      this.checkboxs.forEach((item) => (item.checked = false));
    } else {
      this.checkboxs.forEach((item) => (item.checked = true));
    }
  }

  async openVNPay() {
    const checkedIds = this.checkboxs
      .filter((item) => item.checked)
      .map((item) => item.value);

    this._cartService.createOrder({
      designs: checkedIds,
      status: OrderStatus.Pending,
      subAmount: this.invoice.subTotal,
      totalAmount: this.invoice.total,
      vat: (this.invoice.subTotal * this.invoice.vat) / 100,
    });
  }

  removeDesigns() {
    const willRemoveDesigns = this.checkboxs.filter((item) => item.checked);
    if (willRemoveDesigns.length) {
      this._cartService.removeFromCart({
        design: willRemoveDesigns.map((checkbox) => checkbox.value),
      });
      this.checkboxAll.checked = false;
    }
  }

  goToDesignById(event: Event, id: string) {
    event.stopImmediatePropagation();
    this._router.navigateByUrl('/design/' + id);
  }

  private _calculateInvoice() {
    if (!this.cart) return;

    const checkedIds = this.checkboxs
      .filter((item) => item.checked)
      .map((item) => item.value);

    const { discount: totalDiscount, price: totalPrice } = this.cart.details
      .filter((item) => checkedIds.includes(item.design.id))
      .map((item) => ({
        price: item.design.price,
        discount: item.design.promotionalPrice
          ? item.design.price - item.design.promotionalPrice
          : 0,
      }))
      .reduce(
        (acc, design) => ({
          price: acc.price + design.price,
          discount: acc.discount + design.discount,
        }),
        { price: 0, discount: 0 }
      );
    const costOfVat = totalPrice * (this.invoice.vat / 100);

    this.invoice = {
      ...this.invoice,
      subTotal: totalPrice,
      discount: totalDiscount,
      total: totalPrice + costOfVat - totalDiscount,
    };
  }

  private _registerRemoveFromCart() {
    this._subSink.sink = this._cartService.onRemoveFromCartSuccessful$.subscribe(
      () => {
        this._cartService.loadCart();
      }
    );
  }

  private _registerBeforeCheckout() {
    this._subSink.sink = this._cartService.onCreateOrderFromCartSuccessful$.subscribe(
      async () => {
        try {
          const params: BranchShortUrlParams = {
            analytics: null,
            properties: {
              custom_string: '/vnpay',
            },
          };
          const {
            url,
          } = await (BranchDeepLinks as BranchDeepLinksWeb).generateShortUrl(
            params
          );

          const orderId = this._cartService.snapshot.currentOrder.id;

          const checkoutPayload: VnPay.CheckoutPayload = {
            amount: this.invoice.total,
            orderId,
            orderInfo: `Check out order [${orderId}]`,
            orderType: '250000',
            clientIp: '127.0.21.1',
            returnUrl: url,
            locale: this._coreService.languageCode === 'vi' ? 'vn' : 'en',
          };
          const vnPay = new VnPayConnect({
            paymentGateway: "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
            merchant: 'Tabc1' ,
            secureSecret: 'sample',
          });
          const checkoutUrl = vnPay.buildCheckoutUrl(checkoutPayload);
          Browser.open({ url: checkoutUrl.toString() });

          this._browserEventHandler = Browser.addListener(
            'browserFinished',
            () => {
              this._cartService.loadCart();
            }
          );
        } catch (ex) {
          console.warn(ex);
          return;
        }
      }
    );
  }

  private _registerLoadCartSuccessful() {
    this._subSink.sink = this._cartService.onLoadCartSuccessful$
      .pipe(
        switchMap(() =>
          merge(
            ...this.checkboxs.map((checkbox) => checkbox.ionChange),
            this._cartService.cart$
          )
        )
      )
      .subscribe(() => {
        this._calculateInvoice();
      });
  }
}
