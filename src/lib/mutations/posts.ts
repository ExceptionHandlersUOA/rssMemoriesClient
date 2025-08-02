import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCustomPostClient, deleteCustomPostClient } from "../api/posts"
import { QueryKeys } from "../enums"

export function useCreateCustomPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCustomPostClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
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
    },
  })
}
