# Apex: Concise AI Prompt

```
PROJECT: Apex - Personal Growth & Self-Development Platform

=== CORE IDENTITY ===
• Dark mode AI SaaS platform (advanced, intelligent, calm)
• Persian RTL website for judges/professional reviewers
• Premium, sophisticated, futuristic WITHOUT cyberpunk
• Deep focus on mental growth & self-development

=== TECH STACK ===
React 19 | Vite | Tailwind CSS + RTL | Axios | React Router

=== COLOR SYSTEM ===
BACKGROUND:
  #0d1117 (Primary) | #161b22 (Secondary) | #21262d (Tertiary)

GRADIENTS:
  Purple → Cyan: #a855f7 → #22d3ee

TEXT:
  #ffffff (Primary) | #8b949e (Secondary) | #6e7681 (Muted)

LIGHTING (Orbs):
  #6366f1 (Indigo) | #a855f7 (Purple)

=== TYPOGRAPHY ===
Font: DINNextArabic (primary) > Vazirmatn > system sans-serif
Sizing: h1 clamp(2rem, 5vw, 3.5rem) | h2 clamp(1.5rem, 4vw, 2.5rem)
RTL: letter-spacing -0.02em titles, +0.01em secondary text
Line-height: 1.7 body, 1.1-1.3 headings

=== ANIMATION TIMING ===
Subtle: cubic-bezier(0.4, 0, 0.2, 1)
Smooth: cubic-bezier(0.34, 1.56, 0.64, 1)
Controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94)

Durations: 200ms (fast) | 350ms (base) | 600ms (slow)

=== KEY COMPONENTS ===
.glass:
  - 20px blur, rgba(255,255,255,0.04) background
  - Border: rgba(255,255,255,0.12)
  - Hover: translateY(-4px) + purple/cyan glow
  - Soft inner glow gradient

.gradient-text:
  - Linear purple→cyan, animated 8s gradient shift
  - Drop-shadow glow effect
  - Premium feel, not basic

.orb/.orb-1/.orb-2:
  - Breathing animation (orbBreathe 7-9s)
  - Glow layer (orbGlow 6s)
  - Scale 1→1.05, opacity 0.12→0.18
  - Organic, living background feel

=== PREMIUM ADDITIONS ===
✓ Neural grid (background, 60px spacing, animated)
✓ Mouse glow (desktop only, radial gradient)
✓ Section divider (gradient line)
✓ Hover lift utility (translateY -6px)
✓ Scroll reveal (fade+slide entrance, staggered)
✓ Premium scrollbar (gradient purple→cyan)

=== ANIMATIONS ===
pageFade: 350ms entrance animation
gradient-text: 8s infinite color shift + glow
orbs: 7-9s breathing effect with glow
scroll-reveal: 600ms staggered entrance (100ms between children)
grid: 20s infinite subtle shift

=== ACCESSIBILITY ===
✓ Focus states: 2px purple ring around all interactive
✓ Reduced motion: @media (prefers-reduced-motion: reduce)
✓ Color contrast: ≥ 4.5:1 WCAG AA
✓ Keyboard nav optimized
✓ Semantic HTML required
✓ Touch targets ≥ 44px

=== DESIGN PHILOSOPHY ===
"Intelligent, not flashy. Calm, focused, professional."

DO:
  ✓ Subtle animations (breathing, gentle fades)
  ✓ Generous white space
  ✓ Consistent depth (glass + orbs + shadows)
  ✓ Purposeful gradients
  ✓ Crystal clear hierarchy

DON'T:
  ✗ Neon abuse (muted colors only)
  ✗ Visual chaos (minimal elements)
  ✗ Gaming effects (sophisticated, not playful)
  ✗ Aggressive motion (smooth & controlled)
  ✗ Ignore accessibility (motion, contrast)

=== PAGES ===
Home (landing) | Dashboard (hub) | Goals (tracking) | Tasks (management)
AiChat (LLM interface) | Login (auth) | Profile (user settings) | 404

=== PERFORMANCE TARGETS ===
FCP: <1.5s | LCP: <2.5s | CLS: <0.1 | Lighthouse: ≥95

=== RTL SPECIFICS ===
• direction: rtl on html
• RTL-aware layout (Tailwind RTL plugin)
• Persian/Arabic font support
• Letter-spacing optimized for RTL readability

=== BRAND VOICE ===
Advanced AI mental-growth platform. Trustworthy, not gimmicky.
Sophisticated futurism. Deep contemplation encouraged.
Professional tone. Judge-level impressive.
```

---

## Quick Reference: CSS Variable System

```css
/* Use these in all new styles */
:root {
  --color-bg-primary: #0d1117;
  --color-bg-secondary: #161b22;
  --color-gradient-start: #a855f7;
  --color-gradient-end: #22d3ee;
  --color-text-primary: #ffffff;
  --color-text-secondary: #8b949e;
  --color-text-muted: #6e7681;
  
  --timing-subtle: cubic-bezier(0.4, 0, 0.2, 1);
  --timing-smooth: cubic-bezier(0.34, 1.56, 0.64, 1);
  --timing-controlled: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  --duration-fast: 200ms;
  --duration-base: 350ms;
  --duration-slow: 600ms;
}
```

---

## Quick Component Templates

**Premium Card:**
```jsx
<div className="glass hover-lift p-6">
  <h3 className="gradient-text">Title</h3>
  <p className="text-secondary">Description</p>
</div>
```

**Scroll Reveal:**
```jsx
<section className="scroll-reveal">Content here</section>
```

**Text Hierarchy:**
```jsx
<h1 className="gradient-text">Main</h1>
<p className="text-primary">Primary</p>
<p className="text-secondary">Secondary</p>
<p className="text-muted">Muted</p>
```

---

## Implementation Checklist

- [ ] Use CSS variables for colors
- [ ] No linear animations (use cubic-bezier)
- [ ] Include focus states (purple ring)
- [ ] Test on mobile (responsive mandatory)
- [ ] Check accessibility (Lighthouse ≥90)
- [ ] RTL layout tested
- [ ] Respect motion preferences
- [ ] No font family changes
- [ ] Glass morphism for panels
- [ ] Smooth micro-interactions

---

**This is your complete design system. Copy/share this prompt to brief developers or AI systems on brand standards, color system, animation approach, and component structure.**
