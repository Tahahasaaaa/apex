# 🧠 RE-AKT - Project Brief & Design System Prompt

## 📋 Project Overview

**Project Name:** RE-AKT  
**Subtitle:** Personal Growth & Self-Development Platform  
**Platform:** Web Application (React 19 + Vite)  
**Language:** Persian (RTL)  
**Mode:** Dark Mode Only  
**Target Audience:** Judges / Professional Reviewers / Enterprise Users  

---

## 🎯 Project Goals

1. **Create an Advanced AI SaaS Platform** for personal development
2. **Intelligent & Calm Interface** that feels futuristic but professional
3. **Premium Visual Experience** suitable for enterprise/judge evaluation
4. **Seamless UX** with smooth micro-interactions and animations
5. **AI-Inspired Design** without cyberpunk or gaming aesthetics
6. **Performance Optimized** with accessibility-first approach

---

## 🏗️ Project Architecture

### Tech Stack
```
Frontend Framework:   React 19.2.0
Build Tool:          Vite 7.3.1
Styling:             Tailwind CSS 4.1.18 + RTL Support
Icons:               Lucide React, React Icons
Routing:             React Router 6.30.3
HTTP Client:         Axios 1.13.5
Fonts:               DINNextArabic, Vazirmatn
```

### Application Structure
```
src/
├── pages/
│   ├── Home.jsx           (Landing/Introduction)
│   ├── Dashboard.jsx      (Main user hub)
│   ├── Goals.jsx          (Goal management & tracking)
│   ├── Tasks.jsx          (Task management system)
│   ├── AiChat.jsx         (AI conversational interface)
│   ├── Login.jsx          (Authentication)
│   ├── Profile.jsx        (User profile management)
│   ├── ProfileDropdown.jsx (Dropdown menu)
│   └── NotFound.jsx       (404 Error page)
├── components/
│   ├── ChatArea.jsx       (Chat interface)
│   ├── ChatSidebar.jsx    (Chat history)
│   ├── DashboardSidebar.jsx
│   ├── FeatureCard.jsx    (Feature showcase)
│   ├── GoalCard.jsx       (Goal display)
│   ├── StatCard.jsx       (Statistics display)
│   ├── TaskItem.jsx       (Task item)
│   └── ...
├── data/
│   ├── goals.js           (Goal mock data)
│   └── tasks.js           (Task mock data)
├── router/
│   └── AppRouter.jsx      (Route definitions)
├── api/
│   └── client.js          (Axios API client)
├── App.jsx
├── main.jsx
└── index.css              (Global design system)
```

---

## 🎨 Design System

### Color Palette

#### Primary Colors
| Color | Value | Usage |
|-------|-------|-------|
| **Primary BG** | `#0d1117` | Main background |
| **Secondary BG** | `#161b22` | Secondary surfaces |
| **Tertiary BG** | `#21262d` | Elevated surfaces |

#### Gradient Accent
| Color | Value | Usage |
|-------|-------|-------|
| **Gradient Start** | `#a855f7` (Purple) | Hero text, accents |
| **Gradient End** | `#22d3ee` (Cyan) | Hover states, highlights |

#### Text Colors
| Color | Value | Usage |
|-------|-------|-------|
| **Primary Text** | `#ffffff` | Main content |
| **Secondary Text** | `#8b949e` | Secondary info |
| **Muted Text** | `#6e7681` | Disabled, hints |

#### Lighting (Orbs)
| Color | Value | Usage |
|-------|-------|-------|
| **Orb Primary** | `#6366f1` (Indigo) | Background lighting |
| **Orb Secondary** | `#a855f7` (Purple) | Accent lighting |

---

## 📐 Typography System

### Font Families
```
Primary: DINNextArabic (Weight: 500)
Fallback: Vazirmatn (Weights: 100, 300, 400, 700, 900)
Fallback: System sans-serif
```

### Type Scales
```javascript
h1: clamp(2rem, 5vw, 3.5rem)   // 32px - 56px
h2: clamp(1.5rem, 4vw, 2.5rem) // 24px - 40px
h3: clamp(1.25rem, 3vw, 1.75rem) // 20px - 28px
body: 1rem (16px)
small: 0.875rem (14px)
```

### Text Utilities
- `.text-primary` → `#ffffff` (100% opacity)
- `.text-secondary` → `#8b949e` (with .01em letter-spacing)
- `.text-muted` → `#6e7681` (0.875rem font size)

---

## ✨ Animation System

### Timing Functions (Cubic-Bezier)
```css
--timing-subtle: cubic-bezier(0.4, 0.0, 0.2, 1)       /* Easing in */
--timing-smooth: cubic-bezier(0.34, 1.56, 0.64, 1)    /* Spring-like */
--timing-controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94) /* Precise */
```

### Duration Scale
```css
--duration-fast: 200ms      /* Quick interactions */
--duration-base: 350ms      /* Standard transitions */
--duration-slow: 600ms      /* Entrance animations */
```

### Keyframe Animations

#### `.gradient-text`
- **Animation:** `gradientShift` (8s, ease-in-out, infinite)
- **Effect:** Subtle color shift in text gradient
- **Extra:** Drop shadow glow (purple/cyan)

#### `.glass` (Hover)
- **Transform:** `translateY(-4px)` on hover
- **Box-shadow:** Purple + Cyan glow
- **Transition:** All properties (350ms, subtle timing)

#### `.orb` System
- **Breathing:** `orbBreathe` (7-9s, infinite)
- **Glow:** `orbGlow` (6s, infinite)
- **Effect:** Subtle scale & opacity variation
- **Purpose:** Organic, living background

#### Body Grid
- **Animation:** `gridShift` (20s, linear, infinite)
- **Effect:** Subtle neural grid movement
- **Opacity:** 0.03 (extremely subtle)

#### `.scroll-reveal`
- **Animation:** `scrollReveal` (600ms, controlled timing)
- **Stagger:** 100ms between children (up to 500ms)
- **Effect:** Fade-in + slide-up entrance

---

## 🧩 Component System

### Glass Panel (`.glass`)
```css
Features:
- Frosted glass effect (20px blur)
- Soft inner glow gradient
- Premium border (rgba white, 0.12)
- Hover lift & glow effect
- 350ms smooth transitions
```

### Hover Lift Utility (`.hover-lift`)
```css
- Transform: translateY(-6px)
- Multi-layered shadow (purple + cyan)
- Smooth cubic-bezier timing
```

### Section Divider (`.section-divider`)
```css
- Gradient horizontal line
- Purple → Cyan fade
- Soft blur layer
- Centered positioning
```

### Mouse Glow (`.mouse-glow`)
```css
- Desktop only (@media hover: hover)
- 300x300px radial gradient
- Purple → Cyan opacity gradient
- 40px blur filter
- Follows cursor concept
```

---

## 🎬 Micro-interactions

### Button States
```css
Default:   Smooth color transition (350ms)
Hover:     Color change + scale slightly
Active:    scale(0.98) - subtle press effect
Focus:     2px outline ring (purple glow for accessibility)
```

### Link & Input States
```css
All elements:
- Smooth transition (350ms, cubic-bezier)
- Accessible focus states with purple ring
- Reduced motion support (@media prefers-reduced-motion)
```

### Mobile Optimization
```css
- Reduced animation speed on tablets
- Glass hover reduced (2px instead of 4px)
- Grid animation slower (30s instead of 20s)
- All touch-friendly spacing maintained
```

---

## 🔧 CSS Variables (Implementation Ready)

```css
/* Colors */
--color-bg-primary: #0d1117
--color-bg-secondary: #161b22
--color-bg-tertiary: #21262d
--color-gradient-start: #a855f7
--color-gradient-end: #22d3ee
--color-text-primary: #ffffff
--color-text-secondary: #8b949e
--color-text-muted: #6e7681
--color-orb-primary: #6366f1
--color-orb-secondary: #a855f7

/* Timing */
--timing-subtle: cubic-bezier(0.4, 0.0, 0.2, 1)
--timing-smooth: cubic-bezier(0.34, 1.56, 0.64, 1)
--timing-controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94)

/* Durations */
--duration-fast: 200ms
--duration-base: 350ms
--duration-slow: 600ms
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 640px (Base/optimized)
- **Tablet:** 640px - 1024px (Moderate enhancements)
- **Desktop:** > 1024px (Full effects)

### Adaptive Features
- Reduced motion support for accessibility
- Touch-friendly hit targets (min 44px)
- RTL layout support (Tailwind RTL plugin)
- Scalable typography (clamp() function)

---

## ♿ Accessibility Features

### WCAG Compliance
- Proper semantic HTML structure
- Focus states on all interactive elements
- Color contrast ratio ≥ 4.5:1 for text
- Reduced motion support via `@media (prefers-reduced-motion: reduce)`

### Keyboard Navigation
- Tab order optimized
- Focus visible styling (purple ring)
- Skip to content options
- Arrow key navigation support (where applicable)

---

## ⚡ Performance Targets

### Goals
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Lighthouse Score:** ≥ 95

### Optimizations
- CSS animations use `transform` & `opacity` only
- Reduced particles/animations on mobile
- GPU-accelerated transitions
- Smooth 60fps animations
- Lazy loading for images/components

---

## 🌍 Localization (Persian RTL)

### Direction
- `direction: rtl` on `<html>`
- RTL-aware component layout
- Right-aligned text by default
- Tailwind RTL plugin integration

### Typography
- DINNextArabic supports Persian glyphs
- Vazirmatn as fallback (multiple weights)
- Letter-spacing adjusted for RTL readability (+0.01em for secondary text)
- Line-height optimized (1.7 body)

---

## 🎯 Brand Voice & Tone

### Design Philosophy
- **"Intelligent, Not Flashy"** - Premium but understated
- **"Calm Focus"** - Reduced cognitive load
- **"Sophisticated Futurism"** - Advanced without cyberpunk
- **"Professional AI"** - Trustworthy, not gimmicky
- **"Deep Contemplation"** - Encourages reflection

### Visual Principles
✅ DO:
- Use subtle animations (breathing effects, gentle fades)
- Leverage white space generously
- Maintain consistent depth with glass & orbs
- Use gradients purposefully (not decoratively)
- Prioritize clarity over decoration

❌ DON'T:
- Overuse neon colors
- Create visual chaos with too many elements
- Use gaming-style effects
- Add loud, aggressive movements
- Ignore user preferences (motion, contrast, etc.)

---

## 📋 Usage Examples

### Creating a Premium Card
```jsx
<div className="glass hover-lift p-6">
  <h3 className="gradient-text mb-2">Your Title</h3>
  <p className="text-secondary">Your description</p>
</div>
```

### Scroll Reveal Section
```jsx
<div className="scroll-reveal">
  <h2>Revealed on scroll</h2>
</div>
```

### Premium Divider
```jsx
<div className="section-divider"></div>
```

### Text Hierarchy
```jsx
<h1 className="gradient-text">Main Title</h1>
<p className="text-primary">Primary content</p>
<p className="text-secondary">Secondary info</p>
<p className="text-muted">Muted/disabled</p>
```

---

## 📦 Dependencies & Plugins

### CSS/Styling
- `@tailwindcss/postcss` - Utility-first framework
- `tailwindcss-rtl` - RTL support for Arabic/Persian
- `postcss` + `autoprefixer` - CSS processing

### React Ecosystem
- `react-router-dom` - Client-side routing
- `axios` - HTTP requests
- `lucide-react` - Modern icon library
- `react-icons` - Additional icons (Bootstrap, FontAwesome, etc.)

### Build & Dev
- `vite` - Lightning-fast build tool
- `@vitejs/plugin-react` - React HMR support
- `eslint` - Code quality

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev      # Start Vite dev server
```

### Production Build
```bash
npm run build    # Optimized build
npm run preview  # Preview production build
```

### Code Quality
```bash
npm run lint     # Check code with ESLint
```

---

## 📊 Design Token Summary

| Token | Value | Category |
|-------|-------|----------|
| Border Radius | 1rem (16px) | Spacing |
| Blur Amount | 20px (glass), 100px (orbs) | Effects |
| Glow Opacity | 0.03 - 0.18 | Lighting |
| Animation Duration | 200ms - 600ms | Motion |
| Letter Spacing | -0.02em to 0.01em | Typography |
| Shadow Depth | 2-layer (object + environment) | Depth |

---

## 🎓 Design Inspiration

**Reference Platforms:**
- OpenAI ChatGPT (calm, focused interface)
- Figma (modern, professional SaaS)
- Linear (minimalist, dark mode)
- Arc Browser (futuristic but accessible)

**Design Approach:**
- Minimalist + Intentional
- Premium Glassmorphism
- Subtle Motion Design
- Professional Dark Mode
- Focus on Content

---

## 📝 Notes for Developers

1. **Always use CSS variables** for new styles
2. **Respect timing functions** - don't use linear animations
3. **Test on mobile** - responsive is mandatory
4. **Check accessibility** - focus states are critical
5. **Performance first** - test Lighthouse regularly
6. **Keep RTL in mind** - test both LTR/RTL layouts
7. **Respect motion preferences** - always include `@media (prefers-reduced-motion)`
8. **Use semantic HTML** - proper heading hierarchy, button vs link, etc.

---

## ✅ Checklist for Components

- [ ] Responsive design (mobile-first)
- [ ] Accessible focus states
- [ ] RTL layout tested
- [ ] Smooth animations (no linear)
- [ ] Performance optimized
- [ ] Dark mode only
- [ ] Keyboard navigation
- [ ] Color contrast ≥ 4.5:1
- [ ] Uses global CSS variables
- [ ] Tested on 60fps targets

---

**Version:** 1.0 (February 2026)  
**Last Updated:** February 15, 2026  
**Status:** Production Ready
