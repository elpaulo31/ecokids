import './styles/app.postcss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { EcokidsGame } from './pages/EcokidsGame';
import { Home } from './pages/Home';
import { ScoreEcokids } from './pages/ScoreEcokids';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ecokids-game" element={<EcokidsGame />} />
          <Route path="/score-ecokids" element={<ScoreEcokids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
