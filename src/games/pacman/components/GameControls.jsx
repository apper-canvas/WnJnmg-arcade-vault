import { DIRECTIONS } from '../utils/gameConstants';

const GameControls = ({ onDirectionChange }) => {
  // For mobile support, add touchscreen controls
  return (
    <div className="md:hidden">
      <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
        <div className="col-start-2">
          <button
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center shadow-lg active:shadow-md active:translate-y-0.5 transition-all"
            onClick={() => onDirectionChange(DIRECTIONS.UP)}
            aria-label="Move up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
        
        <div>
          <button
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center shadow-lg active:shadow-md active:translate-y-0.5 transition-all"
            onClick={() => onDirectionChange(DIRECTIONS.LEFT)}
            aria-label="Move left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
        
        <div>
          <button
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center shadow-lg active:shadow-md active:translate-y-0.5 transition-all"
            onClick={() => onDirectionChange(DIRECTIONS.RIGHT)}
            aria-label="Move right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="col-start-2">
          <button
            className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center shadow-lg active:shadow-md active:translate-y-0.5 transition-all"
            onClick={() => onDirectionChange(DIRECTIONS.DOWN)}
            aria-label="Move down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <p className="text-center text-surface-500 dark:text-surface-400 text-sm mt-2">
        Use arrow keys on desktop
      </p>
    </div>
  );
};

export default GameControls;