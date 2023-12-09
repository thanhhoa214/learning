import { CreateImageRequestSizeEnum } from 'openai';
import * as z from 'zod';

export const MIN_IMAGE_COUNT = 1;
export const MAX_IMAGE_COUNT = 2; // 10 in API but uses 2 for saving budget

export const formSchema = z.object({
  prompt: z.string().min(2, { message: "Prompt has min 2 characters." }),
  numberOfImages: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "Price must be a number" })
      .positive("Price must be positive")
      .min(MIN_IMAGE_COUNT, `Min is ${MIN_IMAGE_COUNT}`)
      .max(MAX_IMAGE_COUNT, `Max is ${MAX_IMAGE_COUNT}`)
  ),
  pixelSize: z.nativeEnum(CreateImageRequestSizeEnum),
});

export type ImagePromptSchema = z.infer<typeof formSchema>;

export const getWidthFromImageSize = (size: CreateImageRequestSizeEnum) =>
  parseInt(size.split("x")[0]);
