import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <h2 style={styles.title}>⚠️ Something went wrong</h2>
          <p style={styles.message}>{this.state.error?.message}</p>
          <button
            style={styles.btn}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const styles = {
  container: {
    padding: '40px 32px',
    textAlign: 'center',
  },
  title: {
    color: '#d93025',
    fontSize: '1.5rem',
    marginBottom: '16px',
  },
  message: {
    color: '#555',
    marginBottom: '24px',
  },
  btn: {
    padding: '10px 24px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  }
};

export default ErrorBoundary;