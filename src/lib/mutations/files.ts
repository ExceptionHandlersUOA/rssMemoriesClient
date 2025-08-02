import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addFileClient } from "../api/files"
import { QueryKeys } from "../enums"

export function useAddFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFileClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILES],
      })
    },
  })
}
