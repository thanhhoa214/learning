import { Injectable } from '@angular/core';
import {
  ActionCompletion,
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store
} from '@ngxs/store';
import {
  Download,
  DownloadFailed,
  DownloadSuccessful,
  LoadPurchaseDesign,
  MyPurchaseDesignState,
  PurchaseDesignStateModel,
  UpdateDownloadedIds
} from './store';
import { Observable } from 'rxjs';
import { LoginService } from '@loa-mobile/auth/login/services/login.service';
import { environment } from 'src/environments/environment';
import { ProgressEvent } from 'capacitor-plugin-downloader';
const DESIGN_DOWNLOAD_URL = `${environment.API_URL}/api/design/download`;

@Injectable({ providedIn: 'root' })
export class MyPurchaseDesignService {
  downloadedIds$: Observable<PurchaseDesignStateModel['downloadedIds']>;
  downloadingProgress$: Observable<ProgressEvent>;
  onDownload$: Observable<ActionCompletion>;
  onDownloadFailed$: Observable<ActionCompletion>;
  onDownloadSuccessful$: Observable<DownloadSuccessful>;
  onLoadPurchaseDesign$: Observable<DownloadSuccessful>;

  constructor(private _loginService: LoginService, private _store: Store, actions: Actions) {
    this.onDownload$ = actions.pipe(ofActionDispatched(Download));
    this.onDownloadFailed$ = actions.pipe(ofActionSuccessful(DownloadFailed));
    this.onDownloadSuccessful$ = actions.pipe(ofActionSuccessful(DownloadSuccessful));
    this.onLoadPurchaseDesign$ = actions.pipe(ofActionSuccessful(LoadPurchaseDesign));

    this.downloadedIds$ = this._store.select(MyPurchaseDesignState.getDownloadedIds);
    this.downloadingProgress$ = this._store.select(MyPurchaseDesignState.getDownloadingProgress);
  }

  download(designId: string, designName: string) {
    if (this.snapshot.downloadingProgress) return;
    const { token } = this._loginService.snapshot;
    if (token) {
      const params = {
        design_id: designId,
        token
      };
      const downloadUrl = new URL(DESIGN_DOWNLOAD_URL);
      downloadUrl.search = new URLSearchParams(params).toString();
      const encodedFileName = `${designId}-${designName}.zip`;
      this._store.dispatch(
        new Download({
          id: designId,
          url: downloadUrl.toString(),
          fileName: encodedFileName
        })
      );
    }
  }

  updateDownloadedIds() {
    this._store.dispatch(new UpdateDownloadedIds());
  }

  get snapshot() {
    return this._store.selectSnapshot<PurchaseDesignStateModel>(MyPurchaseDesignState);
  }
}
