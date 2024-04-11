import { QueryDesignsPurchasedArgs } from '@loa-shared/models/graphql.model';
import { ProgressEvent } from 'capacitor-plugin-downloader';

const enum AddminActions {
  LOAD_PURCHASE_DESIGN = '[Admin Load Purchase Design] Load Purchase Design',
  LOAD_MORE_PURCHASE_DESIGN = '[Admin Load More Purchase Design] Load More Purchase Design',
  DOWNLOAD = '[Admin Load Purchase Design] Download',
  DOWNLOAD_FAILED = '[Admin Load Purchase Design] Download Failed',
  DOWNLOAD_SUCCESSFUL = '[Admin Load Purchase Design] Download Successful',
  DOWNLOADING = '[Admin Load Purchase Design] Downloading',
  UPDATE_DOWNLOADED_IDS = '[Admin Load Purchase Design] Update Downloaded IDs'
}

export class LoadPurchaseDesign {
  static readonly type = AddminActions.LOAD_PURCHASE_DESIGN;

  constructor(public readonly payload?: QueryDesignsPurchasedArgs) {}
}

export class LoadMorePurchaseDesign {
  static readonly type = AddminActions.LOAD_MORE_PURCHASE_DESIGN;

  constructor(public readonly payload?: QueryDesignsPurchasedArgs) {}
}

export class Download {
  static readonly type = AddminActions.DOWNLOAD;

  constructor(public readonly payload: { id: string; url: string; fileName: string }) {}
}

export class DownloadSuccessful {
  static readonly type = AddminActions.DOWNLOAD_SUCCESSFUL;

  constructor(public readonly payload: { id: string; prefixUri: string; fileName: string }) {}
}

export class DownloadFailed {
  static readonly type = AddminActions.DOWNLOAD_FAILED;
}

export class Downloading {
  static readonly type = AddminActions.DOWNLOADING;

  constructor(public readonly payload: ProgressEvent) {}
}

export class UpdateDownloadedIds {
  static readonly type = AddminActions.UPDATE_DOWNLOADED_IDS;
}
