import { FinishIcon } from '../assets/images/icons/FinishIcon';
import { ScoreIcon } from '../assets/images/icons/ScoreIcon';
import { TimerIcon } from '../assets/images/icons/TimerIcon';

export const Achievements = () => {
  const achievements = [
    {
      icon: <ScoreIcon width={70} height={70} color="#16a34a" />,
      title: 'Reciclador Nota 100!',
      description: 'Coloque corretamente todos os itens nas suas lixeiras correspondentes.',
    },
    {
      icon: <TimerIcon width={70} height={70} color="#2563eb" />,
      title: 'Velocista Sustentável!',
      description: 'Complete o jogo em menos de 1 minuto e mostre que você é rápido e eficiente!',
    },
    {
      icon: <FinishIcon width={70} height={70} color="#facc15" />,
      title: 'Campeão da Reciclagem!',
      description: 'Finalize o jogo sem cometer nenhum erro. Um verdadeiro herói do meio ambiente!',
    },
  ];

  return (
    <main className="flex flex-col p-10">
      <h1 className="text-[var(--color-brand-darkest)] text-3xl md:text-4xl font-bold mb-3 md:mb-10 dark:text-[var(--color-brand-light)]">
        Conquistas
      </h1>

      <section className="w-full max-w-3xl flex flex-col gap-6">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center md:text-left gap-6 md:gap-8 p-6 border border-[var(--color-gray-light)] rounded-2xl bg-white shadow-md hover:shadow-lg transition-all md:flex-row duration-300 hover:scale-[1.02]"
          >
            <div className="flex-shrink-0">{achievement.icon}</div>

            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-bold text-[var(--color-brand-darkest)] mb-2">
                {achievement.title}
              </h2>
              <p className="text-[var(--color-gray-dark)] leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};
