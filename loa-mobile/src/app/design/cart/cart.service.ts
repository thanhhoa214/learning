import { Injectable } from '@angular/core';
import {
  ActionCompletion,
  Actions,
  ofActionSuccessful,
  Store,
} from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  CartState,
  CartStateModel,
  LoadCart,
  AddToCart,
  AddToCartFailed,
  AddToCartSuccessful,
  RemoveFromCart,
  RemoveFromCartFailed,
  RemoveFromCartSuccessful,
  CreateOrderFromCart,
  UpdateOrderFromCart,
  Checkout,
  CreateOrderFromCartFailed,
  CreateOrderFromCartSuccessful,
  UpdateOrderFromCartFailed,
  UpdateOrderFromCartSuccessful,
  CheckoutFailed,
  CheckoutSuccessful,
} from './store';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart$: Observable<CartStateModel['cart']>;

  onAddToCartFailed$: Observable<ActionCompletion>;
  onAddToCartSuccessful$: Observable<ActionCompletion>;

  onRemoveFromCartDispatch$: Observable<ActionCompletion>;
  onRemoveFromCartFailed$: Observable<ActionCompletion>;
  onRemoveFromCartSuccessful$: Observable<ActionCompletion>;

  onCreateOrderFromCartFailed$: Observable<ActionCompletion>;
  onCreateOrderFromCartSuccessful$: Observable<
    ActionCompletion<CreateOrderFromCartSuccessful>
  >;

  onUpdateOrderFailed$: Observable<ActionCompletion>;
  onUpdateOrderSuccessful$: Observable<ActionCompletion>;

  onCheckoutFailed$: Observable<ActionCompletion>;
  onCheckoutSuccessful$: Observable<ActionCompletion<CheckoutSuccessful>>;

  onLoadCartSuccessful$: Observable<ActionCompletion>;

  constructor(private _store: Store, private _actions: Actions) {
    this.cart$ = this._store.select(CartState.cart);
    this.onAddToCartFailed$ = this.completedOf(AddToCartFailed);
    this.onAddToCartSuccessful$ = this.completedOf(AddToCartSuccessful);
    this.onRemoveFromCartFailed$ = this.completedOf(RemoveFromCartFailed);
    this.onRemoveFromCartSuccessful$ = this.completedOf(
      RemoveFromCartSuccessful
    );
    this.onCreateOrderFromCartFailed$ = this.completedOf(
      CreateOrderFromCartFailed
    );
    this.onCreateOrderFromCartSuccessful$ = this.completedOf(
      CreateOrderFromCartSuccessful
    );
    this.onUpdateOrderFailed$ = this.completedOf(UpdateOrderFromCartFailed);
    this.onUpdateOrderSuccessful$ = this.completedOf(
      UpdateOrderFromCartSuccessful
    );
    this.onCheckoutFailed$ = this.completedOf(CheckoutFailed);
    this.onCheckoutSuccessful$ = this.completedOf(CheckoutSuccessful);
    this.onLoadCartSuccessful$ = this.completedOf(LoadCart);
  }

  get snapshot() {
    return this._store.selectSnapshot<CartStateModel>(CartState);
  }

  loadCart() {
    this._store.dispatch(new LoadCart());
  }

  addToCart(input: AddToCart['input']['input']) {
    this._store.dispatch(new AddToCart({ input }));
  }

  removeFromCart(input: RemoveFromCart['input']['input']) {
    this._store.dispatch(new RemoveFromCart({ input }));
  }

  createOrder(input: CreateOrderFromCart['input']['input']) {
    this._store.dispatch(new CreateOrderFromCart({ input }));
  }

  updateOrder(input: UpdateOrderFromCart['input']['input']) {
    this._store.dispatch(new UpdateOrderFromCart({ input }));
  }

  checkout(input: Checkout['input']) {
    this._store.dispatch(new Checkout(input));
  }

  checkoutFailed() {
    this._store.dispatch(new CheckoutFailed());
  }

  checkoutSuccessful(input: CheckoutSuccessful['input']) {
    this._store.dispatch(new CheckoutSuccessful(input));
  }

  private completedOf(input: any) {
    return this._actions.pipe(ofActionSuccessful(input));
  }
}
