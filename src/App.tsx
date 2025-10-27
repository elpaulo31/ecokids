import './styles/app.postcss';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { EcokidsGame } from './pages/EcokidsGame';
import { Home } from './pages/Home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ecokids-game" element={<EcokidsGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
