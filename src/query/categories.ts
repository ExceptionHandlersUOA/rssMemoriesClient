import { QueryKeys } from "@/lib/enums"
import { useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchCategoriesByName } from "@/lib/api/categories"

export const fetchCategoriesOptions = {
  queryKey: [QueryKeys.CATEGORIES],
  queryFn: fetchCategories,
}

export function useFetchCategories() {
  return useQuery(fetchCategoriesOptions)
}

export const fetchCategoriesByNameOptions = (categoryName: string) => ({
  queryKey: [QueryKeys.CATEGORIES, categoryName],
  queryFn: () => fetchCategoriesByName(categoryName),
})

export function useFetchCategoriesByName(categoryName: string) {
  return useQuery(fetchCategoriesByNameOptions(categoryName))
}
