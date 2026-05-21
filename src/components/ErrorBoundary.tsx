import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#030308] flex items-center justify-center p-6">
          <div className="glass-panel max-w-md w-full rounded-2xl p-8 text-center">
            <p className="text-red-400 text-sm font-medium mb-2">Something went wrong</p>
            <p className="text-white/50 text-xs mb-6 break-words">{this.state.error.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-premium px-6 py-3 rounded-xl text-sm font-semibold text-white"
            >
              Reload app
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
