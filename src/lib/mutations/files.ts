import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addFileClient, deleteFileClient } from "../api/files"
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

export function useDeleteFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteFileClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILES],
      })
    },
  })
}
