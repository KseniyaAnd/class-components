import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1 style={{ display: 'flex', justifyContent: 'center' }}>Something went wrong...</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
