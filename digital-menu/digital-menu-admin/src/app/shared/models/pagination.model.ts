export interface Pagination<T> {
  result: Array<T>;
  nextPage: string;
  previousPage: string;
  count: number;
}
