import { useState } from 'react';
import { TrashIcon } from '../assets/images/icons/TrashIcon';

export function EcokidsGame() {
  const trashTypes = [
    { color: '#8B4513', tipo: 'orgânico' },
    { color: '#DBB30F', tipo: 'plástico' },
    { color: '#0F86DB', tipo: 'papel' },
    { color: '#0FDB27', tipo: 'vidro' },
    { color: '#DB0F0F', tipo: 'rejeito' },
  ];

  const initialEmojis = [
    { emoji: '🍎', tipo: 'orgânico' },
    { emoji: '🍌', tipo: 'orgânico' },
    { emoji: '🥩', tipo: 'orgânico' },
    { emoji: '🍞', tipo: 'orgânico' },
    { emoji: '🥫', tipo: 'metal' },
    { emoji: '🛢️', tipo: 'metal' },
    { emoji: '🥤', tipo: 'plástico' },
    { emoji: '🍼', tipo: 'plástico' },
    { emoji: '🧴', tipo: 'plástico' },
    { emoji: '📰', tipo: 'papel' },
    { emoji: '📦', tipo: 'papel' },
    { emoji: '📃', tipo: 'papel' },
    { emoji: '🍶', tipo: 'vidro' },
    { emoji: '🍷', tipo: 'vidro' },
    { emoji: '🧂', tipo: 'orgânico' },
    { emoji: '🍕', tipo: 'orgânico' },
    { emoji: '🥛', tipo: 'vidro' },
    { emoji: '🧃', tipo: 'plástico' },
    { emoji: '🧻', tipo: 'rejeito' },
    { emoji: '🥄', tipo: 'rejeito' },
  ];

  const [trashEmojis, setTrashEmojis] = useState(initialEmojis);
  const [selectedEmoji, setSelectedEmoji] = useState<{ emoji: string; tipo: string } | null>(null);
  const [score, setScore] = useState(0);

  const handleTrashClick = (trashTipo: string) => {
    if (selectedEmoji) {
      if (selectedEmoji.tipo === trashTipo) {
        setTrashEmojis(trashEmojis.filter((e) => e.emoji !== selectedEmoji.emoji));
        setScore(score + 1);
      }
      setSelectedEmoji(null);
    }
  };

  return (
    <div className="px-4 py-6 mx-auto flex flex-col items-center gap-10">
      <h1 className="text-[var(--color-primary)] dark:text-[var(--color-accent-light)] text-lg sm:text-xl text-center">
        Ajude a colocar o lixo no lugar certo!
      </h1>

      <div className="text-lg font-bold px-4 py-2 rounded-xl shadow-md border-2 border-[var(--color-brand)] text-white bg-[var(--color-brand)] dark:bg-[var(--color-brand-darkest)] dark:text-[var(--color-accent-light)] transition-colors duration-500">
        Pontuação: {score}
      </div>

      <section>
        <div className="grid grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
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

      <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-3">
        {trashTypes.map((trash, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => handleTrashClick(trash.tipo)}
          >
            <TrashIcon
              svgClass="inline-block w-8 h-8 sm:w-10 sm:h-10 mx-1 cursor-pointer hover:scale-110 transition-transform"
              color={trash.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
