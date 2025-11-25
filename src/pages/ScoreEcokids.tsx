import { usePlayerContext } from '../contexts/PlayerContext';

import { FinishIcon } from '../assets/images/icons/FinishIcon';
import { ScoreIcon } from '../assets/images/icons/ScoreIcon';
import { TimerIcon } from '../assets/images/icons/TimerIcon';
import { useEffect } from 'react';

export const ScoreEcokids = () => {
  const { data } = usePlayerContext();

  useEffect(() => {
    async function getRanking() {
      const token = import.meta.env.VITE_MY_SERVICE_TOKEN;

      await fetch('https://eco-kids-backend.onrender.com/players/ranking', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-service-key': token,
        },
      });
    }

    getRanking();
  }, []);

  return (
    <main className="flex flex-col p-6 sm:px-10 sm:py-3 transition-colors duration-500 bg-transparent">
      <h1 className="text-[var(--color-brand-darkest)] text-3xl md:text-4xl font-bold mb-3 md:mb-10 dark:text-[var(--color-accent-light)]">
        Pontuação
      </h1>

      <section
        className="w-full grid grid-cols-1 md:grid-cols-[25%_25%_1fr] gap-6 
        bg-white/70 border border-[var(--color-brand)] rounded-xl shadow-sm p-8
        dark:bg-[var(--color-brand-darkest)] dark:border-[var(--color-brand)]/40 dark:shadow-[inset_0_0_8px_rgba(0,164,19,0.4)] 
        transition-colors duration-500"
      >
        <div className="flex flex-col">
          <h2 className="hidden md:block text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] text-xl font-semibold mb-2 border-b border-[var(--color-brand)]/40 dark:border-[var(--color-accent)]/30 pb-1">
            Nome do Jogador
          </h2>
          <p className="text-[var(--color-brand-dark)] dark:text-[var(--color-accent-light)] text-base mt-0 md:mt-3">
            {data.playerName}
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="hidden md:block text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] text-xl font-semibold mb-2 border-b border-[var(--color-brand)]/40 dark:border-[var(--color-accent)]/30 pb-1">
            Pontuação
          </h2>
          <p className="text-[var(--color-brand-dark)] dark:text-[var(--color-accent-light)] text-base mt-0 md:mt-3">
            {data.score} pontos
          </p>
        </div>

        <div className="flex flex-col">
          <h2 className="hidden md:block text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] text-xl font-semibold mb-2 border-b border-[var(--color-brand)]/40 dark:border-[var(--color-accent)]/30 pb-1">
            Conquistas
          </h2>

          {data.achievements && data.achievements.length > 0 ? (
            <div className="flex flex-wrap items-center gap-3 mt-0 md:mt-3">
              {data.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[var(--color-accent-light)] border border-[var(--color-brand)] rounded-full px-3 py-1 text-[var(--color-brand-darkest)] text-sm font-medium shadow-sm dark:border-[var(--color-accent)]/40 dark:shadow-none"
                >
                  {achievement === 'Reciclador Nota 100!' && (
                    <>
                      <ScoreIcon width={28} height={28} color="#16a34a" />
                      Reciclador Nota 100!
                    </>
                  )}
                  {achievement === 'Velocista Sustentável!' && (
                    <>
                      <TimerIcon width={28} height={28} color="#2563eb" />
                      Velocista Sustentável!
                    </>
                  )}
                  {achievement === 'Campeão da Reciclagem!' && (
                    <>
                      <FinishIcon width={28} height={28} color="#facc15" />
                      Campeão da Reciclagem!
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--color-brand-dark)] dark:text-[var(--color-accent-light)] text-sm italic mt-0 md:mt-3">
              Nenhuma conquista desbloqueada ainda.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};
