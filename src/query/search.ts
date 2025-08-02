import { searchPostsClient } from "@/lib/api/search"
import { QueryKeys } from "@/lib/enums"
import { useQuery } from "@tanstack/react-query"

export const searchOptions = (query: string) => ({
  queryKey: [QueryKeys.SEARCH, query],
  queryFn: () => searchPostsClient(query),
  enabled: query.length > 0,
})

export const useSearch = (query: string) => {
  return useQuery(searchOptions(query))
}
