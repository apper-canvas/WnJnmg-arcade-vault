import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative inline-block">
          <div className="font-pixel text-9xl text-primary">
            404
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-arcade-yellow rounded-lg rotate-12 flex items-center justify-center shadow-arcade">
            <span className="font-pixel text-surface-800 text-xs">?!</span>
          </div>
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-pixel text-2xl md:text-3xl text-surface-800 dark:text-white mb-4"
      >
        GAME OVER
      </motion.h1>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-surface-600 dark:text-surface-400 text-lg max-w-md mb-8"
      >
        The page you're looking for doesn't exist or has been moved to another level.
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link to="/" className="arcade-btn inline-flex items-center">
          <Home size={18} className="mr-2" />
          Return to Home
        </Link>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-12 text-surface-500 dark:text-surface-500 text-sm"
      >
        <div className="inline-block px-4 py-2 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-lg">
          <span className="font-pixel">INSERT COIN TO CONTINUE</span>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound