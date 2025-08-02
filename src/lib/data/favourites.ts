import { type Feed } from "../schemas/feeds"
// import { Platform } from "../schemas/enums"

export const favourites: Feed[] = []

export const getPlatformsFromFavourites = () => {
  const platformMap = new Map<string, { count: number }>()

  favourites.forEach(item => {
    const platform = item.platform
    const existing = platformMap.get(platform)
    if (existing) {
      existing.count += 1
    } else {
      platformMap.set(platform, { count: 1 })
    }
  })

  return Array.from(platformMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    count: data.count,
  }))
}
