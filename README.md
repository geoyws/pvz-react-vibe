# 🌱 Plants vs Zombies React Clone

A modern React implementation of the classic tower defense game Plants vs Zombies! Defend your garden from the zombie invasion using strategic plant placement and resource management.

## 🎮 Features

- **5 Plant Types**: Peashooter, Sunflower, Wall-nut, Cherry Bomb, and Snow Pea
- **3 Zombie Types**: Basic, Conehead, and Buckethead zombies
- **Resource Management**: Collect sun currency to purchase plants
- **Strategic Gameplay**: Place plants strategically to defend against zombie waves
- **Beautiful Animations**: Smooth CSS animations and visual effects
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 How to Play

1. **Select a plant** from the plant selector at the top
2. **Click on an empty grid cell** to place the plant
3. **Collect sun** by clicking on falling sun drops
4. **Defend your garden** from zombie waves
5. **Don't let zombies reach the left side!**

## 🌱 Plant Types

| Plant | Cost | Ability |
|-------|------|---------|
| 🌱 Peashooter | 25 sun | Shoots peas at zombies |
| 🌻 Sunflower | 50 sun | Generates sun currency |
| 🥜 Wall-nut | 50 sun | Defensive barrier |
| 🍒 Cherry Bomb | 150 sun | Explosive damage |
| ❄️ Snow Pea | 175 sun | Slows zombies |

## 🧟 Zombie Types

| Zombie | Health | Speed | Special |
|--------|--------|-------|---------|
| Basic | 200 | Normal | Standard zombie |
| Conehead | 640 | Normal | Traffic cone protection |
| Buckethead | 1370 | Normal | Metal bucket helmet |

## 🛠️ Technical Stack

- **React 19** with TypeScript
- **Vite** for fast development
- **CSS3** animations and styling
- **Custom hooks** for game state management
- **Component-based architecture**

## 📁 Project Structure

```
src/
├── components/
│   ├── Game/           # Main game components
│   ├── Plants/         # Plant components
│   ├── Zombies/        # Zombie components
│   ├── Projectiles/    # Projectile components
│   └── UI/             # UI components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Game logic and utilities
└── styles/             # CSS styles
```

## 🎨 Visual Design

The game features:
- **CSS-only graphics** - No external image dependencies
- **Smooth animations** - 60fps CSS animations
- **Responsive design** - Adapts to different screen sizes
- **Modern UI** - Clean, intuitive interface
- **Visual feedback** - Hover effects and state indicators

## 🎵 Game Mechanics

- **Grid-based placement** - 5x9 lawn grid
- **Resource management** - Sun currency system
- **Collision detection** - Projectiles hit zombies
- **Wave progression** - Increasing difficulty
- **Real-time gameplay** - Smooth 60fps updates

## 🚀 Development

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **PopCap Games** - Original Plants vs Zombies concept
- **React team** - Amazing framework
- **Open source community** - Inspiration and support

## 🎮 Play Now!

Ready to defend your garden? Start the development server and begin your zombie-fighting adventure!

```bash
pnpm run dev
```

**Happy gardening!** 🌱🧟‍♂️