import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addFeed, addCustomFeed, deleteCustomFeed } from "@/lib/api/feeds"
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

export function useAddCustomFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addCustomFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}

export function useDeleteCustomFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCustomFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}
