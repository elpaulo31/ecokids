import './styles/app.postcss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { EcokidsGame } from './pages/EcokidsGame';
import { Home } from './pages/Home';
import { ScoreEcokids } from './pages/ScoreEcokids';
import { AprenderEcokids } from './pages/AprenderEcokids';
import { Conquistas } from './pages/Conquistas';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ecokids-game" element={<EcokidsGame />} />
          <Route path="/aprender-ecokids" element={<AprenderEcokids />} />
          <Route path="/score-ecokids" element={<ScoreEcokids />} />
          <Route path="/conquistas" element={<Conquistas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
