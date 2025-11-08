import { useState } from 'react';

import { TrashIcon } from './../assets/images/icons/TrashIcon';
import RecyclingIcon from './../assets/images/icons/RecyclingIcon.png';

import { SelectGameModal } from './../components/SelectGameModal';
import { Toast } from './../components/Toast';
import { Link } from 'react-router';

export const Home = () => {
  document.title = 'EcoKids - Seja um pequeno herói!';

  const [toast, setShowToast] = useState<{
    show: boolean;
    typeToast?: 'success' | 'info' | 'error' | undefined;
    message?: string | undefined;
  }>({
    show: false,
    typeToast: undefined,
    message: undefined,
  });
  const [showModal, setShowModal] = useState(false);
  const [gameInfo, setGameInfo] = useState<{
    playerName?: string;
    selectedGame?: string;
  }>({
    playerName: undefined,
    selectedGame: undefined,
  });

  const trashTypes = ['#0000FF', '#FF0000', '#008000', '#FFFF00', '#8B4513'];

  return (
    <main className="h-full w-full px-10 pt-12 flex justify-center relative bg-[var(--color-accent-light)] dark:bg-[var(--color-brand-dark)] transition-colors duration-500 md:pt-0">
      <section className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-14">
          <button
            className="relative inline-block transition-all hover:scale-105 hover:cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <img src={RecyclingIcon} alt="Ícone de Reciclagem" className="block h-32 mx-auto" />

            <p className="absolute inset-0 flex items-center justify-center font-medium px-2 py-1 rounded text-[var(--color-brand-dark)] dark:text-[var(--color-brand-light)] text-5xl">
              Jogar
            </p>
          </button>

          <div className="flex flex-col gap-6 mx-auto">
            <Link
              to="/aprender-ecokids"
              className="bg-[var(--color-brand)] text-[var(--color-accent-light)] py-3 px-12 rounded-xl w-46 text-center text-xl transition-all hover:bg-[var(--color-brand)]/80 hover:scale-103"
            >
              Aprender
            </Link>
            <Link
              to="/conquistas"
              className="bg-[var(--color-brand)] text-[var(--color-accent-light)] py-3 px-12 rounded-xl w-46 text-center text-xl transition-all hover:bg-[var(--color-brand)]/80 hover:scale-103"
            >
              Conquistas
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <p className="text-[var(--color-brand-darkest)] dark:text-[var(--color-brand-light)] text-2xl">
            Seja um pequeno herói!
          </p>

          <div>
            {trashTypes.map((color, index) => (
              <TrashIcon
                key={index}
                svgClass="inline-block mx-2 cursor-pointer hover:scale-110 transition-transform"
                color={`${color}`}
              />
            ))}
          </div>
        </div>
      </section>

      <SelectGameModal
        showModal={showModal}
        setShowModal={setShowModal}
        gameInfo={gameInfo}
        setGameInfo={setGameInfo}
        setShowToast={setShowToast}
      />
      {toast.show &&
        toast.typeToast &&
        toast.message &&
        Toast(
          toast.typeToast,
          toast.message,
          setShowToast && ((show) => setShowToast({ ...toast, show })),
        )}
    </main>
  );
};
