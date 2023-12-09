import { BoxType } from './box-type.model';
import { ProductLists } from './product-list.model';

export interface Box {
  id: number;
  templateId: number;
  typeId?: number;
  location?: number;
  boxTypeId?: number;
  src: string;
  headerTitle: string;
  footerTitle: string;
  headerSrc: string;
  footerSrc: string;
  boxType?: BoxType;
  productLists?: ProductLists;
}

export type Boxes = Array<Box>;
