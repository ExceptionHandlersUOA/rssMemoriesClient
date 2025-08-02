export const addFileClient = async (file: File | Blob) => {
  try {
    const formData = new FormData()

    formData.append("file", file)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file`,
      {
        method: "POST",
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to add file: ${response.status} ${response.statusText}`
      )
    }

    return {
      success: true,
      message: "File added successfully",
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to add file: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while adding file")
  }
}
