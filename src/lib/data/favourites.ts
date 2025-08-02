import { type WebFeed } from "../schemas/feeds"
import { Platform } from "../schemas/enums"

export const favourites: WebFeed[] = [
  {
    feedId: 1,
    title: "First Day of School",
    description:
      "The excitement and nervousness of starting a new chapter in life",
    imageUrl: "https://picsum.photos/800/600?random=1",
    url: "/dashboard/memories/1",
    posts: [],
    categories: ["Childhood", "Education"],
    platform: Platform.RSS,
  },
  {
    feedId: 2,
    title: "Family Vacation to Disney World",
    description: "Magical memories with family at the happiest place on earth",
    imageUrl: "https://picsum.photos/800/600?random=2",
    url: "/dashboard/memories/2",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 3,
    title: "Learning to Ride a Bike",
    description: "The freedom and joy of mastering a new skill",
    imageUrl: "https://picsum.photos/800/600?random=3",
    url: "/dashboard/memories/3",
    posts: [],
    categories: ["Childhood", "Education"],
    platform: Platform.RSS,
  },
  {
    feedId: 4,
    title: "Grandma's Sunday Dinners",
    description: "Warm family gatherings filled with love and delicious food",
    imageUrl: "https://picsum.photos/800/600?random=4",
    url: "/dashboard/memories/4",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 5,
    title: "First Pet - Goldfish Named Bubbles",
    description: "The responsibility and wonder of caring for a first pet",
    imageUrl: "https://picsum.photos/800/600?random=5",
    url: "/dashboard/memories/5",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 6,
    title: "Building a Treehouse with Dad",
    description: "Quality time spent creating something special together",
    imageUrl: "https://picsum.photos/800/600?random=6",
    url: "/dashboard/memories/6",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 7,
    title: "First Snow Day",
    description: "The magic of waking up to a winter wonderland",
    imageUrl: "https://picsum.photos/800/600?random=7",
    url: "/dashboard/memories/7",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 8,
    title: "Mom's Bedtime Stories",
    description: "Cozy evenings filled with imagination and love",
    imageUrl: "https://picsum.photos/800/600?random=8",
    url: "/dashboard/memories/8",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 9,
    title: "First Time Swimming in the Ocean",
    description: "The vastness and wonder of the sea",
    imageUrl: "https://picsum.photos/800/600?random=9",
    url: "/dashboard/memories/9",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
  {
    feedId: 10,
    title: "Birthday Party at the Park",
    description: "Celebrating with friends and family in the great outdoors",
    imageUrl: "https://picsum.photos/800/600?random=10",
    url: "/dashboard/memories/10",
    posts: [],
    categories: ["Family", "Vacation"],
    platform: Platform.RSS,
  },
]

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
