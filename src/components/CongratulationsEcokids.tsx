import { Link } from 'react-router-dom';

export const CongratulationsEcokids = (player: string, score: number, time: number) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50">
      <div className="p-10 bg-green-900 text-green-100 border border-green-500 rounded-2xl space-y-4 shadow-lg text-center">
        <h2 className="text-4xl font-bold mb-2">Parabéns {player}!</h2>
        <p className="text-xl">Você fez {score} pontos!</p>
        <p className="text-xl">Tempo: {time} segundos</p>

        <Link to="/score-ecokids">
          <button className="mt-4 px-6 py-4 text-xl bg-green-700 text-white rounded cursor-pointer transition-all hover:bg-green-600">
            Ir para pontuação
          </button>
        </Link>
      </div>
    </div>
  );
};
