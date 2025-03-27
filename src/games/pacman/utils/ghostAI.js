import { DIRECTIONS, ENTITY_TYPE } from './gameConstants';

// Random movement for ghosts in frightened mode
const moveRandomly = (ghost, grid) => {
  // Find available directions
  const availableDirections = [];
  
  for (const dir of Object.values(DIRECTIONS)) {
    if (dir === DIRECTIONS.NONE) continue;
    
    // Don't allow ghosts to reverse direction
    if (dir.x === -ghost.direction.x && dir.y === -ghost.direction.y) continue;
    
    const newX = ghost.x + dir.x;
    const newY = ghost.y + dir.y;
    
    // Check if the new position is valid
    if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
      availableDirections.push(dir);
    }
  }
  
  // If no available directions, allow reverse
  if (availableDirections.length === 0) {
    for (const dir of Object.values(DIRECTIONS)) {
      if (dir === DIRECTIONS.NONE) continue;
      
      const newX = ghost.x + dir.x;
      const newY = ghost.y + dir.y;
      
      if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
        availableDirections.push(dir);
      }
    }
  }
  
  // Choose a random direction from available options
  if (availableDirections.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableDirections.length);
    return availableDirections[randomIndex];
  }
  
  // Default to current direction if no options
  return ghost.direction;
};

// Targeting for chase mode
const chaseTarget = (ghost, pacman, grid) => {
  // Simple A* pathfinding would be ideal, but we'll use a simpler approach
  // Calculate distances to target in each available direction
  let bestDirection = ghost.direction;
  let shortestDistance = Infinity;
  
  for (const dir of Object.values(DIRECTIONS)) {
    if (dir === DIRECTIONS.NONE) continue;
    
    // Don't allow ghosts to reverse direction
    if (dir.x === -ghost.direction.x && dir.y === -ghost.direction.y) continue;
    
    const newX = ghost.x + dir.x;
    const newY = ghost.y + dir.y;
    
    // Check if the new position is valid
    if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
      // Calculate Manhattan distance to Pacman
      const distance = Math.abs(newX - pacman.x) + Math.abs(newY - pacman.y);
      
      // Choose direction with shortest distance
      if (distance < shortestDistance) {
        shortestDistance = distance;
        bestDirection = dir;
      }
    }
  }
  
  // If no available directions, allow reverse
  if (shortestDistance === Infinity) {
    for (const dir of Object.values(DIRECTIONS)) {
      if (dir === DIRECTIONS.NONE) continue;
      
      const newX = ghost.x + dir.x;
      const newY = ghost.y + dir.y;
      
      if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
        const distance = Math.abs(newX - pacman.x) + Math.abs(newY - pacman.y);
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          bestDirection = dir;
        }
      }
    }
  }
  
  return bestDirection;
};

// Scatter mode - each ghost targets a different corner
const scatterTarget = (ghost, grid) => {
  // Define scatter targets for each ghost based on color
  let targetX = 0;
  let targetY = 0;
  
  switch(ghost.color) {
    case 'red':
      targetX = grid[0].length - 1;
      targetY = 0;
      break;
    case 'pink':
      targetX = 0;
      targetY = 0;
      break;
    case 'cyan':
      targetX = grid[0].length - 1;
      targetY = grid.length - 1;
      break;
    case 'orange':
      targetX = 0;
      targetY = grid.length - 1;
      break;
    default:
      targetX = 0;
      targetY = 0;
  }
  
  // Calculate distances to target in each available direction
  let bestDirection = ghost.direction;
  let shortestDistance = Infinity;
  
  for (const dir of Object.values(DIRECTIONS)) {
    if (dir === DIRECTIONS.NONE) continue;
    
    // Don't allow ghosts to reverse direction
    if (dir.x === -ghost.direction.x && dir.y === -ghost.direction.y) continue;
    
    const newX = ghost.x + dir.x;
    const newY = ghost.y + dir.y;
    
    // Check if the new position is valid
    if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
      // Calculate Manhattan distance to target corner
      const distance = Math.abs(newX - targetX) + Math.abs(newY - targetY);
      
      // Choose direction with shortest distance
      if (distance < shortestDistance) {
        shortestDistance = distance;
        bestDirection = dir;
      }
    }
  }
  
  // If no available directions, allow reverse
  if (shortestDistance === Infinity) {
    for (const dir of Object.values(DIRECTIONS)) {
      if (dir === DIRECTIONS.NONE) continue;
      
      const newX = ghost.x + dir.x;
      const newY = ghost.y + dir.y;
      
      if (grid[newY] && grid[newY][newX] !== ENTITY_TYPE.WALL) {
        const distance = Math.abs(newX - targetX) + Math.abs(newY - targetY);
        
        if (distance < shortestDistance) {
          shortestDistance = distance;
          bestDirection = dir;
        }
      }
    }
  }
  
  return bestDirection;
};

// Move all ghosts
export const moveGhosts = (ghosts, pacman, grid) => {
  return ghosts.map(ghost => {
    // Create copy of ghost for updating
    const updatedGhost = { ...ghost };
    
    // Determine ghost behavior based on mode
    let newDirection;
    
    if (ghost.mode === 'frightened') {
      newDirection = moveRandomly(ghost, grid);
    } else if (ghost.mode === 'scatter' || Math.random() < 0.2) { // 20% chance to scatter even in chase mode
      newDirection = scatterTarget(ghost, grid);
    } else {
      newDirection = chaseTarget(ghost, pacman, grid);
    }
    
    // Update ghost direction
    updatedGhost.direction = newDirection;
    
    // Apply movement with ghost-specific speed
    const moveAmount = ghost.speed;
    updatedGhost.x += updatedGhost.direction.x * moveAmount;
    updatedGhost.y += updatedGhost.direction.y * moveAmount;
    
    // Round position to nearest integer for grid alignment
    updatedGhost.x = Math.round(updatedGhost.x);
    updatedGhost.y = Math.round(updatedGhost.y);
    
    // Handle teleportation at tunnel
    if (updatedGhost.x < 0) {
      updatedGhost.x = grid[0].length - 1;
    } else if (updatedGhost.x >= grid[0].length) {
      updatedGhost.x = 0;
    }
    
    // Ensure the ghost is in bounds vertically
    if (updatedGhost.y < 0) {
      updatedGhost.y = 0;
    } else if (updatedGhost.y >= grid.length) {
      updatedGhost.y = grid.length - 1;
    }
    
    return updatedGhost;
  });
};