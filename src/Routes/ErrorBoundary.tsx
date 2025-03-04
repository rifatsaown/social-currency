import React from "react";

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error: Error, info: React.ErrorInfo) {
      console.error("ErrorBoundary caught an error:", error, info);
    }
  
    render() {
      if (this.state.hasError) {
        // // force a reload of the page
        window.location.reload();
        // return <div>Something went wrong. Please refresh the page.</div>;
      }
      return this.props.children;
    }
  }


export default ErrorBoundary;