import { login } from "../api/auth"
import { useMutation } from "@tanstack/react-query"

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Handle successful login, e.g., store user data or redirect
      console.log("Login successful:")
    },
  })
}
