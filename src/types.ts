export interface Country {
  name: string;
  image: string;
  capital: string;
  hints: string[];
}

export interface GameState {
  score: number;
  currentRound: number;
  totalRounds: number;
  showHint: boolean;
  currentHintIndex: number;
  gameStatus: 'playing' | 'correct' | 'incorrect' | 'finished';
}