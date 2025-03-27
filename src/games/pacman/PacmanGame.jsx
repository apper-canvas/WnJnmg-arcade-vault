import { useState, useEffect, useRef } from 'react';
import { GRID_SIZE, CELL_SIZE, GAME_SPEED, DIRECTIONS, ENTITY_TYPE, LEVEL_1 } from './utils/gameConstants';
import { moveGhosts } from './utils/ghostAI';
import GameStatus from './components/GameStatus';
import GameControls from './components/GameControls';

const PacmanGame = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    running: false,
    gameOver: false,
    victory: false,
    score: 0,
    lives: 3,
    level: 1,
    dotsRemaining: 0,
    pacman: { x: 1, y: 1, direction: DIRECTIONS.RIGHT, nextDirection: DIRECTIONS.RIGHT },
    ghosts: [
      { x: 13, y: 11, direction: DIRECTIONS.LEFT, color: 'red', mode: 'chase', speed: 0.75 },
      { x: 14, y: 11, direction: DIRECTIONS.RIGHT, color: 'pink', mode: 'chase', speed: 0.65 },
      { x: 13, y: 12, direction: DIRECTIONS.UP, color: 'cyan', mode: 'chase', speed: 0.70 },
      { x: 14, y: 12, direction: DIRECTIONS.DOWN, color: 'orange', mode: 'chase', speed: 0.60 }
    ],
    grid: [],
    powerMode: { active: false, timeLeft: 0 }
  });

  // Initialize the game grid
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const grid = JSON.parse(JSON.stringify(LEVEL_1));
    let dotsCount = 0;
    
    // Count dots
    for (let y = 0; y < GRID_SIZE.height; y++) {
      for (let x = 0; x < GRID_SIZE.width; x++) {
        if (grid[y][x] === ENTITY_TYPE.DOT || grid[y][x] === ENTITY_TYPE.POWER_PELLET) {
          dotsCount++;
        }
      }
    }

    setGameState(prev => ({
      ...prev,
      grid,
      dotsRemaining: dotsCount,
      pacman: { x: 14, y: 23, direction: DIRECTIONS.RIGHT, nextDirection: DIRECTIONS.RIGHT },
      ghosts: [
        { x: 13, y: 11, direction: DIRECTIONS.LEFT, color: 'red', mode: 'chase', speed: 0.75 },
        { x: 14, y: 11, direction: DIRECTIONS.RIGHT, color: 'pink', mode: 'chase', speed: 0.65 },
        { x: 13, y: 12, direction: DIRECTIONS.UP, color: 'cyan', mode: 'chase', speed: 0.70 },
        { x: 14, y: 12, direction: DIRECTIONS.DOWN, color: 'orange', mode: 'chase', speed: 0.60 }
      ],
      score: 0,
      lives: 3,
      running: false,
      gameOver: false,
      victory: false,
      powerMode: { active: false, timeLeft: 0 }
    }));
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameState.running && !gameState.gameOver) {
        if (e.key === 'Enter' || e.key === ' ') {
          startGame();
          return;
        }
      }
      
      if (!gameState.running) return;
      
      let nextDirection = gameState.pacman.nextDirection;
      
      switch (e.key) {
        case 'ArrowUp':
          nextDirection = DIRECTIONS.UP;
          break;
        case 'ArrowDown':
          nextDirection = DIRECTIONS.DOWN;
          break;
        case 'ArrowLeft':
          nextDirection = DIRECTIONS.LEFT;
          break;
        case 'ArrowRight':
          nextDirection = DIRECTIONS.RIGHT;
          break;
        default:
          return;
      }
      
      setGameState(prev => ({
        ...prev,
        pacman: { ...prev.pacman, nextDirection }
      }));
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.running, gameState.gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameState.running) return;
    
    let lastTime = 0;
    let accumulator = 0;
    const step = 1000 / GAME_SPEED;
    
    const gameLoop = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      accumulator += deltaTime;
      
      while (accumulator >= step) {
        updateGame();
        accumulator -= step;
      }
      
      renderGame();
      
      if (gameState.running && !gameState.gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };
    
    const animationId = requestAnimationFrame(gameLoop);
    
    return () => cancelAnimationFrame(animationId);
  }, [gameState.running, gameState.gameOver]);

  // Update power mode timer
  useEffect(() => {
    if (!gameState.powerMode.active) return;
    
    const powerTimer = setInterval(() => {
      setGameState(prev => {
        const timeLeft = prev.powerMode.timeLeft - 1;
        
        if (timeLeft <= 0) {
          clearInterval(powerTimer);
          return {
            ...prev,
            powerMode: { active: false, timeLeft: 0 },
            ghosts: prev.ghosts.map(ghost => ({
              ...ghost,
              mode: 'chase'
            }))
          };
        }
        
        return {
          ...prev,
          powerMode: { ...prev.powerMode, timeLeft }
        };
      });
    }, 1000);
    
    return () => clearInterval(powerTimer);
  }, [gameState.powerMode.active]);

  const startGame = () => {
    setGameState(prev => ({ ...prev, running: true }));
  };

  const updateGame = () => {
    setGameState(prev => {
      // Don't update if game is over
      if (prev.gameOver || prev.victory) return prev;
      
      // Create copies to work with
      const grid = JSON.parse(JSON.stringify(prev.grid));
      let { pacman, ghosts, score, lives, dotsRemaining, powerMode, gameOver, victory } = prev;
      
      // Move Pacman
      const newPacman = { ...pacman };
      
      // Check if the next direction is valid
      const nextX = pacman.x + pacman.nextDirection.x;
      const nextY = pacman.y + pacman.nextDirection.y;
      const canChangeDirection = grid[nextY] && grid[nextY][nextX] !== ENTITY_TYPE.WALL;
      
      if (canChangeDirection) {
        newPacman.direction = pacman.nextDirection;
      }
      
      // Move in current direction
      const newX = pacman.x + newPacman.direction.x;
      const newY = pacman.y + newPacman.direction.y;
      
      // Check if the space is valid
      if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
        newPacman.x = newX;
        newPacman.y = newY;
        
        // Handle collectibles
        const cell = grid[newY][newX];
        if (cell === ENTITY_TYPE.DOT) {
          grid[newY][newX] = ENTITY_TYPE.EMPTY;
          score += 10;
          dotsRemaining--;
        } else if (cell === ENTITY_TYPE.POWER_PELLET) {
          grid[newY][newX] = ENTITY_TYPE.EMPTY;
          score += 50;
          dotsRemaining--;
          
          // Activate power mode
          powerMode = { active: true, timeLeft: 10 };
          
          // Change ghosts to frightened mode
          ghosts = ghosts.map(ghost => ({
            ...ghost,
            mode: 'frightened'
          }));
        }
      }
      
      // Move ghosts
      const updatedGhosts = moveGhosts(ghosts, newPacman, grid);
      
      // Check for collisions with ghosts
      for (const ghost of updatedGhosts) {
        if (ghost.x === newPacman.x && ghost.y === newPacman.y) {
          if (powerMode.active && ghost.mode === 'frightened') {
            // Eat the ghost
            score += 200;
            
            // Reset ghost position
            ghost.x = 13 + Math.floor(Math.random() * 2);
            ghost.y = 11 + Math.floor(Math.random() * 2);
            ghost.mode = 'chase';
          } else {
            // Player loses a life
            lives--;
            
            if (lives <= 0) {
              gameOver = true;
              break;
            }
            
            // Reset positions
            newPacman.x = 14;
            newPacman.y = 23;
            newPacman.direction = DIRECTIONS.RIGHT;
            newPacman.nextDirection = DIRECTIONS.RIGHT;
            
            updatedGhosts.forEach((ghost, i) => {
              ghost.x = 13 + (i % 2);
              ghost.y = 11 + Math.floor(i / 2);
            });
            
            // Cancel power mode
            powerMode = { active: false, timeLeft: 0 };
            break;
          }
        }
      }
      
      // Check for victory
      if (dotsRemaining <= 0) {
        victory = true;
      }
      
      return {
        ...prev,
        pacman: newPacman,
        ghosts: updatedGhosts,
        grid,
        score,
        lives,
        dotsRemaining,
        powerMode,
        gameOver,
        victory,
        running: !gameOver && !victory
      };
    });
  };

  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw maze
    for (let y = 0; y < GRID_SIZE.height; y++) {
      for (let x = 0; x < GRID_SIZE.width; x++) {
        const cell = gameState.grid[y][x];
        
        if (cell === ENTITY_TYPE.WALL) {
          ctx.fillStyle = '#2121de';
          ctx.fillRect(
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        } else if (cell === ENTITY_TYPE.DOT) {
          ctx.fillStyle = '#ffb8ae';
          ctx.beginPath();
          ctx.arc(
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 8,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (cell === ENTITY_TYPE.POWER_PELLET) {
          ctx.fillStyle = '#ffb8ae';
          ctx.beginPath();
          ctx.arc(
            x * CELL_SIZE + CELL_SIZE / 2,
            y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 3,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    }
    
    // Draw Pacman
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    
    // Calculate mouth angle based on direction
    const mouthAngle = Math.PI / 4; // 45 degrees
    let startAngle = 0;
    let endAngle = Math.PI * 2;
    
    if (gameState.pacman.direction === DIRECTIONS.RIGHT) {
      startAngle = mouthAngle / 2;
      endAngle = Math.PI * 2 - mouthAngle / 2;
    } else if (gameState.pacman.direction === DIRECTIONS.LEFT) {
      startAngle = Math.PI + mouthAngle / 2;
      endAngle = Math.PI - mouthAngle / 2;
    } else if (gameState.pacman.direction === DIRECTIONS.UP) {
      startAngle = Math.PI * 1.5 + mouthAngle / 2;
      endAngle = Math.PI * 1.5 - mouthAngle / 2;
    } else if (gameState.pacman.direction === DIRECTIONS.DOWN) {
      startAngle = Math.PI * 0.5 + mouthAngle / 2;
      endAngle = Math.PI * 0.5 - mouthAngle / 2;
    }
    
    ctx.arc(
      gameState.pacman.x * CELL_SIZE + CELL_SIZE / 2,
      gameState.pacman.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      startAngle,
      endAngle
    );
    ctx.lineTo(
      gameState.pacman.x * CELL_SIZE + CELL_SIZE / 2,
      gameState.pacman.y * CELL_SIZE + CELL_SIZE / 2
    );
    ctx.fill();
    
    // Draw ghosts
    gameState.ghosts.forEach(ghost => {
      // Set color based on mode
      if (gameState.powerMode.active && ghost.mode === 'frightened') {
        ctx.fillStyle = gameState.powerMode.timeLeft <= 3 && 
                        Math.floor(Date.now() / 250) % 2 === 0 ? 'white' : 'blue';
      } else {
        ctx.fillStyle = ghost.color;
      }
      
      // Ghost body
      ctx.beginPath();
      ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE / 2,
        ghost.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        Math.PI,
        0,
        false
      );
      
      // Bottom "wavy" part
      const ghostBottom = ghost.y * CELL_SIZE + CELL_SIZE;
      ctx.lineTo(ghost.x * CELL_SIZE + CELL_SIZE, ghostBottom);
      
      // Draw wavy bottom
      const waveWidth = CELL_SIZE / 3;
      for (let i = 0; i < 3; i++) {
        const startX = ghost.x * CELL_SIZE + CELL_SIZE - (i * waveWidth);
        ctx.lineTo(startX - waveWidth / 2, ghostBottom - waveWidth / 2);
        ctx.lineTo(startX - waveWidth, ghostBottom);
      }
      
      ctx.lineTo(ghost.x * CELL_SIZE, ghost.y * CELL_SIZE + CELL_SIZE / 2);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE / 3,
        ghost.y * CELL_SIZE + CELL_SIZE / 2.5,
        CELL_SIZE / 6,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(
        ghost.x * CELL_SIZE + CELL_SIZE * 2 / 3,
        ghost.y * CELL_SIZE + CELL_SIZE / 2.5,
        CELL_SIZE / 6,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      // Pupils
      ctx.fillStyle = 'black';
      
      // Adjust pupil position based on ghost direction
      let leftPupilX = ghost.x * CELL_SIZE + CELL_SIZE / 3;
      let leftPupilY = ghost.y * CELL_SIZE + CELL_SIZE / 2.5;
      let rightPupilX = ghost.x * CELL_SIZE + CELL_SIZE * 2 / 3;
      let rightPupilY = ghost.y * CELL_SIZE + CELL_SIZE / 2.5;
      
      if (ghost.direction === DIRECTIONS.LEFT) {
        leftPupilX -= CELL_SIZE / 12;
        rightPupilX -= CELL_SIZE / 12;
      } else if (ghost.direction === DIRECTIONS.RIGHT) {
        leftPupilX += CELL_SIZE / 12;
        rightPupilX += CELL_SIZE / 12;
      } else if (ghost.direction === DIRECTIONS.UP) {
        leftPupilY -= CELL_SIZE / 12;
        rightPupilY -= CELL_SIZE / 12;
      } else if (ghost.direction === DIRECTIONS.DOWN) {
        leftPupilY += CELL_SIZE / 12;
        rightPupilY += CELL_SIZE / 12;
      }
      
      ctx.beginPath();
      ctx.arc(
        leftPupilX,
        leftPupilY,
        CELL_SIZE / 12,
        0,
        Math.PI * 2
      );
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(
        rightPupilX,
        rightPupilY,
        CELL_SIZE / 12,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  };

  return (
    <div className="flex flex-col items-center">
      <GameStatus 
        score={gameState.score} 
        lives={gameState.lives} 
        level={gameState.level} 
        powerMode={gameState.powerMode}
      />
      
      <div className="relative mt-4 mb-6">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE.width * CELL_SIZE}
          height={GRID_SIZE.height * CELL_SIZE}
          className="border-4 border-blue-900 rounded-lg shadow-lg"
        />
        
        {!gameState.running && !gameState.gameOver && !gameState.victory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <div className="text-center p-6 bg-surface-800 rounded-xl shadow-lg">
              <h2 className="text-2xl font-pixel text-primary mb-4">Pac-Man</h2>
              <p className="text-white mb-6">Press ENTER or SPACE to start</p>
              <button
                onClick={startGame}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Start Game
              </button>
            </div>
          </div>
        )}
        
        {gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <div className="text-center p-6 bg-surface-800 rounded-xl shadow-lg">
              <h2 className="text-2xl font-pixel text-red-500 mb-4">Game Over</h2>
              <p className="text-white mb-2">Score: {gameState.score}</p>
              <button
                onClick={initializeGame}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors mt-4"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {gameState.victory && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
            <div className="text-center p-6 bg-surface-800 rounded-xl shadow-lg">
              <h2 className="text-2xl font-pixel text-yellow-400 mb-4">Victory!</h2>
              <p className="text-white mb-2">Score: {gameState.score}</p>
              <button
                onClick={initializeGame}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors mt-4"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      
      <GameControls 
        onDirectionChange={(direction) => {
          if (gameState.running) {
            setGameState(prev => ({
              ...prev,
              pacman: { ...prev.pacman, nextDirection: direction }
            }));
          }
        }}
      />
      
      <div className="mt-6 bg-surface-100 dark:bg-surface-700 p-4 rounded-lg max-w-md text-center">
        <h3 className="font-medium text-lg mb-2">How to Play</h3>
        <p className="text-surface-600 dark:text-surface-300 text-sm mb-2">
          Use arrow keys or the directional buttons to navigate Pac-Man through the maze.
          Eat all dots while avoiding ghosts. Power pellets allow you to eat ghosts temporarily.
        </p>
        <div className="flex justify-center space-x-4 mt-3">
          <div className="text-center">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mx-auto"></div>
            <span className="text-xs">Pac-Man</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mx-auto"></div>
            <span className="text-xs">Ghosts</span>
          </div>
          <div className="text-center">
            <div className="w-3 h-3 bg-white rounded-full mx-auto"></div>
            <span className="text-xs">Dots</span>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-white rounded-full mx-auto"></div>
            <span className="text-xs">Power</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacmanGame;