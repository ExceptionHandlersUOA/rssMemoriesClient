import { FileType, Platform } from "./enums";

/**
 * Get the display name for a file type
 */
export function getFileTypeDisplayName(fileType: FileType): string {
  return FileType[fileType];
}

/**
 * Get the display name for a platform
 */
export function getPlatformDisplayName(platform: Platform): string {
  return Platform[platform];
}

/**
 * Get all file types as an array of { value, label } pairs
 */
export function getFileTypeOptions() {
  return Object.entries(FileType)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value as FileType,
      label: key,
    }));
}

/**
 * Get all platforms as an array of { value, label } pairs
 */
export function getPlatformOptions() {
  return Object.entries(Platform)
    .filter(([key]) => Number.isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value as Platform,
      label: key,
    }));
}

/**
 * Check if a value is a valid file type
 */
export function isValidFileType(value: string): value is FileType {
  return Object.values(FileType).includes(value as FileType);
}

/**
 * Check if a value is a valid platform
 */
export function isValidPlatform(value: string): value is Platform {
  return Object.values(Platform).includes(value as Platform);
}
