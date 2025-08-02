import { useQuery } from "@tanstack/react-query"
import { QueryKeys } from "@/lib/enums"
import { getFileClient } from "@/lib/api/files"

export const useGetFileOptions = (filename: string) => ({
  queryKey: [QueryKeys.FILES, filename],
  queryFn: () => getFileClient(filename),
})

export function useGetFile(filename: string) {
  return useQuery(useGetFileOptions(filename))
}
