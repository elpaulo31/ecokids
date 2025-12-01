import { FinishIcon } from '../assets/images/icons/FinishIcon';
import { ScoreIcon } from '../assets/images/icons/ScoreIcon';
import { TimerIcon } from '../assets/images/icons/TimerIcon';
import { useEffect, useState } from 'react';

interface PlayerRanking {
  name: string;
  points: number;
  achievements: string[];
}

export const ScoreEcokids = () => {
  const [rankingData, setRankingData] = useState<PlayerRanking[] | null>(null);

  useEffect(() => {
    async function getRanking() {
      const token = import.meta.env.VITE_MY_SERVICE_TOKEN;

      const reqRanking = await fetch(
        'https://eco-kids-backend.onrender.com/players/ranking',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-service-key': token,
          },
        }
      );

      const resRanking = await reqRanking.json();
      setRankingData(resRanking);
    }

    getRanking();
  }, []);

  return (
    <main className="flex flex-col p-6 sm:px-10 sm:py-3 transition-colors duration-500 bg-transparent">

      <h1 className="text-[var(--color-brand-darkest)] text-3xl md:text-4xl font-bold mb-6 dark:text-[var(--color-accent-light)]">
        Pontuação
      </h1>

      <section
        className="w-full bg-white/70 border border-[var(--color-brand)] rounded-xl shadow-sm p-6 md:p-8
        dark:bg-[var(--color-brand-darkest)] dark:border-[var(--color-brand)]/40 
        dark:shadow-[inset_0_0_8px_rgba(0,164,19,0.4)] transition-colors duration-500"
      >

        {/* Cabeçalhos (apenas desktop) */}
        <div className="hidden md:grid md:grid-cols-[30%_20%_1fr] items-center mb-4 pb-2 border-b border-[var(--color-brand)]/30">
          <h2 className="text-lg font-semibold text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)]">
            Jogador
          </h2>
          <h2 className="text-lg font-semibold text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)]">
            Pontos
          </h2>
          <h2 className="text-lg font-semibold text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)]">
            Conquistas
          </h2>
        </div>

        <ul className="flex flex-col gap-6">

          {rankingData ? (
            rankingData.map((player, index) => (
              <li
                key={index}
                className="grid grid-cols-1 md:grid-cols-[29%_21%_1fr] items-center gap-3 
                  p-4 rounded-lg border border-[var(--color-brand)]/20 dark:border-[var(--color-accent)]/20
                  bg-white/40 dark:bg-[var(--color-brand-dark)]/40 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] font-medium">
                  {(index === 0 || index === 1 || index === 2) && (
                    <span
                      className={
                        index === 0
                          ? 'text-yellow-500'
                          : index === 1
                          ? 'text-gray-400'
                          : 'text-amber-700'
                      }
                    >
                      {index + 1}.
                    </span>
                  )}
                  <span className="w-10/12 truncate">{player.name}</span>
                </div>

                {/* Pontos */}
                <div className="text-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] font-medium">
                  {player.points} pontos
                </div>

                {/* Conquistas */}
                <div className="flex flex-wrap items-center gap-3">
                  {player.achievements.length > 0 ? (
                    player.achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-[var(--color-accent-light)] border border-[var(--color-brand)] rounded-full px-3 py-1 text-[var(--color-brand-darkest)] text-sm font-medium shadow-sm dark:border-[var(--color-accent)]/40 dark:shadow-none"
                      >
                        {achievement === 'Reciclador Nota 100!' && (
                          <>
                            <ScoreIcon width={22} height={22} color="#16a34a" />
                            Reciclador Nota 100!
                          </>
                        )}

                        {achievement === 'Velocista Sustentável!' && (
                          <>
                            <TimerIcon width={22} height={22} color="#2563eb" />
                            Velocista Sustentável!
                          </>
                        )}

                        {achievement === 'Campeão da Reciclagem!' && (
                          <>
                            <FinishIcon width={22} height={22} color="#facc15" />
                            Campeão da Reciclagem!
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm italic text-[var(--color-brand-dark)] dark:text-[var(--color-accent-light)]">
                      Nenhuma conquista
                    </p>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>Carregando...</p>
          )}

        </ul>

      </section>
    </main>
  );
};



