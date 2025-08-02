import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  addFeed,
  addCustomFeed,
  deleteCustomFeed,
  deleteFeed,
  updateFeed,
} from "@/lib/api/feeds"
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

export function useDeleteFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}

export function useUpdateFeed() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFeed,
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
