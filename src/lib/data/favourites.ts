import { type Feed } from "../schemas/feeds";

export const favourites: Feed[] = [
  {
    id: "first-day-of-school",
    title: "First Day of School",
    description:
      "The excitement and nervousness of starting a new chapter in life",
    sourceUrl: "/dashboard/memories/First Day of School",
    lastUpdated: "2024-01-15T10:30:00Z",
    publishedAt: "2024-01-15T10:30:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Childhood", "Education"],
  },
  {
    id: "family-vacation-disney",
    title: "Family Vacation to Disney World",
    description: "Magical memories with family at the happiest place on earth",
    sourceUrl: "/dashboard/memories/Family Vacation to Disney World",
    lastUpdated: "2024-01-14T15:45:00Z",
    publishedAt: "2024-01-14T15:45:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Family", "Travel", "Vacation"],
  },
  {
    id: "learning-to-ride-bike",
    title: "Learning to Ride a Bike",
    description: "The freedom and joy of mastering a new skill",
    sourceUrl: "/dashboard/memories/Learning to Ride a Bike",
    lastUpdated: "2024-01-15T08:20:00Z",
    publishedAt: "2024-01-15T08:20:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Childhood", "Learning", "Achievement"],
  },
  {
    id: "grandmas-sunday-dinners",
    title: "Grandma's Sunday Dinners",
    description: "Warm family gatherings filled with love and delicious food",
    sourceUrl: "/dashboard/memories/Grandma's Sunday Dinners",
    lastUpdated: "2024-01-10T18:00:00Z",
    publishedAt: "2024-01-10T18:00:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Family", "Food", "Traditions"],
  },
  {
    id: "first-pet-goldfish",
    title: "First Pet - Goldfish Named Bubbles",
    description: "The responsibility and wonder of caring for a first pet",
    sourceUrl: "/dashboard/memories/First Pet - Goldfish Named Bubbles",
    lastUpdated: "2024-01-08T12:15:00Z",
    publishedAt: "2024-01-08T12:15:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Childhood", "Pets", "Responsibility"],
  },
  {
    id: "building-treehouse-dad",
    title: "Building a Treehouse with Dad",
    description: "Quality time spent creating something special together",
    sourceUrl: "/dashboard/memories/Building a Treehouse with Dad",
    lastUpdated: "2024-01-13T14:30:00Z",
    publishedAt: "2024-01-13T14:30:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Family", "Building", "Quality Time"],
  },
  {
    id: "first-snow-day",
    title: "First Snow Day",
    description: "The magic of waking up to a winter wonderland",
    sourceUrl: "/dashboard/memories/First Snow Day",
    lastUpdated: "2024-01-11T09:00:00Z",
    publishedAt: "2024-01-11T09:00:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Childhood", "Weather", "First Times"],
  },
  {
    id: "moms-bedtime-stories",
    title: "Mom's Bedtime Stories",
    description: "Cozy evenings filled with imagination and love",
    sourceUrl: "/dashboard/memories/Mom's Bedtime Stories",
    lastUpdated: "2024-01-14T20:00:00Z",
    publishedAt: "2024-01-14T20:00:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Family", "Reading", "Bedtime"],
  },
  {
    id: "first-time-swimming-ocean",
    title: "First Time Swimming in the Ocean",
    description: "The vastness and wonder of the sea",
    sourceUrl: "/dashboard/memories/First Time Swimming in the Ocean",
    lastUpdated: "2024-01-15T06:45:00Z",
    publishedAt: "2024-01-15T06:45:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Childhood", "Water", "First Times"],
  },
  {
    id: "birthday-party-park",
    title: "Birthday Party at the Park",
    description: "Celebrating with friends and family in the great outdoors",
    sourceUrl: "/dashboard/memories/Birthday Party at the Park",
    lastUpdated: "2024-01-15T16:30:00Z",
    publishedAt: "2024-01-15T16:30:00Z",
    media: [],
    platform: 3, // RSS
    categories: ["Family", "Celebration", "Outdoors"],
  },
];

export const getCategoriesFromFavourites = () => {
  const categoryMap = new Map<string, { count: number }>();

  favourites.forEach((item) => {
    item.categories.forEach((category) => {
      const existing = categoryMap.get(category);
      if (existing) {
        existing.count += 1;
      } else {
        categoryMap.set(category, { count: 1 });
      }
    });
  });

  return Array.from(categoryMap.entries()).map(([name, data]) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    count: data.count,
  }));
};
