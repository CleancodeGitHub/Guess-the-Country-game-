import React, { useState, useCallback } from 'react';
import { countries } from './data/countries';
import { GameCard } from './components/GameCard';
import { Trophy, RefreshCw } from 'lucide-react';
import type { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    currentRound: 0,
    totalRounds: countries.length,
    showHint: false,
    currentHintIndex: 0,
    gameStatus: 'playing',
  });

  const [guess, setGuess] = useState('');
  
  const currentCountry = countries[gameState.currentRound];

  const handleGuess = useCallback(() => {
    const isCorrect = guess.toLowerCase() === currentCountry.name.toLowerCase();
    
    setGameState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      gameStatus: isCorrect ? 'correct' : 'incorrect',
    }));
  }, [guess, currentCountry.name]);

  const nextRound = useCallback(() => {
    if (gameState.currentRound + 1 >= gameState.totalRounds) {
      setGameState(prev => ({ ...prev, gameStatus: 'finished' }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      gameStatus: 'playing',
      showHint: false,
      currentHintIndex: 0,
    }));
    setGuess('');
  }, [gameState.currentRound, gameState.totalRounds]);

  const showHint = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      showHint: true,
      currentHintIndex: prev.currentHintIndex + 1,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setGameState({
      score: 0,
      currentRound: 0,
      totalRounds: countries.length,
      showHint: false,
      currentHintIndex: 0,
      gameStatus: 'playing',
    });
    setGuess('');
  }, []);

  if (gameState.gameStatus === 'finished') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-xl mb-6">
            Final Score: {gameState.score} / {gameState.totalRounds}
          </p>
          <button
            onClick={restartGame}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
          >
            <RefreshCw size={20} />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        <div className="w-full text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            Score: {gameState.score} / {gameState.totalRounds}
          </p>
          <p className="text-gray-600">
            Round {gameState.currentRound + 1} of {gameState.totalRounds}
          </p>
        </div>

        <GameCard
          country={currentCountry}
          showHint={gameState.showHint}
          currentHintIndex={gameState.currentHintIndex}
          onShowHint={showHint}
        />

        <div className="w-full space-y-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter country name..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={gameState.gameStatus !== 'playing'}
          />

          {gameState.gameStatus === 'playing' ? (
            <button
              onClick={handleGuess}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Submit Guess
            </button>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${
                gameState.gameStatus === 'correct' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {gameState.gameStatus === 'correct' ? 'Correct!' : `Incorrect! The answer was ${currentCountry.name}`}
              </div>
              <button
                onClick={nextRound}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Next Country
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;