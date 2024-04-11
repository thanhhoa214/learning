import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Logout } from '@loa-mobile/auth/store';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs/operators';
import { AllPurchaseDesignGQL } from '../services';
import { PurchaseDesignStateModel, initialState } from './purchase-design-state.model';
import {
  Download,
  DownloadFailed,
  Downloading,
  DownloadSuccessful,
  LoadMorePurchaseDesign,
  LoadPurchaseDesign,
  UpdateDownloadedIds
} from './purchase-design.action';
import { Plugins } from '@capacitor/core';
import { Downloader } from 'capacitor-plugin-downloader';
const { Filesystem } = Plugins;
const downloader = new Downloader();

@Injectable({ providedIn: 'root' })
@State<PurchaseDesignStateModel>({
  name: 'purchaseDesign',
  defaults: initialState
})
export class MyPurchaseDesignState {
  constructor(private _allPurchaseDesign: AllPurchaseDesignGQL) {}

  @Selector()
  static getDownloadedIds({ downloadedIds }: PurchaseDesignStateModel) {
    return downloadedIds;
  }

  @Selector()
  static getDownloadingProgress({ downloadingProgress }: PurchaseDesignStateModel) {
    return downloadingProgress;
  }

  @Selector()
  static getNodeConnection({ nodeConnection }: PurchaseDesignStateModel) {
    return nodeConnection;
  }

  @Selector()
  static getPrefixUri({ prefixUri }: PurchaseDesignStateModel) {
    return prefixUri;
  }

  @Selector()
  static getSelectedNode({ selectedNode }: PurchaseDesignStateModel) {
    return selectedNode;
  }

  @Action(Download, { cancelUncompleted: true })
  async download({ dispatch }: StateContext<PurchaseDesignStateModel>, { payload }: Download) {
    const { id, url, fileName } = payload;
    const isAndroid = Capacitor.platform === 'android';
    const wrapperDirectory = isAndroid ? 'Interior Design/' : 'Design Inventory/';
    try {
      await downloader.initialize();
      const { id: downloadedId } = await downloader.createDownload({
        url,
        fileName: wrapperDirectory + fileName
      });
      const progressUpdateListener = downloader.addListener('progressUpdate', (progressEvent) =>
        dispatch(new Downloading(progressEvent))
      );
      const successListener = downloader.addListener('downloadedSucceed', ({ path }) => {
        const lastIndexOfSlash = path.lastIndexOf('/');
        const prefixUri = path.substring(0, lastIndexOfSlash);
        const finalFileName = path.substring(lastIndexOfSlash);
        dispatch(new DownloadSuccessful({ prefixUri, id, fileName: finalFileName }));
        progressUpdateListener.remove();
        successListener.remove();
        failedListener.remove();
      });
      const failedListener = downloader.addListener('downloadedFailed', ({ code, message }) => {
        console.warn(`Error [${code}]: ${message}`);
        dispatch(new DownloadFailed());
        progressUpdateListener.remove();
        successListener.remove();
        failedListener.remove();
      });
      console.log('hye id:', downloadedId);

      await downloader.start({ id: downloadedId });
    } catch (error) {
      console.warn(error);
      dispatch(new DownloadFailed());
    }
  }

  @Action(DownloadFailed)
  downloadFailed({ patchState }: StateContext<PurchaseDesignStateModel>) {
    patchState({ downloadingProgress: null });
  }

  @Action(DownloadSuccessful)
  downloadSuccessful(
    { patchState, getState }: StateContext<PurchaseDesignStateModel>,
    { payload }: DownloadSuccessful
  ) {
    const { id, prefixUri } = payload;
    patchState({
      prefixUri,
      downloadedIds: [...getState().downloadedIds, id],
      downloadingProgress: null
    });
  }

  @Action(Downloading)
  downloading({ patchState }: StateContext<PurchaseDesignStateModel>, { payload }: Downloading) {
    patchState({ downloadingProgress: payload });
  }

  @Action(LoadMorePurchaseDesign)
  loadMorePurchaseDesign(
    ctx: StateContext<PurchaseDesignStateModel>,
    { payload }: LoadMorePurchaseDesign
  ) {
    return this._allPurchaseDesign.fetch({ ...payload }).pipe(
      tap(({ data }) => {
        const { designsPurchased } = data;
        const newState = produce(ctx.getState(), (draftState) => {
          const draftDesign = draftState.nodeConnection;
          draftDesign.pageInfo = designsPurchased.pageInfo;
          draftDesign.edges = [...draftDesign.edges, ...designsPurchased.edges];
        });
        ctx.patchState(newState);
      })
    );
  }

  @Action(LoadPurchaseDesign, { cancelUncompleted: true })
  loadPurchaseDesign(
    { patchState }: StateContext<PurchaseDesignStateModel>,
    { payload }: LoadPurchaseDesign
  ) {
    return this._allPurchaseDesign.fetch({ ...payload }).pipe(
      tap(({ data }) => {
        patchState({ nodeConnection: data.designsPurchased });
      })
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<PurchaseDesignStateModel>) {
    setState(initialState);
  }

  @Action(UpdateDownloadedIds)
  async updateDownloadedIds({ getState, patchState }: StateContext<PurchaseDesignStateModel>) {
    const { downloadedIds, prefixUri: folderUrl } = getState();
    try {
      if (folderUrl) {
        if (Capacitor.platform === 'android') await Filesystem.requestPermissions();
        const dir = await Filesystem.readdir({ path: folderUrl });
        const idsInNativeDir = dir.files
          .filter((fileName) => fileName.endsWith('.zip'))
          .map((fileName) => fileName.slice(0, fileName.indexOf('-')));

        return patchState({
          downloadedIds: downloadedIds.filter((id) => idsInNativeDir.includes(id))
        });
      }
    } catch (error) {
      console.log('Directory not found');
    }
    patchState({ downloadedIds: [] });
  }
}
