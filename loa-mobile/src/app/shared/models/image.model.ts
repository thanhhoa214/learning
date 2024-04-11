export interface Image {
  id?: string;
  url?: string | ArrayBuffer;
  file?: File;
  description?: string;
}
export type Images = Array<Image>;
