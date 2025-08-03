import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createCustomPostClient,
  deleteCustomPostClient,
  favouritePost,
  unfavouritePost,
} from "../api/posts"
import { QueryKeys } from "../enums"

export function useCreateCustomPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCustomPostClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}

export function useDeleteCustomPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCustomPostClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}

export function useFavouritePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: favouritePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}

export function useUnfavouritePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: unfavouritePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FEEDS],
      })
    },
  })
}
