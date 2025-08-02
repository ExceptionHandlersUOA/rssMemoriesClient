import { z } from "zod"

export const MemoryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
})

export const MemoryVideoSchema = z.object({
  src: z.string(),
})

export const MemoryCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  link: z.string(),
  date: z.string(),
  location: z.string(),
  text: z.string().optional(),
  videos: z.array(MemoryVideoSchema).optional(),
  images: z.array(MemoryImageSchema).optional(),
})

export type MemoryImage = z.infer<typeof MemoryImageSchema>
export type MemoryVideo = z.infer<typeof MemoryVideoSchema>
export type MemoryCard = z.infer<typeof MemoryCardSchema>
