import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { GetAllMyRequestDesignsQueryVariables } from '../shared/services';
import {
  LoadMyRequestDesign,
  LoadMyRequestDesignSuccessful,
  MyRequestDesignState,
} from './store';

@Injectable({
  providedIn: 'root',
})
export class MyRequestDesignService {
  constructor(private _store: Store, private _actions: Actions) {}
  getNodeConnection() {
    return this._store.select(MyRequestDesignState.getNodeConnection);
  }
  getSelectedNode() {
    return this._store.select(MyRequestDesignState.getSelectedNode);
  }
  loadRequestDesigns(input: GetAllMyRequestDesignsQueryVariables) {
    this._store.dispatch(new LoadMyRequestDesign(input));
  }
  onLoadNodeConnectionSuccessful() {
    return this._actions.pipe(
      ofActionSuccessful(LoadMyRequestDesignSuccessful)
    );
  }
}
