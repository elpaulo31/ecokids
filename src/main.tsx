import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/app.postcss';
import { PlayerProvider } from './contexts/PlayerContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>,
);
