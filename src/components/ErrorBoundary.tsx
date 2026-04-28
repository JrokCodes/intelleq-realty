import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    if (error.message?.includes('dynamically imported module') || error.message?.includes('Failed to fetch')) {
      const reloaded = sessionStorage.getItem('auto-reload-chunk');
      if (!reloaded) {
        sessionStorage.setItem('auto-reload-chunk', '1');
        window.location.reload();
        return;
      }
      sessionStorage.removeItem('auto-reload-chunk');
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg p-8">
          <div className="bg-white rounded-xl border border-border p-8 max-w-md w-full text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} className="text-red-600" />
            </div>
            <h1 className="text-xl font-bold text-text-primary mb-2">Something went wrong</h1>
            <p className="text-sm text-text-muted mb-4">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className="text-xs text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-left overflow-auto max-h-40">
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack?.split('\n').slice(0, 5).join('\n')}
              </pre>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
