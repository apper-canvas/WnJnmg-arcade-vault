import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import GamePage from './pages/GamePage'

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || 
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-surface-900/80 border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mr-2"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-arcade">
                <span className="font-pixel text-white text-xs">AV</span>
              </div>
            </motion.div>
            <h1 className="font-pixel text-lg text-surface-800 dark:text-white">
              <span className="text-primary">Arcade</span>
              <span className="text-secondary">Vault</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Games
            </a>
            <a href="/leaderboards" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Leaderboards
            </a>
            <a href="/profile" className="font-medium text-surface-600 hover:text-primary dark:text-surface-300 dark:hover:text-primary-light transition-colors">
              Profile
            </a>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 py-3 space-y-2 bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
                <a 
                  href="/" 
                  className="block py-2 px-3 rounded-lg font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Games
                </a>
                <a 
                  href="/leaderboards" 
                  className="block py-2 px-3 rounded-lg font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Leaderboards
                </a>
                <a 
                  href="/profile" 
                  className="block py-2 px-3 rounded-lg font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:gameId" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-surface-800 dark:bg-surface-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-arcade mr-2">
                  <span className="font-pixel text-white text-xs">AV</span>
                </div>
                <span className="font-pixel text-sm">
                  <span className="text-primary">Arcade</span>
                  <span className="text-secondary">Vault</span>
                </span>
              </div>
              <p className="text-surface-400 text-sm mt-2">
                Play classic arcade games in your browser
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-surface-400 text-sm">
                &copy; {new Date().getFullYear()} ArcadeVault. All rights reserved.
              </p>
              <p className="text-surface-500 text-xs mt-1">
                All game titles are trademarks of their respective owners.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App