import { Boxes } from './box.model';

export interface Template {
  id: number;
  description: string;
  storeId: number;
  createdTime: string;
  uilink: string;
  name: string;
  boxes?: Boxes;
}

export type Templates = Array<Template>;
