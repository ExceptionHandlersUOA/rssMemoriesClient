import { QueryClient, useMutation } from "@tanstack/react-query"
import { addFileClient } from "../api/files"
import { QueryKeys } from "../enums"

export function useAddFile() {
  const queryClient = new QueryClient()

  return useMutation({
    mutationFn: addFileClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.FILES],
      })
    },
  })
}
