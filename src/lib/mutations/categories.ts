import { useMutation, useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "../enums"
import { createPostCategoryClient } from "../api/posts"

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
