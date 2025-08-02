import { Component, type ReactNode } from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error) => void
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    console.error("Error boundary caught error:", error)
    this.props.onError?.(error)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="py-12 text-center">
          <h3 className="text-destructive mb-2 text-lg font-semibold">
            Something went wrong
          </h3>
          <p className="text-muted-foreground">
            {this.state.error instanceof Error
              ? this.state.error.message
              : "An unexpected error occurred"}
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
