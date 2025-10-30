import { useEffect, useState } from 'react';
import { TrashIcon } from '../assets/images/icons/TrashIcon';
import { ScoreIcon } from '../assets/images/icons/ScoreIcon';
import { TimerIcon } from '../assets/images/icons/TimerIcon';
import { FinishIcon } from '../assets/images/icons/FinishIcon';
import { CongratulationsEcokids } from '../components/CongratulationsEcokids';
import { usePlayerContext } from '../contexts/PlayerContext';

export const EcokidsGame = () => {
  const trashTypes = [
    { color: '#0000FF', tipo: 'papel' },
    { color: '#FF0000', tipo: 'plástico' },
    { color: '#008000', tipo: 'vidro' },
    { color: '#FFFF00', tipo: 'metal' },
    { color: '#8B4513', tipo: 'orgânico' },
  ];

  const initialEmojis = [
    { emoji: '🍞', tipo: 'orgânico' },
    { emoji: '🧴', tipo: 'plástico' },
    { emoji: '🍎', tipo: 'orgânico' },
    { emoji: '🍷', tipo: 'vidro' },
    { emoji: '🍌', tipo: 'orgânico' },
    { emoji: '🍶', tipo: 'vidro' },
    { emoji: '🥩', tipo: 'orgânico' },
    { emoji: '🍕', tipo: 'orgânico' },
    { emoji: '🥫', tipo: 'metal' },
    { emoji: '🛢️', tipo: 'metal' },
    { emoji: '🥄', tipo: 'metal' },
    { emoji: '🥤', tipo: 'plástico' },
    { emoji: '🧃', tipo: 'plástico' },
    { emoji: '🧂', tipo: 'orgânico' },
    { emoji: '📰', tipo: 'papel' },
    { emoji: '🍼', tipo: 'plástico' },
    { emoji: '📦', tipo: 'papel' },
    { emoji: '📃', tipo: 'papel' },
    { emoji: '🥛', tipo: 'vidro' }
  ];

  const { data, setData } = usePlayerContext();

  const [trashEmojis, setTrashEmojis] = useState(initialEmojis);
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string; tipo: string } | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const achievements = [
    {
      icon: <ScoreIcon width={70} height={70} color="#16a34a" />,
      title: 'Reciclador Nota 100!',
      description: 'Coloque corretamente todos os itens nas suas lixeiras correspondentes.',
      check: (score: number) => score === initialEmojis.length,
    },
    {
      icon: <TimerIcon width={70} height={70} color="#2563eb" />,
      title: 'Velocista Sustentável!',
      description: 'Complete o jogo em menos de 1 minuto e mostre que você é rápido e eficiente!',
      check: (_: number, time: number) => time < 60,
    },
    {
      icon: <FinishIcon width={70} height={70} color="#facc15" />,
      title: 'Campeão da Reciclagem!',
      description: 'Finalize o jogo sem cometer nenhum erro. Um verdadeiro herói do meio ambiente!',
      check: (_: number, __: number, errors: number) => errors === 0,
    },
  ];

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (trashEmojis.length === 0 && startTime) {
      const end = Date.now();
      const timeSeconds = (end - startTime) / 1000;

      const normalized = Math.max(40, 100 - ((timeSeconds - 30) / 120) * 100);
      const final = Math.min(100, Math.round(normalized));
      setFinalScore(final);

      const unlocked = achievements.filter((a) => a.check(score, timeSeconds, errors));

      setData({
        ...data,
        score: final,
        achievements: unlocked.map((a) => a.title),
      });
    }
  }, [trashEmojis]);

  const handleTrashClick = (trashTipo: string) => {
    if (selectedEmoji) {
      if (selectedEmoji.tipo === trashTipo) {
        setTrashEmojis((prev) => prev.filter((e) => e.emoji !== selectedEmoji.emoji));
        setScore((prev) => prev + 1);
      } else {
        setErrors((prev) => prev + 1);
      }
      setSelectedEmoji(null);
    }
  };

  return (
    <main className="px-4 py-6 mx-auto flex flex-col items-center gap-8 bg-[var(--color-accent-light)] dark:bg-[var(--color-brand-dark)]">
      <h1 className="text-[var(--color-primary)] dark:text-[var(--color-accent-light)] text-lg sm:text-xl text-center">
        Ajude a colocar o lixo no lugar certo!
      </h1>

      <div className="text-lg font-bold px-4 py-2 rounded-xl shadow-md border-2 border-[var(--color-brand)] text-white bg-[var(--color-brand)] dark:bg-[var(--color-brand-darkest)] transition-colors duration-500">
        Acertos: {score}
      </div>

      <section className="h-[420px] max-h-[420px]">
        <div className="grid grid-cols-4 h-full lg:grid-cols-5 gap-2 sm:gap-3">
          {trashEmojis.map((item, index) => (
            <div
              key={index}
              className={`${
                selectedEmoji?.emoji === item.emoji
                  ? 'scale-120 bg-[var(--color-brand-darkest)] rounded-sm'
                  : ''
              } w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 m-1 rounded-lg flex items-center justify-center text-3xl sm:text-4xl cursor-pointer hover:scale-110 transition-transform`}
              onClick={() => setSelectedEmoji(item)}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-6 mt-3">
        {trashTypes.map((trash, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
            onClick={() => handleTrashClick(trash.tipo)}
          >
            <TrashIcon
              svgClass="inline-block w-8 h-8 sm:w-10 sm:h-10 mx-1 cursor-pointer hover:scale-110 transition-transform"
              color={trash.color}
            />
            <p className="text-lg">{trash.tipo}</p>
          </div>
        ))}
      </div>

      {trashEmojis.length === 0 &&
        finalScore !== null &&
        CongratulationsEcokids(
          data.playerName,
          data.score,
          Math.round((Date.now() - (startTime || 0)) / 1000),
        )}
    </main>
  );
};
