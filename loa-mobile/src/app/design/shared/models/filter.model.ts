import {
  DesignDesignType,
  DesignStyle,
  DesignTypeOfHouse,
  DesignRoomRoomType,
} from '@loa-shared/models/graphql.model';

export interface Filters {
  projectName?: string;
  designType?: DesignDesignType;
  houseTypes?: DesignTypeOfHouse[];
  styles?: DesignStyle[];
  roomTypes?: DesignRoomRoomType[];
  lowestPrice?: number;
  highestPrice?: number;
  areaTo?: number;
  areaFrom?: number;
  lowestConstructionPrice?: number;
  highestConstructionPrice?: number;
}
