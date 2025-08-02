export type FavouriteItem = {
  name: string;
  url: string;
  emoji: string;
  description: string;
  category: string;
  lastAccessed: string;
};

export const favourites: FavouriteItem[] = [
  {
    name: "First Day of School",
    url: "/dashboard/memories/First Day of School",
    emoji: "🎒",
    description:
      "The excitement and nervousness of starting a new chapter in life",
    category: "Childhood",
    lastAccessed: "2 hours ago",
  },
  {
    name: "Family Vacation to Disney World",
    url: "/dashboard/memories/Family Vacation to Disney World",
    emoji: "🏰",
    description: "Magical memories with family at the happiest place on earth",
    category: "Family",
    lastAccessed: "1 day ago",
  },
  {
    name: "Learning to Ride a Bike",
    url: "/dashboard/memories/Learning to Ride a Bike",
    emoji: "🚴",
    description: "The freedom and joy of mastering a new skill",
    category: "Childhood",
    lastAccessed: "3 hours ago",
  },
  {
    name: "Grandma's Sunday Dinners",
    url: "/dashboard/memories/Grandma's Sunday Dinners",
    emoji: "🍽️",
    description: "Warm family gatherings filled with love and delicious food",
    category: "Family",
    lastAccessed: "5 days ago",
  },
  {
    name: "First Pet - Goldfish Named Bubbles",
    url: "/dashboard/memories/First Pet - Goldfish Named Bubbles",
    emoji: "🐠",
    description: "The responsibility and wonder of caring for a first pet",
    category: "Childhood",
    lastAccessed: "1 week ago",
  },
  {
    name: "Building a Treehouse with Dad",
    url: "/dashboard/memories/Building a Treehouse with Dad",
    emoji: "🌳",
    description: "Quality time spent creating something special together",
    category: "Family",
    lastAccessed: "2 days ago",
  },
  {
    name: "First Snow Day",
    url: "/dashboard/memories/First Snow Day",
    emoji: "❄️",
    description: "The magic of waking up to a winter wonderland",
    category: "Childhood",
    lastAccessed: "4 days ago",
  },
  {
    name: "Mom's Bedtime Stories",
    url: "/dashboard/memories/Mom's Bedtime Stories",
    emoji: "📖",
    description: "Cozy evenings filled with imagination and love",
    category: "Family",
    lastAccessed: "1 day ago",
  },
  {
    name: "First Time Swimming in the Ocean",
    url: "/dashboard/memories/First Time Swimming in the Ocean",
    emoji: "🌊",
    description: "The vastness and wonder of the sea",
    category: "Childhood",
    lastAccessed: "6 hours ago",
  },
  {
    name: "Birthday Party at the Park",
    url: "/dashboard/memories/Birthday Party at the Park",
    emoji: "🎉",
    description: "Celebrating with friends and family in the great outdoors",
    category: "Family",
    lastAccessed: "1 hour ago",
  },
];
