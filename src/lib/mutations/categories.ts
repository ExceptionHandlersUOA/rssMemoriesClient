import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../enums"
import { createPostCategoryClient, deletePostCategory } from "../api/posts"
import type { DeletePostCategoryRequestData } from "../schemas"

export function useCreatePostCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPostCategoryClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
    },
  })
}

export function useDeletePostCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (
      deletePostCategoryRequestData: DeletePostCategoryRequestData
    ) => deletePostCategory(deletePostCategoryRequestData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.POST],
      })
    },
  })
}
