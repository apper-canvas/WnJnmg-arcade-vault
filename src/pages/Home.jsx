import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Clock, Trophy } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Sample game data
const GAMES = [
  {
    id: 1,
    title: "Pac-Man",
    thumbnail: "https://images.unsplash.com/photo-1579309401389-a2476dddf3d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Arcade",
    year: 1980,
    publisher: "Namco",
    popularity: 98,
    description: "Navigate a maze while eating dots and avoiding ghosts."
  },
  {
    id: 2,
    title: "Super Mario Bros",
    thumbnail: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Console",
    year: 1985,
    publisher: "Nintendo",
    popularity: 99,
    description: "Help Mario rescue Princess Peach from Bowser."
  },
  {
    id: 3,
    title: "Contra",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Console",
    year: 1987,
    publisher: "Konami",
    popularity: 92,
    description: "Run and gun action game with alien invaders."
  },
  {
    id: 4,
    title: "Tetris",
    thumbnail: "https://images.unsplash.com/photo-1591106016801-46b42b89e9f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Puzzle",
    year: 1984,
    publisher: "Alexey Pajitnov",
    popularity: 97,
    description: "Arrange falling blocks to create complete lines."
  },
  {
    id: 5,
    title: "Space Invaders",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Arcade",
    year: 1978,
    publisher: "Taito",
    popularity: 90,
    description: "Defend Earth from waves of alien invaders."
  },
  {
    id: 6,
    title: "Donkey Kong",
    thumbnail: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    category: "Arcade",
    year: 1981,
    publisher: "Nintendo",
    popularity: 88,
    description: "Help Jumpman rescue Pauline from Donkey Kong."
  }
];

const CATEGORIES = ["All", "Arcade", "Console", "Puzzle", "Racing", "Fighting", "Platformer"];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredGames, setFilteredGames] = useState(GAMES);
  const [sortOption, setSortOption] = useState("popularity");
  
  useEffect(() => {
    let result = [...GAMES];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(game => game.category === selectedCategory);
    }
    
    // Sort games
    if (sortOption === "popularity") {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "year") {
      result.sort((a, b) => b.year - a.year);
    }
    
    setFilteredGames(result);
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-arcade-blue to-arcade-purple p-8 md:p-12">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0yNCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        <div className="relative z-10 max-w-3xl">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-pixel text-3xl md:text-4xl lg:text-5xl text-white mb-4"
          >
            Play Classic Games <br />
            <span className="text-accent">In Your Browser</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/90 text-lg mb-6"
          >
            Rediscover the golden age of gaming with our collection of classic arcade and console games. No downloads required!
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <button className="arcade-btn mr-4">
              Start Playing
            </button>
            <button className="arcade-btn-secondary">
              Create Account
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <MainFeature />

      {/* Game Browser */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="font-pixel text-2xl text-surface-800 dark:text-white">
            Browse Games
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent"
            >
              <option value="popularity">Most Popular</option>
              <option value="title">Alphabetical</option>
              <option value="year">Release Year</option>
            </select>
          </div>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group game-card"
              >
                <div className="relative">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="game-card-image pixelated"
                  />
                  <div className="game-card-overlay">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-medium text-white/80">{game.category}</span>
                        <span className="flex items-center text-xs font-medium text-white/80">
                          <Star size={14} className="text-accent mr-1" fill="currentColor" />
                          {game.popularity}%
                        </span>
                      </div>
                      <button className="w-full arcade-btn text-xs py-2">
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-pixel text-lg text-surface-800 dark:text-white mb-1">{game.title}</h3>
                  <div className="flex justify-between text-xs text-surface-500 dark:text-surface-400 mb-2">
                    <span>{game.publisher}</span>
                    <span>{game.year}</span>
                  </div>
                  <p className="text-sm text-surface-600 dark:text-surface-300">{game.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-4 rounded-full bg-surface-200 dark:bg-surface-700 mb-4">
              <Search size={24} className="text-surface-400" />
            </div>
            <h3 className="text-xl font-medium text-surface-700 dark:text-surface-300 mb-2">No games found</h3>
            <p className="text-surface-500 dark:text-surface-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>
      
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
          <div className="w-12 h-12 rounded-lg bg-arcade-green/10 flex items-center justify-center mb-4">
            <Trophy size={24} className="text-arcade-green" />
          </div>
          <h3 className="font-pixel text-lg text-surface-800 dark:text-white mb-2">Leaderboards</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Compete with players worldwide and see your name at the top of the global rankings.
          </p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
          <div className="w-12 h-12 rounded-lg bg-arcade-blue/10 flex items-center justify-center mb-4">
            <Clock size={24} className="text-arcade-blue" />
          </div>
          <h3 className="font-pixel text-lg text-surface-800 dark:text-white mb-2">Save Progress</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Create an account to save your game progress and continue where you left off.
          </p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card">
          <div className="w-12 h-12 rounded-lg bg-arcade-purple/10 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-arcade-purple">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <path d="M12 12h.01" />
              <path d="M17 12h.01" />
              <path d="M7 12h.01" />
            </svg>
          </div>
          <h3 className="font-pixel text-lg text-surface-800 dark:text-white mb-2">Custom Controls</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Customize your keyboard, mouse, or gamepad controls for the perfect gaming experience.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home