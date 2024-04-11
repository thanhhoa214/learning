import { AllMyBookmarkMenuQuery } from '../../shared/services';

export interface BookMarkStateModel {
  nodeConnection?: AllMyBookmarkMenuQuery['designsBookmarks'];
  selectedNode?: AllMyBookmarkMenuQuery['designsBookmarks']['edges'][0]['node'];
}

export const initialState: BookMarkStateModel = {};
