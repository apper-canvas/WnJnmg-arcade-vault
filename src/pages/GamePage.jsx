import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PacmanGame from '../games/pacman/PacmanGame';

// This component serves as a wrapper for all games
// It loads the appropriate game based on the URL parameter
const GamePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  // Games registry - add new games here as they are implemented
  const games = {
    pacman: {
      component: PacmanGame,
      title: 'Pac-Man',
      description: 'Navigate through the maze, eat all the dots while avoiding ghosts!'
    }
    // Add more games here as they are implemented
    // tetris: { component: TetrisGame, title: 'Tetris', description: '...' }
  };

  // Check if the requested game exists
  useEffect(() => {
    if (!games[gameId]) {
      navigate('/not-found', { replace: true });
    }
  }, [gameId, navigate]);

  if (!games[gameId]) {
    return null; // Will redirect to NotFound
  }

  const GameComponent = games[gameId].component;
  const { title, description } = games[gameId];

  return (
    <div className="game-container">
      <div className="mb-6">
        <h1 className="text-3xl font-pixel text-primary mb-2">{title}</h1>
        <p className="text-surface-600 dark:text-surface-300">{description}</p>
      </div>
      
      <div className="bg-surface-200 dark:bg-surface-800 rounded-xl shadow-lg p-4 md:p-6 mb-8">
        <GameComponent />
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate('/')}
          className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
};

export default GamePage;