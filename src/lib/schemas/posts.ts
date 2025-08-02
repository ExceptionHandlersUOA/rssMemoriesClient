import { z } from "zod";
import { FileTypeSchema, PlatformSchema } from "./enums";

export const MediaSchema = z.object({
  type: FileTypeSchema,
  fileUrl: z.url(),
});

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  sourceUrl: z.url(),
  lastUpdated: z.string().datetime(),
  publishedAt: z.string().datetime(),
  media: z.array(MediaSchema).default([]),
  platform: PlatformSchema,
});

export const PostsResponseSchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
export type PostsResponse = z.infer<typeof PostsResponseSchema>;
export type Media = z.infer<typeof MediaSchema>;
