import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Root container missing in index.html');
}

createRoot(rootElement).render(<App />);
