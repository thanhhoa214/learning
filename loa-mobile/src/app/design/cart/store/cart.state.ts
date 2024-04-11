import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { DesignAddToCartGQL } from "../services/add-to-cart.mutation.g";
import { CartGQL, CartQuery } from "../services/cart.query.g";
import {
  DesignOrderCreateGQL,
  DesignOrderCreateMutation,
} from "../services/create-order.mutation.g";
import { DesignRemoveFromCartGQL } from "../services/remove-from-cart.mutation.g";
import { DesignOrderUpdateGQL } from "../services/update-order.mutation.g";
import {
  LoadCart,
  AddToCart,
  AddToCartFailed,
  AddToCartSuccessful,
  RemoveFromCart,
  RemoveFromCartFailed,
  RemoveFromCartSuccessful,
  CreateOrderFromCart,
  CreateOrderFromCartFailed,
  CreateOrderFromCartSuccessful,
  UpdateOrderFromCart,
  UpdateOrderFromCartFailed,
  UpdateOrderFromCartSuccessful,
  Checkout,
  CheckoutSuccessful,
} from "./cart.actions";
import { VnPay, VnPayConnect } from "../vnpay/models";
import { Plugins } from "@capacitor/core";
const { Browser } = Plugins;

export class CartStateModel {
  cart?: CartQuery["cart"];
  currentOrder?: DesignOrderCreateMutation["designOrderCreate"]["order"];
  vnpayResponse?: VnPay.CheckoutResponse;
}

@State<CartStateModel>({
  name: "designCart",
  defaults: {},
})
@Injectable()
export class CartState {
  @Selector()
  static cart({ cart }: CartStateModel) {
    return cart;
  }

  @Selector()
  static currentOrder({ currentOrder }: CartStateModel) {
    return currentOrder;
  }

  constructor(
    private _cartQuery: CartGQL,
    private _addToCartMutation: DesignAddToCartGQL,
    private _removeFromCartMutation: DesignRemoveFromCartGQL,
    private _createOrderMutation: DesignOrderCreateGQL,
    private _updateOrderMutation: DesignOrderUpdateGQL
  ) {}

  @Action(LoadCart)
  loadCart({ patchState }: StateContext<CartStateModel>) {
    return this._cartQuery.fetch().pipe(
      tap(({ data }) => {
        patchState({ cart: data.cart });
      })
    );
  }

  @Action(AddToCart)
  addToCart({ dispatch }: StateContext<CartStateModel>, { input }: AddToCart) {
    return this._addToCartMutation.mutate(input).pipe(
      tap(({ data }) => {
        if (data.designAddToCart.status)
          return dispatch(new AddToCartSuccessful());
        return dispatch(new AddToCartFailed());
      })
    );
  }
  @Action(RemoveFromCart)
  removeFromCart(
    { dispatch }: StateContext<CartStateModel>,
    { input }: RemoveFromCart
  ) {
    return this._removeFromCartMutation.mutate(input).pipe(
      tap(({ data }) => {
        if (data.designRemoveFromCart.status)
          return dispatch(new RemoveFromCartSuccessful());
        return dispatch(new RemoveFromCartFailed());
      })
    );
  }
  @Action(CreateOrderFromCart)
  createOrderFromCart(
    { dispatch }: StateContext<CartStateModel>,
    { input }: CreateOrderFromCart
  ) {
    return this._createOrderMutation.mutate(input).pipe(
      tap(({ data }) => {
        const { designOrderCreate } = data;
        if (designOrderCreate.status)
          return dispatch(new CreateOrderFromCartSuccessful(designOrderCreate));
        return dispatch(new CreateOrderFromCartFailed());
      })
    );
  }
  @Action(CreateOrderFromCartSuccessful)
  createOrderFromCartSuccessful(
    { patchState }: StateContext<CartStateModel>,
    { input }: CreateOrderFromCartSuccessful
  ) {
    patchState({ currentOrder: input.order });
  }

  @Action(UpdateOrderFromCart)
  updateOrderFromCart(
    { dispatch }: StateContext<CartStateModel>,
    { input }: UpdateOrderFromCart
  ) {
    return this._updateOrderMutation.mutate(input).pipe(
      tap(({ data }) => {
        const { designOrderUpdate } = data;
        if (designOrderUpdate.status)
          return dispatch(new UpdateOrderFromCartSuccessful());
        return dispatch(new UpdateOrderFromCartFailed());
      })
    );
  }

  @Action(Checkout)
  async checkout(_, { input }: Checkout) {
    const vnPay = new VnPayConnect({
      paymentGateway: "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
      merchant: 'Tabc1' ,
      secureSecret: 'sample', 
    });
    try {
      const checkoutUrl = vnPay.buildCheckoutUrl(input);
      Browser.open({ url: checkoutUrl.toString() });
    } catch (ex) {
      console.warn(ex);
      return;
    }
  }
  @Action(CheckoutSuccessful)
  async checkoutSuccessCheckoutSuccessful(
    { patchState }: StateContext<CartStateModel>,
    { input }: CheckoutSuccessful
  ) {
    patchState({ vnpayResponse: input });
  }
}
