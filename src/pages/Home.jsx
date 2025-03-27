import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const gamesList = [
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Navigate through the maze, eat all the dots while avoiding ghosts!',
    image: 'https://burst.shopifycdn.com/photos/yellow-arcade-character.jpg?width=500&format=pjpg&exif=0&iptc=0',
    category: 'arcade',
    featured: true
  },
  // More games can be added here
];

const categories = [
  { id: 'all', name: 'All Games' },
  { id: 'arcade', name: 'Arcade' },
  { id: 'puzzle', name: 'Puzzle' },
  { id: 'action', name: 'Action' },
  { id: 'sports', name: 'Sports' }
];

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter games based on category and search query
  const filteredGames = gamesList.filter(game => {
    const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="bg-surface-800 dark:bg-surface-700 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/80"></div>
            <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Classic Arcade Games
                </h1>
                <p className="text-surface-100 text-lg mb-6">
                  Play your favorite classic arcade games right in your browser. 
                  No downloads required!
                </p>
                <Link 
                  to="/games/pacman" 
                  className="inline-block bg-secondary hover:bg-secondary-dark transition-colors text-white font-medium rounded-lg px-6 py-3 shadow-lg"
                >
                  Play Pac-Man Now
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.img
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  src="https://burst.shopifycdn.com/photos/person-playing-arcade-game.jpg?width=500&format=pjpg&exif=0&iptc=0"
                  alt="Arcade gaming"
                  className="rounded-xl shadow-2xl max-w-xs md:max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-800 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 text-surface-400" size={18} />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section>
        <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-6">
          {activeCategory === 'all' ? 'All Games' : `${categories.find(c => c.id === activeCategory)?.name}`}
        </h2>

        {filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl text-surface-600 dark:text-surface-400">No games found</h3>
            <p className="mt-2 text-surface-500 dark:text-surface-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white dark:bg-surface-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {game.featured && (
                    <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-surface-800 dark:text-white mb-2">
                    {game.title}
                  </h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                    {game.description}
                  </p>
                  <Link
                    to={`/games/${game.id}`}
                    className="inline-block w-full text-center bg-primary hover:bg-primary-dark text-white font-medium rounded-lg px-4 py-2 transition-colors"
                  >
                    Play Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;