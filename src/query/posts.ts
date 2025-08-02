import { fetchPostByIdClient } from "@/lib/api/posts"
import { QueryKeys } from "@/lib/enums"
import { useQuery } from "@tanstack/react-query"

export const postOptions = (id: string) => ({
  queryKey: [QueryKeys.POST, id],
  queryFn: () => fetchPostByIdClient(id),
})

export const usePost = (id: string) => {
  return useQuery(postOptions(id))
}
