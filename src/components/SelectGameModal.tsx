import SelectGame from './../assets/images/general/selectGame.png';
import { usePlayerContext } from '../contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';

interface SelectGameModalProps {
  showModal: boolean;
  gameInfo: {
    playerName?: string;
    selectedGame?: string;
  };
  setGameInfo: (info: { playerName?: string; selectedGame?: string }) => void;
  setShowModal: (show: boolean) => void;
  setShowToast?: (toast: {
    show: boolean;
    typeToast?: 'success' | 'info' | 'error';
    message?: string;
  }) => void;
}

export const SelectGameModal = ({
  showModal,
  setShowModal,
  gameInfo,
  setGameInfo,
  setShowToast,
}: SelectGameModalProps) => {
  if (!showModal) return null;

  const navigate = useNavigate();
  const { data, setData } = usePlayerContext();

  return (
    <div
      className="fixed inset-0 flex items-center justify-center 
                 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative bg-[var(--color-brand)] w-80 py-10 px-8 rounded-2xl 
                   flex flex-col items-center gap-6 shadow-lg text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-center">Escolha seu jogo</h2>

        <button
          type="button"
          className={`${gameInfo.selectedGame === 'separe-o-lixo' ? 'bg-white/20' : ''} flex flex-col items-center gap-2 
                     bg-white/10 hover:bg-white/20 transition-all py-4 px-8 rounded-xl 
                     text-white hover:cursor-pointer w-full`}
          onClick={() => setGameInfo({ ...gameInfo, selectedGame: 'separe-o-lixo' })}
        >
          <img src={SelectGame} alt="Jogo Separe o Lixo" className="w-24 h-24 object-contain" />
          <span className="font-medium">Separe o Lixo</span>
        </button>

        <div className="w-full flex flex-col items-start gap-2 mt-2">
          <label htmlFor="playerName" className="text-sm font-medium">
            Digite seu nome
          </label>

          <input
            id="playerName"
            type="text"
            placeholder="Nome do jogador"
            className="w-full bg-white/10 text-white placeholder-gray-200
                       border border-white/20 rounded-md p-2 focus:outline-none
                       focus:ring-2 focus:ring-white/40 transition-all"
            onBlur={(e) => {
              const value = e.target.value;
              setGameInfo({ ...gameInfo, playerName: value });
              setData({ ...data, playerName: value });
            }}
          />

          <button
            className="bg-[var(--color-accent-light)] text-[var(--color-brand)] cursor-pointer py-2 px-6 rounded-xl w-full text-center text-lg font-medium transition-all hover:scale-103 mt-4"
            onClick={async () => {
              const token = import.meta.env.VITE_MY_SERVICE_TOKEN;

              if (gameInfo.playerName && gameInfo.selectedGame) {
                const reqSavePlayer = await fetch('https://eco-kids-backend.onrender.com/players/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'x-service-key': token,
                  },
                  body: JSON.stringify({
                    name: data.playerName,
                  }),
                });

                if (!reqSavePlayer.ok) {
                  setShowToast?.({
                    show: true,
                    typeToast: 'error',
                    message: 'Este nome já está em uso. Por favor, escolha outro.',
                  });
                  return;
                }

                const newPlayer = await reqSavePlayer.json();
                setData({ ...data, id: newPlayer.id });

                setShowModal(false);
                navigate('/jogo-ecokids');
              } else {
                setShowToast?.({
                  show: true,
                  typeToast: 'error',
                  message: 'Por favor, preencha seu nome e selecione um jogo.',
                });
              }
            }}
          >
            Iniciar Jogo
          </button>
        </div>

        <button
          type="button"
          aria-label="Fechar"
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-5 text-2xl font-bold 
                     text-white hover:text-gray-200 hover:cursor-pointer transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
};
