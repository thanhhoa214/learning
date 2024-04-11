import { DesignAddToCartMutationVariables } from "../services/add-to-cart.mutation.g";
import {
  DesignOrderCreateMutation,
  DesignOrderCreateMutationVariables,
} from "../services/create-order.mutation.g";
import { DesignRemoveFromCartMutationVariables } from "../services/remove-from-cart.mutation.g";
import { DesignOrderUpdateMutationVariables } from "../services/update-order.mutation.g";
import { VnPay } from "../vnpay/models";

const enum Actions {
  LOAD_CART = "[DESIGN.CART] Load cart",
  ADD_TO_CART = "[DESIGN.CART] Add to cart",
  ADD_TO_CART_FAILED = "[DESIGN.CART] Add to cart failed",
  ADD_TO_CART_SUCCESSFUL = "[DESIGN.CART] Add to cart successful",
  REMOVE_FROM_CART = "[DESIGN.CART] Remove from cart",
  REMOVE_FROM_CART_FAILED = "[DESIGN.CART] Remove from cart failed",
  REMOVE_FROM_CART_SUCCESSFUL = "[DESIGN.CART] Remove from cart successful",
  CREATE_ORDER = "[DESIGN.CART] Create order from cart",
  CREATE_ORDER_FAILED = "[DESIGN.CART] Create order from cart failed",
  CREATE_ORDER_SUCCESSFUL = "[DESIGN.CART] Create order from cart successful",
  UPDATE_ORDER = "[DESIGN.CART] Update order",
  UPDATE_ORDER_FAILED = "[DESIGN.CART] Update order failed",
  UPDATE_ORDER_SUCCESSFUL = "[DESIGN.CART] Update order successful",
  CHECKOUT = "[DESIGN.CART] Check out",
  CHECKOUT_FAILED = "[DESIGN.CART] Check out failed",
  CHECKOUT_SUCCESSFUL = "[DESIGN.CART] Check out successful",
}

export class LoadCart {
  static readonly type = Actions.LOAD_CART;
}

export class AddToCart {
  static readonly type = Actions.ADD_TO_CART;
  constructor(readonly input: DesignAddToCartMutationVariables) {}
}

export class AddToCartFailed {
  static readonly type = Actions.ADD_TO_CART_FAILED;
}

export class AddToCartSuccessful {
  static readonly type = Actions.ADD_TO_CART_SUCCESSFUL;
}

export class RemoveFromCart {
  static readonly type = Actions.REMOVE_FROM_CART;
  constructor(readonly input: DesignRemoveFromCartMutationVariables) {}
}

export class RemoveFromCartFailed {
  static readonly type = Actions.REMOVE_FROM_CART_FAILED;
}

export class RemoveFromCartSuccessful {
  static readonly type = Actions.REMOVE_FROM_CART_SUCCESSFUL;
}

export class CreateOrderFromCart {
  static readonly type = Actions.CREATE_ORDER;
  constructor(readonly input: DesignOrderCreateMutationVariables) {}
}

export class CreateOrderFromCartFailed {
  static readonly type = Actions.CREATE_ORDER_FAILED;
}

export class CreateOrderFromCartSuccessful {
  static readonly type = Actions.CREATE_ORDER_SUCCESSFUL;
  constructor(readonly input: DesignOrderCreateMutation["designOrderCreate"]) {}
}

export class UpdateOrderFromCart {
  static readonly type = Actions.UPDATE_ORDER;
  constructor(readonly input: DesignOrderUpdateMutationVariables) {}
}

export class UpdateOrderFromCartFailed {
  static readonly type = Actions.UPDATE_ORDER_FAILED;
}

export class UpdateOrderFromCartSuccessful {
  static readonly type = Actions.UPDATE_ORDER_SUCCESSFUL;
}

export class Checkout {
  static readonly type = Actions.CHECKOUT;
  constructor(readonly input: VnPay.CheckoutPayload) {}
}

export class CheckoutFailed {
  static readonly type = Actions.CHECKOUT_FAILED;
}

export class CheckoutSuccessful {
  static readonly type = Actions.CHECKOUT_SUCCESSFUL;
  constructor(readonly input: VnPay.CheckoutResponse) {}
}
