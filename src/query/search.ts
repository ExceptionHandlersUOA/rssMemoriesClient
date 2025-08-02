import { searchPostsClient } from "@/lib/api/search"
import { QueryKeys } from "@/lib/enums"
import { keepPreviousData, useSuspenseQuery } from "@tanstack/react-query"

export const searchOptions = (query: string) => ({
  queryKey: [QueryKeys.SEARCH, query],
  queryFn: () => searchPostsClient(query),
  enabled: query.length > 0,
  keepPreviousData: true,
  placeholderData: keepPreviousData,
})

export const useSearch = (query: string) => {
  return useSuspenseQuery(searchOptions(query))
}
