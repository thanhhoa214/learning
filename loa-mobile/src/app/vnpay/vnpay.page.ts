import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { CartService } from '@loa-mobile/design/cart/cart.service';
import { VnPay } from '@loa-mobile/design/cart/vnpay/models';
import { SubSinkable } from '@loa-shared/models';
import { OrderStatus } from '@loa-shared/models/graphql.model';
import { NotificationService } from '@loa-shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
const { Browser } = Plugins;

@Component({
  templateUrl: './vnpay.page.html',
  styleUrls: ['./vnpay.page.scss']
})
export class VnpayPage extends SubSinkable {
  constructor(
    private _cartService: CartService,
    private _router: Router,
    private _translate: TranslateService,
    private _notifyService: NotificationService,
    activatedRoute: ActivatedRoute
  ) {
    super();
    Browser.close();
    this._registerAfterCheckout();

    const params = activatedRoute.snapshot.queryParams;
    const parsedResponse: VnPay.CheckoutResponse = {
      amount: params['vnp_Amount'],
      bankCode: params['vnp_BankCode'],
      bankTransactionNo: params['vnp_BankTranNo'],
      cardType: params['vnp_CardType'],
      payDate: params['vnp_PayDate'],
      orderId: params['vnp_TxnRef'],
      orderInfo: params['vnp_OrderInfo'],
      transactionNo: params['vnp_TransactionNo'],
      responseCode: params['vnp_ResponseCode']
    };

    if (parsedResponse.responseCode === '00') {
      this._cartService.checkoutSuccessful(parsedResponse);
    } else {
      this._router.navigateByUrl('/design/cart');
      this._translate.get('CART.checkout_failed').subscribe((translation) => {
        _notifyService.openSnackBar(translation, 'error');
      });
    }
  }

  private _registerAfterCheckout() {
    this._subSink.sink = this._cartService.onCheckoutSuccessful$.subscribe(() => {
      const { vnpayResponse, currentOrder } = this._cartService.snapshot;
      this._cartService.updateOrder({
        id: vnpayResponse.orderId,
        orderDate: vnpayResponse.payDate,
        status: OrderStatus.Paid
      });
      this._cartService.removeFromCart({
        design: currentOrder.details.edges.map((item) => item.node.design.id)
      });
      this._translate.get('CART.checkout_successful').subscribe((translation) => {
        this._notifyService.openSnackBar(translation, 'success');
      });
      this._router.navigateByUrl('/menu/my-interior-design/purchased?backTo=%2Fdesign');
    });
  }
}
