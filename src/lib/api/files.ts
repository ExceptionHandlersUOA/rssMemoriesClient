export const addFileClient = async ({
  file,
  filename,
}: {
  file: File | Blob
  filename: string
}) => {
  try {
    const formData = new FormData()

    formData.append("file", file, filename)

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

export const getFileClient = async (filename: string): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/file/${filename}`,
      {
        method: "GET",
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to fetch file: ${response.status} ${response.statusText}`
      )
    }

    const blob = await response.blob()

    if (!blob) {
      throw new Error("No file data received")
    }

    const fileUrl = URL.createObjectURL(blob)

    return fileUrl
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch file: ${error.message}`)
    }

    throw new Error("An unexpected error occurred while fetching file")
  }
}
