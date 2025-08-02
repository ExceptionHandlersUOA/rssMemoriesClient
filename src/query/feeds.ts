import { fetchFeedsClient } from "@/lib/api/feeds"
import { QueryKeys } from "@/lib/enums"
import { useQuery } from "@tanstack/react-query"

export const feedsOptions = {
  queryKey: [QueryKeys.FEEDS],
  queryFn: () => fetchFeedsClient(1, 10),
}

export const useFeeds = () => {
  return useQuery(feedsOptions)
}
