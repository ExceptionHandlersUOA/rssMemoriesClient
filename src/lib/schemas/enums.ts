import { z } from "zod"

/**
 * FileType enum from Swagger specification
 * Unknown, Audio, Image, Video, Document
 */
export enum FileType {
  Unknown = "Unknown",
  Audio = "Audio",
  Image = "Image",
  Video = "Video",
  Document = "Document",
}

/**
 * Platform enum from Swagger specification
 * Unknown, YouTube, Instagram, Facebook, RSS, LinkedIn, Twitter
 */
export enum Platform {
  Unknown = "Unknown",
  YouTube = "YouTube",
  Instagram = "Instagram",
  Facebook = "Facebook",
  RSS = "RSS",
  LinkedIn = "LinkedIn",
  Twitter = "Twitter",
}

/**
 * Zod schemas for runtime validation
 */
export const FileTypeSchema = z.nativeEnum(FileType)
export const PlatformSchema = z.nativeEnum(Platform)

export type FileTypeValue = z.infer<typeof FileTypeSchema>
export type PlatformValue = z.infer<typeof PlatformSchema>
