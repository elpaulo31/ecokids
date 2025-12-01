import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlayerContext } from '../contexts/PlayerContext';

interface CongratulationsEcokidsProps {
  player: string;
  score: number;
}

export const CongratulationsEcokids = ({ player, score }: CongratulationsEcokidsProps) => {
  const { data } = usePlayerContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = import.meta.env.VITE_MY_SERVICE_TOKEN;

    const savePlayerData = async () => {
      setLoading(true);

      await fetch('https://eco-kids-backend.onrender.com/players/save-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-service-key': token,
        },
        body: JSON.stringify({
          playerId: data.id,
          points: data.score,
          achievements: data.achievements,
        }),
      });

      setLoading(false);
    };

    savePlayerData();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50">
      <div className="p-10 bg-green-900 text-green-100 border border-green-500 rounded-2xl space-y-4 shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-2">Parabéns {player}!</h2>
        <p className="text-xl">Você fez {score} pontos!</p>

        <Link to="/pontuacao-ecokids">
          <button className="mt-4 px-6 py-4 text-xl bg-green-700 text-white rounded cursor-pointer transition-all hover:bg-green-600">
            {loading ? 'Carregando...' : 'Ir para pontuação'}
          </button>
        </Link>
      </div>
    </div>
  );
};
