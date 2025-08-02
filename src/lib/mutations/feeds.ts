import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addFeed } from "../actions/feeds"
import { QueryKeys } from "../enums"

export function useAddFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}
