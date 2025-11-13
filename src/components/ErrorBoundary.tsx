import React from 'react';

type Props = { children: React.ReactNode };

export class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown): void {
    // Keep this minimal; could integrate Sentry/logging later
    // Log to console in development
    console.error('ErrorBoundary caught', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-lg text-center">
            <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
            <p className="text-sm text-muted">
              We're sorry — the component failed to load. Try refreshing the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
