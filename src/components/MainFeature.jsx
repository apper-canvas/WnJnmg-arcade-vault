import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react'

// Sample game data for the featured game
const FEATURED_GAME = {
  id: 1,
  title: "Pac-Man",
  description: "Navigate through the maze, eating all the dots while avoiding the ghosts. Eat power pellets to turn the tables and hunt the ghosts!",
  instructions: {
    keyboard: [
      { key: "Arrow Keys", action: "Move Pac-Man" },
      { key: "P", action: "Pause Game" },
      { key: "M", action: "Mute Sound" },
      { key: "Esc", action: "Exit Game" }
    ],
    gamepad: [
      { key: "D-Pad", action: "Move Pac-Man" },
      { key: "Start", action: "Pause Game" },
      { key: "Select", action: "Mute Sound" },
      { key: "B", action: "Exit Game" }
    ]
  },
  difficulty: "Easy"
}

function MainFeature() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedControl, setSelectedControl] = useState("keyboard")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameStarted, setGameStarted] = useState(false)
  
  // Simulated game progress for demo purposes
  useEffect(() => {
    let interval
    if (isPlaying && gameStarted) {
      interval = setInterval(() => {
        setScore(prevScore => prevScore + Math.floor(Math.random() * 10) + 1)
      }, 2000)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying, gameStarted])
  
  const handlePlayPause = () => {
    if (!gameStarted && !isPlaying) {
      setGameStarted(true)
    }
    setIsPlaying(!isPlaying)
  }
  
  const handleReset = () => {
    setScore(0)
    setLives(3)
    setIsPlaying(false)
    setGameStarted(false)
  }
  
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }
  
  const handleMute = () => {
    setIsMuted(!isMuted)
  }
  
  const handleLoseLife = () => {
    if (lives > 0) {
      setLives(lives - 1)
      if (lives === 1) {
        setIsPlaying(false)
        setGameStarted(false)
      }
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="font-pixel text-2xl text-surface-800 dark:text-white">
        Featured Game
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Display */}
        <div className="lg:col-span-2">
          <div className={`relative rounded-xl overflow-hidden bg-black ${isPlaying ? 'crt-effect' : ''}`}>
            {/* Game Canvas */}
            <div className="aspect-video relative">
              {!gameStarted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-arcade-black">
                  <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 1.5 
                    }}
                    className="mb-8"
                  >
                    <h3 className="font-pixel text-4xl text-primary mb-2">PAC-MAN</h3>
                    <p className="font-pixel text-sm text-arcade-yellow text-center">© 1980 NAMCO</p>
                  </motion.div>
                  
                  <div className="font-pixel text-white text-center mb-8">
                    <p className="mb-4">HIGH SCORE: 10,000</p>
                    <p className="text-arcade-yellow animate-pulse">PRESS PLAY TO START</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 px-4 w-full max-w-md">
                    <button 
                      onClick={handlePlayPause}
                      className="arcade-btn py-2"
                    >
                      PLAY
                    </button>
                    <button 
                      onClick={() => setSelectedControl(selectedControl === "keyboard" ? "gamepad" : "keyboard")}
                      className="arcade-btn-secondary py-2"
                    >
                      {selectedControl === "keyboard" ? "KEYBOARD" : "GAMEPAD"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-arcade-black">
                  {/* Simple maze visualization for demo */}
                  <div className="w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-20 grid-rows-15">
                      {Array.from({ length: 300 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`
                            ${Math.random() > 0.8 ? 'bg-arcade-blue' : 'bg-black'}
                            ${Math.random() > 0.95 ? 'rounded-full bg-arcade-yellow' : ''}
                          `}
                        ></div>
                      ))}
                    </div>
                    
                    {/* Game HUD */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                      <div className="font-pixel text-white text-sm">
                        SCORE: {score}
                      </div>
                      <div className="font-pixel text-white text-sm flex items-center">
                        LIVES: 
                        {Array.from({ length: lives }).map((_, i) => (
                          <span key={i} className="ml-2 text-arcade-yellow">●</span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Pac-Man character (simplified) */}
                    <motion.div
                      animate={{
                        x: [0, 100, 200, 150, 50, 0],
                        y: [0, 50, 100, 150, 100, 0]
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute w-8 h-8 bg-arcade-yellow rounded-full"
                      style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    >
                      <div className="absolute right-0 top-0 w-0 h-0 
                        border-t-[16px] border-t-transparent
                        border-r-[16px] border-r-black
                        border-b-[16px] border-b-transparent">
                      </div>
                    </motion.div>
                    
                    {/* Ghost (simplified) */}
                    <motion.div
                      animate={{
                        x: [200, 100, 0, 50, 150, 200],
                        y: [200, 150, 100, 50, 0, 200]
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="absolute w-8 h-8 bg-arcade-red rounded-t-full"
                      style={{ left: '30%', top: '30%', transform: 'translate(-50%, -50%)' }}
                      onClick={handleLoseLife}
                    >
                      <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                        <div className="w-1/3 h-full bg-arcade-red rounded-b-full"></div>
                        <div className="w-1/3 h-full bg-arcade-red rounded-b-full"></div>
                        <div className="w-1/3 h-full bg-arcade-red rounded-b-full"></div>
                      </div>
                      <div className="absolute top-2 left-1 w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute top-2 right-1 w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Game Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button 
                    onClick={handleReset}
                    className="p-2 rounded-full bg-surface-800/50 hover:bg-surface-700/50 text-white"
                    aria-label="Reset game"
                  >
                    <SkipBack size={20} />
                  </button>
                  <button 
                    onClick={handlePlayPause}
                    className="p-2 rounded-full bg-primary hover:bg-primary-dark text-white"
                    aria-label={isPlaying ? "Pause game" : "Play game"}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button 
                    onClick={handleMute}
                    className="p-2 rounded-full bg-surface-800/50 hover:bg-surface-700/50 text-white"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
                <button 
                  onClick={handleFullscreen}
                  className="p-2 rounded-full bg-surface-800/50 hover:bg-surface-700/50 text-white"
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
          <h3 className="font-pixel text-xl text-surface-800 dark:text-white mb-2">
            {FEATURED_GAME.title}
          </h3>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-arcade-yellow/20 text-arcade-yellow">
              Classic
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-arcade-green/20 text-arcade-green">
              {FEATURED_GAME.difficulty}
            </span>
          </div>
          
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            {FEATURED_GAME.description}
          </p>
          
          <div className="mb-6">
            <div className="flex border-b border-surface-200 dark:border-surface-700 mb-4">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  selectedControl === "keyboard"
                    ? "text-primary border-b-2 border-primary"
                    : "text-surface-500 dark:text-surface-400"
                }`}
                onClick={() => setSelectedControl("keyboard")}
              >
                Keyboard
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  selectedControl === "gamepad"
                    ? "text-primary border-b-2 border-primary"
                    : "text-surface-500 dark:text-surface-400"
                }`}
                onClick={() => setSelectedControl("gamepad")}
              >
                Gamepad
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedControl}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Controls:
                </h4>
                <div className="space-y-2">
                  {FEATURED_GAME.instructions[selectedControl].map((instruction, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-pixel text-xs text-surface-600 dark:text-surface-400">
                        {instruction.key}
                      </span>
                      <span className="text-sm text-surface-700 dark:text-surface-300">
                        {instruction.action}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="mt-auto">
            <button 
              onClick={handlePlayPause}
              className="w-full arcade-btn"
            >
              {gameStarted ? (isPlaying ? "Pause Game" : "Resume Game") : "Start Game"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainFeature