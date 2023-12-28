export interface IdParamsProp<T extends string = "id"> {
  params: IdParams<T>;
}

export type IdParams<T extends string = "id"> = Record<T, string>;

export type PrismaOmitId<T extends { id?: string }> = Omit<T, "id">;
