import {
  CreateImageRequestSizeEnum,
  ImagesResponse,
} from 'openai';

export interface PostParams {
  prompt: string;
  amount: number;
  size: CreateImageRequestSizeEnum;
}

export interface PostResponse {
  data: ImagesResponse;
  params: PostParams; // Keep params for rendering purpose
}
