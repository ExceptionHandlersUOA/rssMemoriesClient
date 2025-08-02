import { z } from "zod";

/**
 * C# FileType enum indices (0-based)
 * Audio = 0, Image = 1, Video = 2, Document = 3
 */
export enum FileType {
  Audio = 0,
  Image = 1,
  Video = 2,
  Document = 3,
}

/**
 * C# Platform enum indices (0-based)
 * YouTube = 0, Instagram = 1, Facebook = 2, RSS = 3, LinkedIn = 4, Twitter = 5
 */
export enum Platform {
  YouTube = 0,
  Instagram = 1,
  Facebook = 2,
  RSS = 3,
  LinkedIn = 4,
  Twitter = 5,
}

/**
 * Zod schemas for runtime validation
 */
export const FileTypeSchema = z.union([
  z.literal(FileType.Audio),
  z.literal(FileType.Image),
  z.literal(FileType.Video),
  z.literal(FileType.Document),
]);
export const PlatformSchema = z.union([
  z.literal(Platform.YouTube),
  z.literal(Platform.Instagram),
  z.literal(Platform.Facebook),
  z.literal(Platform.RSS),
  z.literal(Platform.LinkedIn),
  z.literal(Platform.Twitter),
]);

export type FileTypeValue = z.infer<typeof FileTypeSchema>;
export type PlatformValue = z.infer<typeof PlatformSchema>;
