import { DesignNode } from '@loa-shared/models/graphql.model';
import { ProgressEvent } from 'capacitor-plugin-downloader';
import { AllPurchaseDesignQuery } from '../services';

export interface PurchaseDesignStateModel {
  downloadedIds: string[];
  downloadingProgress?: ProgressEvent;
  nodeConnection?: AllPurchaseDesignQuery['designsPurchased'];
  prefixUri?: string;
  selectedNode?: DesignNode;
}

export const initialState: PurchaseDesignStateModel = { downloadedIds: [] };
