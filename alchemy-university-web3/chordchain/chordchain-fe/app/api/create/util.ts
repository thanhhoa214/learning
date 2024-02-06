import { z } from "zod";

export const createFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Song name must be at least 2 characters." }),
  description: z.string().default(""),
  lyric: z
    .string({ required_error: "Lyric must be defined." })
    .min(10, { message: "Lyric must be at least 10 characters." })
    .max(400, { message: "Lyric must not be longer than 400 characters." }),
  composer: z.string().optional(),
  genre: z.string().optional(),
  artist: z.object({
    name: z.string().optional(),
    tone: z.string().optional(),
    musicLink: z.string().optional(),
  }),
});

export type CreateFormModel = z.infer<typeof createFormSchema>;
