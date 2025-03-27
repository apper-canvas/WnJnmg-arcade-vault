import { useEffect, useState } from 'react';

const GameStatus = ({ score, lives, level, powerMode }) => {
  const [powerFlash, setPowerFlash] = useState(false);

  // Flashing effect for power mode
  useEffect(() => {
    if (!powerMode.active) return;
    
    let flashInterval;
    
    // Start flashing faster in the last 3 seconds
    if (powerMode.timeLeft <= 3) {
      flashInterval = setInterval(() => {
        setPowerFlash(prev => !prev);
      }, 250);
    }
    
    return () => {
      if (flashInterval) clearInterval(flashInterval);
    };
  }, [powerMode]);

  return (
    <div className="flex justify-between items-center w-full max-w-md bg-surface-100 dark:bg-surface-700 p-3 rounded-lg shadow-md">
      <div className="flex items-center">
        <span className="font-pixel text-lg text-primary mr-1">SCORE:</span>
        <span className="font-pixel text-lg">{score.toString().padStart(5, '0')}</span>
      </div>
      
      <div className="flex items-center">
        {powerMode.active && (
          <div className={`mr-4 px-2 py-1 rounded ${powerFlash ? 'bg-blue-500' : 'bg-blue-700'}`}>
            <span className="font-pixel text-sm text-white">POWER: {powerMode.timeLeft}s</span>
          </div>
        )}
        
        <span className="font-pixel text-lg mr-2">LIVES:</span>
        <div className="flex">
          {[...Array(lives)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full mx-1"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStatus;