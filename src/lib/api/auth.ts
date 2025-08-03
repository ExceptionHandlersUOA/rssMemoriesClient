export async function login(credentials: {
  username: string
  password: string
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    )

    console.log("Login response:", response)

    if (!response.ok) {
      throw new Error("Login failed")
    }

    return {
      status: "success",
      message: "Login successful",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Login error: ${error.message}`)
    }

    throw new Error("An unexpected error occurred during login")
  }
}
