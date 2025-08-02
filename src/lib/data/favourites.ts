import { type WebFeed } from '../schemas/feeds'

export const favourites: WebFeed[] = [
  {
    feedId: 1,
    title: 'First Day of School',
    description:
      'The excitement and nervousness of starting a new chapter in life',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    url: '/dashboard/memories/First Day of School',
    posts: [],
    categories: ['Childhood', 'Education'],
  },
  {
    feedId: 2,
    title: 'Family Vacation to Disney World',
    description: 'Magical memories with family at the happiest place on earth',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    url: '/dashboard/memories/Family Vacation to Disney World',
    posts: [],
    categories: ['Family', 'Travel', 'Vacation'],
  },
  {
    feedId: 3,
    title: 'Learning to Ride a Bike',
    description: 'The freedom and joy of mastering a new skill',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    url: '/dashboard/memories/Learning to Ride a Bike',
    posts: [],
    categories: ['Childhood', 'Learning', 'Achievement'],
  },
  {
    feedId: 4,
    title: "Grandma's Sunday Dinners",
    description: 'Warm family gatherings filled with love and delicious food',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    url: "/dashboard/memories/Grandma's Sunday Dinners",
    posts: [],
    categories: ['Family', 'Food', 'Traditions'],
  },
  {
    feedId: 5,
    title: 'First Pet - Goldfish Named Bubbles',
    description: 'The responsibility and wonder of caring for a first pet',
    imageUrl: 'https://picsum.photos/800/600?random=5',
    url: '/dashboard/memories/First Pet - Goldfish Named Bubbles',
    posts: [],
    categories: ['Childhood', 'Pets', 'Responsibility'],
  },
  {
    feedId: 6,
    title: 'Building a Treehouse with Dad',
    description: 'Quality time spent creating something special together',
    imageUrl: 'https://picsum.photos/800/600?random=6',
    url: '/dashboard/memories/Building a Treehouse with Dad',
    posts: [],
    categories: ['Family', 'Building', 'Quality Time'],
  },
  {
    feedId: 7,
    title: 'First Snow Day',
    description: 'The magic of waking up to a winter wonderland',
    imageUrl: 'https://picsum.photos/800/600?random=7',
    url: '/dashboard/memories/First Snow Day',
    posts: [],
    categories: ['Childhood', 'Weather', 'First Times'],
  },
  {
    feedId: 8,
    title: "Mom's Bedtime Stories",
    description: 'Cozy evenings filled with imagination and love',
    imageUrl: 'https://picsum.photos/800/600?random=8',
    url: "/dashboard/memories/Mom's Bedtime Stories",
    posts: [],
    categories: ['Family', 'Reading', 'Bedtime'],
  },
  {
    feedId: 9,
    title: 'First Time Swimming in the Ocean',
    description: 'The vastness and wonder of the sea',
    imageUrl: 'https://picsum.photos/800/600?random=9',
    url: '/dashboard/memories/First Time Swimming in the Ocean',
    posts: [],
    categories: ['Childhood', 'Water', 'First Times'],
  },
  {
    feedId: 10,
    title: 'Birthday Party at the Park',
    description: 'Celebrating with friends and family in the great outdoors',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    url: '/dashboard/memories/Birthday Party at the Park',
    posts: [],
    categories: ['Family', 'Celebration', 'Outdoors'],
  },
]

export const getCategoriesFromFavourites = () => {
  const categoryMap = new Map<string, { count: number }>()

  favourites.forEach(item => {
    item.categories?.forEach(category => {
      const existing = categoryMap.get(category)
      if (existing) {
        existing.count += 1
      } else {
        categoryMap.set(category, { count: 1 })
      }
    })
  })

  return Array.from(categoryMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    count: data.count,
  }))
}
