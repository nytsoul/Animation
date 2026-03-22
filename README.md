
# ðŸŽ¬ Operation: Crimson Vault

An immersive, anime-inspired interactive heist narrative experience with strategic gameplay, character selection, and gamified role-playing mechanics.

![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?logo=vite) ![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-38b2ac?logo=tailwindcss) ![Motion](https://img.shields.io/badge/Motion-12.23.24-purple)

---

## ðŸ“‹ Overview

**Operation: Crimson Vault** is an interactive narrative game built with React and modern web technologies. Players assume unique roles (Mastermind, Hacker, Negotiator, Insider) and navigate strategic missions through beautifully animated scenes. The application features:

- ðŸŽ¨ **Anime-inspired aesthetic** with atmospheric backgrounds and smooth animations
- ðŸŽ­ **Role-based gameplay** with distinct abilities and progression systems
- ðŸ“± **Responsive design** optimized for desktop and mobile experiences
- âœ¨ **Advanced animations** including particle effects, glassmorphism, and neon borders
- ðŸŽ® **Gamification elements** with experience points, levels, and achievement badges

---

## ðŸš€ Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start development server (runs on http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build
```

The build output will be in the `dist/` directory.

---

## ðŸŽ® Game Pages & Features

### ðŸ  Landing Page (`/`)
**The Mission Briefing**
- Cinematic title reveal with gradient text
- Animated background (gradient sky, fog layers, glowing moon)
- Typewriter-style mission briefing text cycles
- Call-to-action button to begin the operation
- Atmospheric effects: twinkling stars, falling petals, scanlines
- **Features:** Motion animations, particle effects, vignette overlay

### ðŸ” Login Page (`/login`)
**Secure Agent Access**
- Transparent glass-morphic card design
- Input fields with hover glow effects
- Email and password authentication
- Remember me & forgot password options
- Smooth form animations with staggered delays
- **Features:** Animated borders, particle effects, loading states

### ðŸ“ Register Page (`/register`)
**Recruit New Agents**
- Extended form with name, email, password, and confirmation fields
- Real-time error messages for validation
- Terms of Service checkbox
- Input validation (minimum 8-character password)
- Seamless navigation between login/register flows
- **Features:** Progressive form animations, error styling, gradient buttons

### ðŸŽ­ Character Select (`/select-role`)
**Choose Your Specialist**

Horizontal scrollable card layout with **4 unique roles**:

#### 1. **The Mastermind** (Red #c41e3a)
- Title: Strategic Genius
- Abilities: Strategic Planning, Risk Analysis, Team Coordination
- Level: 12 | XP: 15,200

#### 2. **The Hacker** (Green #00ff88)
- Title: Digital Ghost
- Abilities: System Breach, Data Manipulation, Electronic Warfare
- Level: 10 | XP: 12,500

#### 3. **The Negotiator** (Gold #d4af37)
- Title: Silver Tongue
- Abilities: Persuasion, Crisis Management, Psychological Warfare
- Level: 15 | XP: 18,900

#### 4. **The Insider** (Purple #8b5cf6)
- Title: Hidden Asset
- Abilities: Inside Knowledge, Access Control, Undercover Operations
- Level: 18 | XP: 22,100

**Card Features:**
- âœ¨ **Animated game-like neon borders** with running lights
- ðŸŽ® **Gamification:** Level badges, XP bars, ability lists
- ðŸŽ¨ **Particle burst effects** on hover
- ðŸ’« **Corner glow points** that pulse
- ðŸ”’ **Lock mechanism** for unreleased roles
- ðŸŽ¯ **Selection state** with checkmark confirmation
- â†”ï¸ **Horizontal scrolling** with left/right navigation arrows
- Large responsive card size (384px width) with generous spacing

**Animations:**
- Border glow pulsing effect
- 4-directional running lights (top, right, bottom, left)
- Icon scaling and rotation on hover
- Card elevation on selection
- Experience bar fills on load

### ðŸŽ¬ Episode Page (`/episode/:id`)
**Mission Execution**
- Story-driven narrative sequences
- Dynamic branching dialogue options
- Real-time decision tracking
- Narrative progression based on role selection
- Status indicators and mission objectives

### ðŸ“Š Dashboard (`/dashboard`)
**Mission Control Center**
- Player profile & statistics
- Role progression tracking
- Mission history
- Achievement display
- Save/load game state

### ðŸŽ¬ Ending Page (`/ending/:type`)
**Mission Debrief**
- Multiple ending variations based on choices
- Story conclusion and character fates
- Achievement unlock notifications
- Replay options
- Final statistics summary

---

## ðŸŽ¨ Design System

### Color Palette
```
Primary Red:      #c41e3a (Heist Accent)
Gold Accent:      #d4af37 (Premium Touch)
Pink/Rose:        #ff7f9a (UI Highlights)
Neon Green:       #00ff88 (Hacker Role)
Purple:           #8b5cf6 (Insider Role)
Dark Background:  #08070a (Deep Black)
```

### Typography
- **Headings:** Bold, wide tracking for impact
- **Body:** Clean sans-serif for readability
- **UI:** Monospace for technical elements

### Component Patterns
- **Glassmorphism:** Semi-transparent backgrounds with backdrop blur
- **Gradient Text:** Multi-color gradient overlays for titles
- **Neon Glow:** Glowing borders and shadows for emphasis
- **Particle Effects:** Bursting particles on interaction
- **Smooth Transitions:** 300-500ms duration animations
- **Staggered Animation:** Sequential element reveal delays

---

## ðŸ› ï¸ Technology Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI Framework | 18.3.1 |
| **TypeScript** | Type Safety | Latest |
| **Vite** | Build Tool | 6.3.5 |
| **Tailwind CSS** | Styling | 4.1.12 |
| **Motion (Framer Motion)** | Animations | 12.23.24 |
| **React Router** | Navigation | 7.13.0 |
| **Radix UI** | Accessible Components | Latest |
| **Lucide React** | Icons | 0.487.0 |
| **Sonner** | Toast Notifications | 2.0.3 |

---

## ðŸ“ Project Structure

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ AudioManager.tsx          # Background music & sound effects
â”‚   â”‚   â””â”€â”€ CustomCursor.tsx          # Custom pointer styling
â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”œâ”€â”€ Landing.tsx              # Mission briefing with anime scenes
â”‚   â”‚   â”œâ”€â”€ Login.tsx                # Agent authentication
â”‚   â”‚   â”œâ”€â”€ Register.tsx             # New agent recruitment
â”‚   â”‚   â”œâ”€â”€ CharacterSelect.tsx      # Role selection with scroll
â”‚   â”‚   â”œâ”€â”€ Episode.tsx              # Mission narrative
â”‚   â”‚   â”œâ”€â”€ Dashboard.tsx            # Profile & stats
â”‚   â”‚   â””â”€â”€ Ending.tsx               # Mission conclusion
â”‚   â”œâ”€â”€ App.tsx                       # Router setup
â”‚   â””â”€â”€ routes.ts                     # Route configuration
â”œâ”€â”€ styles/
â”‚   â”œâ”€â”€ fonts.css                     # Font imports
â”‚   â”œâ”€â”€ index.css                     # Global styles
â”‚   â”œâ”€â”€ tailwind.css                  # Tailwind configuration
â”‚   â””â”€â”€ theme.css                     # Color & design tokens
â””â”€â”€ main.tsx                          # React entry point
```

---

## ðŸŽ® Key Features

### âœ¨ Animations & Effects
- **Landing Page:** Gradient sky, fog layers, moon glow, twinkling stars, falling petals, scanlines
- **Character Cards:** Animated neon borders with running lights, particle bursts, glow corners
- **Form Fields:** Hover glow borders, icon scaling, color transitions
- **Buttons:** Gradient fills, shine effects, loading spinners
- **Transitions:** Smooth page transitions, staggered element reveals

### ðŸŽ¯ Gamification
- **Experience Points (XP):** Displayed for each role with progress bars
- **Level System:** Players have levels that increase with progression
- **Abilities List:** Each role displays 3 core abilities with animated indicators
- **Locked Roles:** Unopened characters show lock icon with reduced opacity
- **Selection State:** Clear visual feedback when a role is selected

### ðŸ§© Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Scroll-friendly layouts** for touch devices
- **Large touch targets** for better UX
- **Horizontal scrolling** for character carousel
- **Readable typography** at all screen sizes

### â™¿ Accessibility
- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Keyboard navigation** support
- **Focus indicators** for tab navigation
- **Color contrast** compliance

---

## ðŸŽ¬ Animation Showcase

### Neon Border Effect (CharacterSelect)
```
Running lights travel continuously around card edges:
- Top edge: Left â†’ Right
- Right edge: Top â†’ Bottom
- Bottom edge: Right â†’ Left
- Left edge: Bottom â†’ Top
- Duration: 3 seconds (full loop)
- Corner glow points pulse on hover
```

### Particle Burst
```
15 particles emit on card hover:
- Random positions within card bounds
- Scale, opacity, and translate animations
- Staggered delays (0.08s between each)
- 1.8-second animation duration
```

### Glassmorphic Card
```
Semi-transparent background with:
- 99% opacity dark base #08070a
- Backdrop blur filter
- Gradient border glow
- Inset shadow for depth
```

---

## ðŸ”§ Configuration

### Vite Config
- **React Fast Refresh** for HMR
- **TypeScript support** enabled
- **Tailwind CSS** via Vite plugin
- **Optimized build** output

### Tailwind CSS
- **Custom theme colors** defined in `/styles/theme.css`
- **Rounded corners:** 10px default border-radius
- **Spacing scale:** 4px base unit
- **Custom gradients** for anime aesthetic

### PostCSS
- Tailwind CSS processing
- Autoprefixer for vendor prefixes

---

## ðŸš¦ Running Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## ðŸ“ Notes for Developers

### State Management
- Uses React hooks (`useState`, `useRef`, `useEffect`)
- Local storage for role selection
- Context-based for component communication

### Animation Timing
- **Page transitions:** 300-600ms
- **Hover effects:** 200-400ms
- **Border animations:** 3-second loops
- **Particle effects:** 1.5-2 second bursts

### Performance Optimization
- **Code splitting** via React Router
- **Lazy component loading**
- **Optimized animations** with GPU acceleration
- **CSS containment** for isolated components

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

---

## ðŸŽ¨ Customization Guide

### Changing Role Colors
Edit `CharacterSelect.tsx` â†’ `roles` array:
```typescript
{
  id: "mastermind",
  color: "#c41e3a",  // Change this hex value
  // ...
}
```

### Modifying Animation Speed
Edit motion transition durations:
```typescript
transition={{
  duration: 3,  // Change duration (seconds)
  repeat: Infinity,
  ease: "easeInOut"
}}
```

### Adding New Roles
1. Create new object in `roles` array
2. Add icon from `lucide-react`
3. Set unique color and abilities
4. Provide level/XP values

---

## ðŸ“¦ Dependencies

All dependencies are listed in `package.json`. Key libraries:
- **motion:** Advanced animations
- **react-router:** Page navigation
- **@radix-ui/*:** Accessible component primitives
- **lucide-react:** Icon library
- **canvas-confetti:** Celebration animations
- **recharts:** Data visualization

---

## ðŸ› Troubleshooting

### Dev server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Styles not applying
```bash
# Rebuild Tailwind CSS cache
npx tailwindcss -i ./src/styles/index.css -o ./dist/output.css
```

### Animations stuttering
- Check GPU acceleration is enabled
- Reduce particle count in effects
- Use `will-change` CSS property sparingly

---

## ðŸ“„ License

This project is based on the Figma design available at: https://www.figma.com/design/inyCyf5c4yUnr60BWpCTj0/Interactive-Heist-Animation-Website

---

## ðŸ¤ Contributing

To contribute improvements:
1. Create a feature branch
2. Make atomic commits
3. Test all animations across browsers
4. Submit a pull request

---

## ðŸ’¡ Future Enhancements

- [ ] Multiplayer mode support
- [ ] Save/load game states to backend
- [ ] Achievement system with badges
- [ ] Dialogue choice branching trees
- [ ] Real-time chat system
- [ ] Leaderboard integration
- [ ] Sound effect library
- [ ] Difficulty selectors

---

## ðŸ“ž Support

For issues or questions:
- Review the project structure in `/src`
- Check component implementations
- Inspect animations in DevTools Timeline
- Consult Tailwind CSS documentation

---

**Last Updated:** March 2026  
**Version:** 1.0.0  
**Status:** Active Development
