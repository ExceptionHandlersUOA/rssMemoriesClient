import { z } from "zod";
import { FileTypeSchema, PlatformSchema } from "./enums";

export const MediaSchema = z.object({
  type: FileTypeSchema,
  fileUrl: z.url(),
});

export const FeedSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  sourceUrl: z.url(),
  lastUpdated: z.string().datetime(),
  emoji: z.string().optional(),
  publishedAt: z.string().datetime(),
  media: z.array(MediaSchema).default([]),
  platform: PlatformSchema,
  categories: z.array(z.string()).default([]),
});

export const FeedsResponseSchema = z.array(FeedSchema);

export type Feed = z.infer<typeof FeedSchema>;
export type FeedsResponse = z.infer<typeof FeedsResponseSchema>;
export type Media = z.infer<typeof MediaSchema>;
