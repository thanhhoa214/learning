import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { filter, tap } from 'rxjs/operators';
import {
  LoadMyRequestDesign,
  LoadMyRequestDesignSuccessful,
} from './my-request-design.actions';
import {
  GetAllMyRequestDesignsGQL,
  GetAllMyRequestDesignsQuery,
} from '../../shared/services';

export interface MyRequestDesignStateModel {
  nodeConnection?: GetAllMyRequestDesignsQuery['designsInquiries'];
  selectedNode?: GetAllMyRequestDesignsQuery['designsInquiries']['edges'][0]['node'];
}

export const initialState: MyRequestDesignStateModel = {};

@Injectable({ providedIn: 'root' })
@State<MyRequestDesignStateModel>({
  name: 'myRequestDesign',
  defaults: initialState,
})
export class MyRequestDesignState {
  @Selector()
  static getNodeConnection({ nodeConnection }: MyRequestDesignStateModel) {
    return nodeConnection;
  }
  @Selector()
  static getSelectedNode({ selectedNode }: MyRequestDesignStateModel) {
    return selectedNode;
  }
  constructor(private _getRequestDesign: GetAllMyRequestDesignsGQL) {}

  @Action(LoadMyRequestDesign, { cancelUncompleted: true })
  loadMyRequestDesign(
    { dispatch }: StateContext<MyRequestDesignStateModel>,
    { payload }: LoadMyRequestDesign
  ) {
    return this._getRequestDesign.fetch(payload).pipe(
      filter(({ data }) => !!data.designsInquiries),
      tap(({ data }) => dispatch(new LoadMyRequestDesignSuccessful(data)))
    );
  }
  @Action(LoadMyRequestDesignSuccessful, { cancelUncompleted: true })
  loadMyRequestDesignSuccessful(
    { patchState }: StateContext<MyRequestDesignStateModel>,
    { payload }: LoadMyRequestDesignSuccessful
  ) {
    patchState({ nodeConnection: payload.designsInquiries });
  }
}
