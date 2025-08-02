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
 * Unknown, YouTube, Instagram, RSS, Reddit, GitHub, Custom
 */
export enum Platform {
  Unknown = "Unknown",
  YouTube = "YouTube",
  Instagram = "Instagram",
  RSS = "RSS",
  Reddit = "Reddit",
  GitHub = "GitHub",
  Custom = "Custom",
}

/**
 * Zod schemas for runtime validation
 */
export const FileTypeSchema = z.nativeEnum(FileType)
export const PlatformSchema = z.nativeEnum(Platform)

export type FileTypeValue = z.infer<typeof FileTypeSchema>
export type PlatformValue = z.infer<typeof PlatformSchema>
