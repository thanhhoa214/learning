export type HasChildren<T = {}> = T & {
  children: React.ReactNode;
};
