# Plants vs Zombies React Clone

## Overview
A modern React implementation of the classic tower defense game Plants vs Zombies. This project recreates the core gameplay mechanics using React, TypeScript, and modern web technologies.

## Game Features

### Core Mechanics
- **Grid-based gameplay**: 5x9 lawn grid where plants are placed
- **Resource management**: Sun currency system for purchasing plants
- **Plant types**: Various plants with different abilities (shooting, defensive, utility)
- **Zombie waves**: Progressive difficulty with different zombie types
- **Collision detection**: Plants and zombies interact through projectiles and direct contact

### Plant Types
1. **Peashooter** - Basic shooting plant (25 sun)
2. **Sunflower** - Generates sun currency (50 sun)
3. **Wall-nut** - Defensive barrier (50 sun)
4. **Cherry Bomb** - Explosive plant (150 sun)
5. **Snow Pea** - Slows zombies (175 sun)

### Zombie Types
1. **Basic Zombie** - Standard walking zombie
2. **Conehead Zombie** - Zombie with traffic cone protection
3. **Buckethead Zombie** - Zombie with metal bucket helmet
4. **Flag Zombie** - Faster zombie that signals wave end

## Technical Stack

### Core Technologies
- **React 18** - UI framework with hooks
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **CSS3** - Styling with animations and transitions

### Game Architecture
- **Component-based design** - Modular, reusable components
- **State management** - React Context for global game state
- **Animation system** - CSS animations and React state transitions
- **Asset management** - Optimized sprite loading and caching

## Project Structure

```
src/
├── components/
│   ├── Game/
│   │   ├── GameBoard.tsx          # Main game grid
│   │   ├── GameUI.tsx             # HUD and controls
│   │   └── GameState.tsx          # Game state management
│   ├── Plants/
│   │   ├── Plant.tsx              # Base plant component
│   │   ├── Peashooter.tsx         # Shooting plant
│   │   ├── Sunflower.tsx          # Sun-generating plant
│   │   ├── WallNut.tsx            # Defensive plant
│   │   ├── CherryBomb.tsx         # Explosive plant
│   │   └── SnowPea.tsx            # Slowing plant
│   ├── Zombies/
│   │   ├── Zombie.tsx             # Base zombie component
│   │   ├── BasicZombie.tsx        # Standard zombie
│   │   ├── ConeheadZombie.tsx     # Protected zombie
│   │   └── BucketheadZombie.tsx   # Armored zombie
│   ├── Projectiles/
│   │   ├── Pea.tsx                # Basic projectile
│   │   └── SnowPea.tsx            # Slowing projectile
│   └── UI/
│       ├── PlantSelector.tsx      # Plant selection menu
│       ├── SunCounter.tsx         # Sun currency display
│       └── WaveIndicator.tsx      # Wave progress display
├── hooks/
│   ├── useGameState.ts            # Game state management
│   ├── useAnimation.ts            # Animation utilities
│   └── useCollision.ts            # Collision detection
├── types/
│   ├── game.ts                    # Game type definitions
│   ├── plants.ts                  # Plant type definitions
│   └── zombies.ts                 # Zombie type definitions
├── utils/
│   ├── gameLogic.ts               # Core game mechanics
│   ├── collision.ts               # Collision detection algorithms
│   └── constants.ts               # Game constants
├── assets/
│   ├── sprites/
│   │   ├── plants/                # Plant sprite images
│   │   ├── zombies/               # Zombie sprite images
│   │   ├── projectiles/           # Projectile sprites
│   │   └── ui/                    # UI element sprites
│   └── sounds/
│       ├── plant_place.wav        # Plant placement sound
│       ├── zombie_groan.wav       # Zombie sound effects
│       └── pea_hit.wav            # Projectile hit sound
└── styles/
    ├── globals.css                # Global styles
    ├── components.css             # Component-specific styles
    └── animations.css             # Animation definitions
```

## Game Rules

### Objective
Prevent zombies from reaching the left side of the screen by strategically placing plants.

### Controls
- **Mouse/Touch**: Click on empty grid cells to place plants
- **Plant Selection**: Click on plant types in the selector bar
- **Sun Collection**: Click on falling sun to collect currency

### Scoring
- **Survival**: Survive each wave without zombies reaching the house
- **Sun Efficiency**: Collect sun and manage resources effectively
- **Plant Strategy**: Use different plant combinations for optimal defense

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with ES6+ support

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd pvz-react-vibe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
```env
# Optional: Asset CDN URL for production
VITE_ASSET_CDN_URL=https://your-cdn.com/assets
```

## Asset Sources

### Sprites and Textures
All visual assets are sourced from open source and free resources:

- **OpenGameArt.org** - Community-driven game assets
- **Itch.io** - Free game asset collections
- **Pixabay** - Royalty-free images and graphics
- **Freepik** - Free vector graphics (with attribution)
- **Game-icons.net** - Free game UI icons

### Audio Sources
- **Freesound.org** - Creative Commons sound effects
- **Zapsplat** - Free sound effects (with attribution)
- **OpenGameArt.org** - Free game audio assets

## Performance Considerations

### Optimization Strategies
- **Sprite atlasing** - Combine sprites into texture atlases
- **Object pooling** - Reuse projectile and effect objects
- **Lazy loading** - Load assets on demand
- **Animation batching** - Group similar animations together
- **Memory management** - Clean up unused resources

### Browser Compatibility
- **Modern browsers** - Chrome 90+, Firefox 88+, Safari 14+
- **Mobile support** - Touch controls for mobile devices
- **Responsive design** - Adapts to different screen sizes

## Contributing

### Code Style
- **TypeScript** - Strict type checking enabled
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Component naming** - PascalCase for components
- **File naming** - kebab-case for files

### Git Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Submit pull request for review
4. Merge after approval

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **PopCap Games** - Original Plants vs Zombies concept
- **Open source community** - Asset contributions and inspiration
- **React team** - Excellent framework for building interactive UIs
- **Contributors** - All developers who help improve this project

## Roadmap

### Phase 1 (MVP)
- [x] Basic game grid and plant placement
- [x] Core plant types (Peashooter, Sunflower, Wall-nut)
- [x] Basic zombie movement and collision
- [x] Sun currency system
- [x] Simple wave progression

### Phase 2 (Enhanced)
- [ ] Additional plant types (Cherry Bomb, Snow Pea)
- [ ] More zombie variants
- [ ] Sound effects and music
- [ ] Particle effects and animations
- [ ] Mobile touch controls

### Phase 3 (Advanced)
- [ ] Level progression system
- [ ] Achievement system
- [ ] High score tracking
- [ ] Multiplayer mode
- [ ] Level editor

## Support

For questions, bug reports, or feature requests:
- **Issues** - Use GitHub Issues for bug reports
- **Discussions** - Use GitHub Discussions for questions
- **Email** - Contact the maintainers directly

---

*Happy gardening and zombie defending!* 🌱🧟‍♂️
