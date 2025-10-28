import { usePlayerContext } from '../contexts/PlayerContext';

export function ScoreEcokids() {
  const { data } = usePlayerContext();

  return (
    <main className="p-10">
      <h1>Pontuação</h1>
      <p>Jogador: {data.playerName}</p>
      <p>Pontuação: {data.score}</p>
    </main>
  );
}
