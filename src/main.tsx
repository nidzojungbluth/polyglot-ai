import { StrictMode, Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="loading">
        <h1>Hoppla, da ist etwas schiefgelaufen.</h1>
        <p>Dein Lernfortschritt ist gespeichert. Lade die Seite neu.</p>
        <p className="small muted">{this.state.err.message}</p>
        <button className="btn primary" onClick={() => location.reload()}>Neu laden</button>
      </div>
    );
  }
}

createRoot(document.getElementById('root')!).render(<StrictMode><ErrorBoundary><App /></ErrorBoundary></StrictMode>);
