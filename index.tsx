import React, { Component, ReactNode, ErrorInfo } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-50 text-center p-4 font-sans">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-emerald-100">
            <h1 className="text-2xl font-bold text-emerald-950 mb-2 font-serif">Ops! Algo deu errado.</h1>
            <p className="text-slate-600 mb-6 text-sm">
              Isso geralmente acontece devido a extensões do navegador ou cache antigo.
            </p>
            <button 
              onClick={() => {
                // Tenta limpar cache básico e recarregar
                if(window.localStorage) window.localStorage.clear();
                if(window.sessionStorage) window.sessionStorage.clear();
                window.location.reload();
              }}
              className="w-full bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 font-bold uppercase tracking-wide transition-colors shadow-lg"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);