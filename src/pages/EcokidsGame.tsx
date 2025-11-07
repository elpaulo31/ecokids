import { useEffect, useState, useRef } from 'react';
import { TrashIcon } from '../assets/images/icons/TrashIcon';
import { ScoreIcon } from '../assets/images/icons/ScoreIcon';
import { TimerIcon } from '../assets/images/icons/TimerIcon';
import { FinishIcon } from '../assets/images/icons/FinishIcon';
import { CongratulationsEcokids } from '../components/CongratulationsEcokids';
import { TurnOffSound } from '../assets/images/icons/TurnOffSound';
import { TurnOnSound } from '../assets/images/icons/TurnOnSound';
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
    { emoji: '🍞', tipo: 'orgânico' }, { emoji: '🧴', tipo: 'plástico' },
    { emoji: '🍎', tipo: 'orgânico' }, { emoji: '🍷', tipo: 'vidro' },
    { emoji: '🍌', tipo: 'orgânico' }, { emoji: '🍶', tipo: 'vidro' },
    { emoji: '🥩', tipo: 'orgânico' }, { emoji: '🍕', tipo: 'orgânico' },
    { emoji: '🥫', tipo: 'metal' }, { emoji: '🛢️', tipo: 'metal' },
    { emoji: '🥄', tipo: 'metal' }, { emoji: '🥤', tipo: 'plástico' },
    { emoji: '🧃', tipo: 'plástico' }, { emoji: '🧂', tipo: 'orgânico' },
    { emoji: '📰', tipo: 'papel' }, { emoji: '🍼', tipo: 'plástico' },
    { emoji: '📦', tipo: 'papel' }, { emoji: '📃', tipo: 'papel' },
    { emoji: '🥛', tipo: 'vidro' }, { emoji: '📚', tipo: 'papel' },
  ];

  const { data, setData } = usePlayerContext();
  const [trashEmojis, setTrashEmojis] = useState(initialEmojis);
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string; tipo: string } | null>(null);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [scoreEffects, setScoreEffects] = useState<{ id: number; x: number; y: number }[]>([]);

  const audioRef = useRef<HTMLAudioElement>(null);
  const hitSoundRef = useRef<HTMLAudioElement>(null);

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
      description: 'Finalize o jogo sem cometer nenhum erro.',
      check: (_: number, __: number, errors: number) => errors === 0,
    },
  ];

  const shuffleArray = (array: any[]) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  useEffect(() => {
    setTrashEmojis(shuffleArray(initialEmojis));
  }, []);

  useEffect(() => {
    if (gameOver) return;
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  useEffect(() => {
    if (trashEmojis.length === 0 && !gameOver) handleGameOver();
  }, [trashEmojis]);

  useEffect(() => {
    if (hitSoundRef.current) hitSoundRef.current.volume = 0.5;
  }, []);

  const handleGameOver = () => {
    setGameOver(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const total = initialEmojis.length;
    const accuracy = score / total;
    const timeBonus = timeLeft / 60;
    const penalty = errors * 3;
    const rawScore = Math.round((accuracy * 100 + timeBonus * 20) - penalty);
    const final = Math.max(0, Math.min(100, rawScore));

    setFinalScore(final);

    const unlocked = achievements.filter((a) => a.check(score, 60 - timeLeft, errors));
    setData({
      ...data,
      score: final,
      achievements: unlocked.map((a) => a.title),
    });
  };

  const handleTrashClick = (trashTipo: string, e?: React.MouseEvent) => {
    if (selectedEmoji && !gameOver) {
      if (selectedEmoji.tipo === trashTipo) {
        setTrashEmojis((prev) => prev.filter((em) => em.emoji !== selectedEmoji.emoji));
        setScore((prev) => prev + 1);

        if (isSoundOn && hitSoundRef.current) {
          hitSoundRef.current.currentTime = 0;
          hitSoundRef.current.play();
        }

        if (e) {
          const rect = (e.target as HTMLElement).getBoundingClientRect();
          const id = Date.now();
          setScoreEffects((prev) => [...prev, { id, x: rect.x + rect.width / 2, y: rect.y }]);
          setTimeout(() => setScoreEffects((prev) => prev.filter((fx) => fx.id !== id)), 1000);
        }
      } else {
        setErrors((prev) => prev + 1);
      }
      setSelectedEmoji(null);
    }
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isSoundOn) audio.pause();
    else audio.play();
    setIsSoundOn(!isSoundOn);
  };

  return (
    <main className="relative px-4 py-6 mx-auto flex flex-col items-center space-y-5 gap-6 bg-[var(--color-accent-light)] dark:bg-[var(--color-brand-dark)]">
      <audio ref={audioRef} src="/background-music.mp3" autoPlay loop></audio>
      <audio ref={hitSoundRef} src="/accuracy.mp3"></audio>

      <button
        onClick={toggleSound}
        className="absolute top-4 cursor-pointer right-4 p-2 rounded-full bg-white/70 dark:bg-black/40 shadow-md hover:scale-110 transition-transform"
      >
        {isSoundOn ? (
          <TurnOnSound svgClass="w-8 h-8" color="#16a34a" />
        ) : (
          <TurnOffSound svgClass="w-8 h-8" color="#ef4444" />
        )}
      </button>

      <h1 className="text-[var(--color-primary)] dark:text-[var(--color-accent-light)] text-lg sm:text-xl text-center font-semibold">
        Ajude a colocar o lixo no lugar certo!
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-6">
        <div className="text-lg font-bold px-4 py-2 rounded-xl shadow-md border-2 border-[var(--color-brand)] text-white bg-[var(--color-brand)] dark:bg-[var(--color-brand-darkest)]">
          Acertos: {score}
        </div>
        <div className="text-lg font-bold px-4 py-2 rounded-xl shadow-md border-2 border-blue-600 text-white bg-blue-600 dark:bg-blue-800 flex items-center gap-2">
          Tempo: {timeLeft}s
        </div>
      </div>

      <section className="h-[420px] max-h-[420px]">
        <div className="grid grid-cols-4 h-full lg:grid-cols-5 gap-2 sm:gap-3">
          {trashEmojis.map((item, index) => (
            <div
              key={index}
              className={`${
                selectedEmoji?.emoji === item.emoji
                  ? 'scale-110 bg-[var(--color-brand-darkest)] rounded-md'
                  : ''
              } w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 m-1 rounded-lg flex items-center justify-center text-3xl sm:text-4xl cursor-pointer hover:scale-110 transition-transform`}
              onClick={() => setSelectedEmoji(item)}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-3">
        {trashTypes.map((trash, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-1"
            onClick={(e) => handleTrashClick(trash.tipo, e)}
          >
            <TrashIcon
              svgClass="inline-block w-8 h-8 sm:w-10 sm:h-10 mx-1 cursor-pointer hover:scale-110 transition-transform"
              color={trash.color}
            />
            <p className="text-lg">{trash.tipo}</p>
          </div>
        ))}
      </div>

      {scoreEffects.map((fx) => (
        <span
          key={fx.id}
          className="absolute z-50 text-green-500 font-bold text-5xl animate-float-up pointer-events-none"
          style={{
            left: fx.x,
            top: fx.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          +1
        </span>
      ))}

      {gameOver && finalScore !== null && (
        <CongratulationsEcokids player={data.playerName} score={data.score} />
      )}
    </main>
  );
};







