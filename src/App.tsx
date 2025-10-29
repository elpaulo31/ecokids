import './styles/app.postcss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { EcokidsGame } from './pages/EcokidsGame';
import { Home } from './pages/Home';
import { ScoreEcokids } from './pages/ScoreEcokids';
import { LearnEcokids } from './pages/LearnEcokids';
import { Achievements } from './pages/Achievements';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jogo-ecokids" element={<EcokidsGame />} />
          <Route path="/aprender-ecokids" element={<LearnEcokids />} />
          <Route path="/pontuacao-ecokids" element={<ScoreEcokids />} />
          <Route path="/conquistas" element={<Achievements />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
