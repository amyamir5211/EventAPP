# Utsav App — Complete UI Theme Prompt
**For AI Coding Agent | Wedding & Celebration Platform**
**Theme Name: "Shaadi Shringaar" — Bridal Radiance**

---

## 🎯 Theme Direction

Build a **bright, warm, celebratory UI** inspired by the colours and textures of a traditional Indian wedding. Think freshly-strung marigold garlands, red bridal chooda, gold zari embroidery on silk, rose petals on a mandap floor, and diyas glowing at dusk. Every screen should feel like stepping into a beautifully decorated wedding venue — joyful, auspicious, and premium.

**Mood words:** Radiant · Auspicious · Festive · Warm · Celebratory · Shimmering · Joyful

**NOT:** Dark · Moody · Minimal · Cold · Corporate · Black backgrounds

---

## 🎨 Colour System

### Primary Palette — The Shaadi Colours

```css
:root {
  /* ── Primary Brand ── */
  --color-bridal-red:        #C0392B;   /* Deep red — sindoor, chooda, wedding saree */
  --color-bridal-red-light:  #FDECEA;   /* Blush tint for backgrounds */
  --color-bridal-red-mid:    #E8837A;   /* Soft red for hover states */

  /* ── Gold System ── */
  --color-gold:              #C9870A;   /* Rich wedding gold — zari, jewellery */
  --color-gold-bright:       #F0A500;   /* Bright marigold gold — CTAs, highlights */
  --color-gold-light:        #FEF9EC;   /* Warm gold tint — card backgrounds */
  --color-gold-mid:          #F5D47A;   /* Soft gold — borders, dividers */
  --color-gold-shine:        #FFE066;   /* Shiny gold — badges, premium tags */

  /* ── Pink / Rose System ── */
  --color-rose:              #D63F7A;   /* Deep rose — shagun, gifting screens */
  --color-rose-light:        #FDF0F5;   /* Blush — soft backgrounds */
  --color-rose-mid:          #F4A7C3;   /* Medium pink — sub-event tags, pills */
  --color-pink-soft:         #FFE4F0;   /* Baby pink — invite card backgrounds */
  --color-pink-pastel:       #FFF0F7;   /* Lightest pink — page background option */

  /* ── Yellow / Haldi System ── */
  --color-haldi:             #F5A623;   /* Turmeric yellow — Haldi sub-event */
  --color-haldi-light:       #FFFBEC;   /* Pale yellow — Haldi card background */
  --color-yellow-bright:     #FFD700;   /* Sunflower — stars, special badges */
  --color-marigold:          #FF9F1C;   /* Marigold orange — Sangeet, festive */

  /* ── White & Cream System ── */
  --color-white:             #FFFFFF;   /* Pure white — cards, modals */
  --color-ivory:             #FFFDF7;   /* Warm ivory — app background */
  --color-cream:             #FFF8EE;   /* Cream — section backgrounds */
  --color-parchment:         #FAF3E0;   /* Parchment — invite card base */

  /* ── Text System ── */
  --color-ink-dark:          #2C1810;   /* Deep warm brown — primary text */
  --color-ink-mid:           #6B3A2A;   /* Medium brown — secondary text */
  --color-ink-muted:         #A07060;   /* Muted warm — captions, hints */
  --color-ink-light:         #D4A896;   /* Very muted — placeholder text */

  /* ── Semantic / Sub-event Colours ── */
  --color-mehndi:            #5D8A3C;   /* Mehndi green */
  --color-mehndi-light:      #EAF4E0;
  --color-haldi-event:       #E8920A;   /* Haldi ceremony */
  --color-haldi-event-light: #FFF6E0;
  --color-sangeet:           #7B4FA6;   /* Sangeet purple */
  --color-sangeet-light:     #F3EDFB;
  --color-wedding:           #C0392B;   /* Wedding red */
  --color-wedding-light:     #FDECEA;
  --color-reception:         #1A7A5E;   /* Reception teal-green */
  --color-reception-light:   #E2F5EE;

  /* ── Border & Dividers ── */
  --color-border-default:    #F0D9C8;   /* Warm peach border */
  --color-border-gold:       #E8C87A;   /* Gold border — premium elements */
  --color-border-rose:       #F5C0D5;   /* Pink border — gifting flows */

  /* ── Shadows (warm-tinted) ── */
  --shadow-sm:   0 2px 8px rgba(192, 57, 43, 0.08);
  --shadow-md:   0 4px 20px rgba(192, 57, 43, 0.12);
  --shadow-lg:   0 8px 40px rgba(192, 57, 43, 0.16);
  --shadow-gold: 0 4px 20px rgba(201, 135, 10, 0.20);
}
```

### Colour Usage Rules

| Element | Colour to use |
|---|---|
| App background | `--color-ivory` |
| Card / surface background | `--color-white` |
| Section background | `--color-cream` or `--color-gold-light` |
| Primary CTA button | `--color-gold-bright` with white text |
| Secondary CTA button | `--color-bridal-red` with white text |
| Ghost / outline button | transparent + `--color-border-gold` border + `--color-gold` text |
| Primary text | `--color-ink-dark` |
| Secondary text | `--color-ink-mid` |
| Captions & hints | `--color-ink-muted` |
| Borders | `--color-border-default` (default) / `--color-border-gold` (premium) |
| Invite card background | `--color-parchment` with `--color-gold-mid` border |
| Shagun / gift screens | `--color-rose-light` background, `--color-rose` accents |
| Premium badges | `--color-yellow-bright` background, `--color-ink-dark` text |
| Success states | `--color-reception` (teal-green) |
| Warning / alert | `--color-haldi` (warm orange) |
| Error states | `--color-bridal-red` |

**NEVER use:** pure black backgrounds, dark grey surfaces, cool-toned greys (#808080 type), blue-tinted whites, or any colour that feels corporate or cold.

---

## 🔤 Typography System

### Font Pairing

```css
/* Import in <head> or global CSS */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap');
```

```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;  /* All headings, names, titles */
  --font-body:    'Nunito', 'DM Sans', sans-serif;      /* All body text, UI labels */
}
```

**Why these fonts:**
- **Playfair Display** has the warmth of wedding invitation calligraphy, renders couple names beautifully, and has beautiful italic styles perfect for names like *"Priya & Arjun"*
- **Nunito** is round, warm, and friendly — it does not feel corporate. Its rounded terminals match the celebratory mood

### Type Scale

```css
:root {
  /* Display — Playfair Display */
  --text-hero:    clamp(36px, 5vw, 52px);   /* Hero titles on landing/event page */
  --text-title:   clamp(28px, 4vw, 38px);   /* Page titles, couple names */
  --text-heading: clamp(22px, 3vw, 28px);   /* Section headings */
  --text-subhead: clamp(17px, 2vw, 20px);   /* Card titles, sub-section heads */

  /* Body — Nunito */
  --text-lg:   18px;   /* Large body, lead paragraphs */
  --text-base: 15px;   /* Default body copy */
  --text-sm:   13px;   /* Secondary info, venue details */
  --text-xs:   11px;   /* Labels, tags, timestamps */
  --text-xxs:  10px;   /* Fine print, metadata */

  /* Line heights */
  --leading-tight:  1.2;
  --leading-normal: 1.65;
  --leading-loose:  1.85;

  /* Letter spacing */
  --tracking-tight:  -0.02em;  /* Large display text */
  --tracking-normal:  0em;
  --tracking-wide:    0.08em;  /* Uppercase labels */
  --tracking-wider:   0.16em;  /* Decorative caps, section labels */
}
```

### Type Usage Rules

- All **event names, couple names, venue names, section headings** → `font-family: var(--font-display)`
- All **body copy, labels, buttons, inputs, nav links** → `font-family: var(--font-body)`
- Couple names always in **Playfair Display Italic** (`font-style: italic; font-weight: 400`)
- Uppercase labels use `letter-spacing: var(--tracking-wider)` and `font-size: var(--text-xxs)` with `text-transform: uppercase`
- **Never use font-weight 700+ on Playfair Display** — it gets too heavy. Use 500 for bold display.
- Body font weight: 400 regular, 500 medium (for UI elements), 600 semi-bold (sparingly)

---

## 🧩 Component Design System

### Border Radius

```css
:root {
  --radius-xs:   6px;    /* Small badges, chips */
  --radius-sm:   10px;   /* Input fields, small cards */
  --radius-md:   14px;   /* Cards, panels */
  --radius-lg:   20px;   /* Large cards, modals */
  --radius-xl:   28px;   /* Hero cards, feature sections */
  --radius-pill: 999px;  /* All buttons, tags, pills */
}
```

**Rule: All buttons are always pill-shaped (radius-pill). No rectangular buttons anywhere in the app.**

### Spacing Scale

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}
```

### Button System

```css
/* Primary — Gold (main CTAs: Create Event, RSVP, Book Venue) */
.btn-primary {
  background: var(--color-gold-bright);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  letter-spacing: 0.04em;
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  border: none;
  box-shadow: var(--shadow-gold);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: #D4920A;
  transform: translateY(-1px);
  box-shadow: 0 6px 24px rgba(201, 135, 10, 0.30);
}

/* Secondary — Red (important actions: Send Shagun, Confirm Booking) */
.btn-secondary {
  background: var(--color-bridal-red);
  color: #FFFFFF;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  padding: 12px 28px;
  border-radius: var(--radius-pill);
  border: none;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: #A93226;
  transform: translateY(-1px);
}

/* Ghost — outlined gold (secondary actions: View Details, Learn More) */
.btn-ghost {
  background: transparent;
  color: var(--color-gold);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: var(--text-sm);
  padding: 11px 28px;
  border-radius: var(--radius-pill);
  border: 1.5px solid var(--color-border-gold);
  transition: all 0.2s ease;
}
.btn-ghost:hover {
  background: var(--color-gold-light);
}

/* Soft — rose tinted (gifting actions: Add to Registry, Send Gift) */
.btn-soft-rose {
  background: var(--color-rose-light);
  color: var(--color-rose);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: var(--text-sm);
  padding: 11px 28px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-rose);
  transition: all 0.2s ease;
}

/* Icon button */
.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-default);
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-icon:hover {
  background: var(--color-gold-light);
  border-color: var(--color-border-gold);
}
```

### Card System

```css
/* Standard card */
.card {
  background: var(--color-white);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Premium card — gold bordered (venue listing, premium invite) */
.card-premium {
  background: var(--color-white);
  border: 1.5px solid var(--color-border-gold);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-gold);
}

/* Invite card — parchment styled */
.card-invite {
  background: var(--color-parchment);
  border: 1.5px solid var(--color-gold-mid);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  box-shadow: var(--shadow-gold);
  position: relative;
  overflow: hidden;
}
/* Inner decorative border on invite card */
.card-invite::before {
  content: '';
  position: absolute;
  inset: 10px;
  border: 0.5px solid rgba(201, 135, 10, 0.25);
  border-radius: calc(var(--radius-lg) - 4px);
  pointer-events: none;
}

/* Shagun card — rose pink */
.card-shagun {
  background: linear-gradient(135deg, var(--color-pink-soft) 0%, var(--color-rose-light) 100%);
  border: 1px solid var(--color-border-rose);
  border-radius: var(--radius-md);
  padding: var(--space-6);
}

/* Venue card */
.card-venue {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-default);
}
.card-venue .venue-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card-venue .venue-body {
  padding: var(--space-5) var(--space-6);
}
```

### Navigation Bar

```css
.navbar {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border-default);
  padding: 0 var(--space-8);
  height: 64px;
  display: flex;
  align-items: center;
  gap: var(--space-6);
  box-shadow: 0 2px 12px rgba(192, 57, 43, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Logo */
.navbar-logo {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 500;
  color: var(--color-ink-dark);
  letter-spacing: -0.02em;
}
.navbar-logo span {
  color: var(--color-gold-bright);  /* Accent letter in logo */
}

/* Nav links */
.navbar-link {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-ink-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-xs);
  transition: color 0.15s, background 0.15s;
}
.navbar-link:hover,
.navbar-link.active {
  color: var(--color-bridal-red);
  background: var(--color-bridal-red-light);
}
```

### Input Fields

```css
.input {
  width: 100%;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-ink-dark);
  background: var(--color-white);
  border: 1.5px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input::placeholder {
  color: var(--color-ink-light);
}
.input:focus {
  border-color: var(--color-gold-bright);
  box-shadow: 0 0 0 3px rgba(240, 165, 0, 0.15);
}

.input-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-ink-mid);
  margin-bottom: var(--space-2);
  display: block;
}
```

### Sub-Event Pills / Tags

```css
.pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  letter-spacing: 0.04em;
}

/* Each sub-event has its own colour identity */
.pill-mehndi    { background: var(--color-mehndi-light);        color: var(--color-mehndi);       }
.pill-haldi     { background: var(--color-haldi-event-light);   color: var(--color-haldi-event);  }
.pill-sangeet   { background: var(--color-sangeet-light);       color: var(--color-sangeet);      }
.pill-wedding   { background: var(--color-wedding-light);       color: var(--color-wedding);      }
.pill-reception { background: var(--color-reception-light);     color: var(--color-reception);    }

/* With dot indicator */
.pill::before {
  content: '';
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
```

### Badge / Tag System

```css
/* Premium / Verified badge */
.badge-premium {
  background: var(--color-yellow-bright);
  color: var(--color-ink-dark);
  font-size: var(--text-xxs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}

/* New badge */
.badge-new {
  background: var(--color-bridal-red);
  color: #FFFFFF;
  font-size: var(--text-xxs);
  font-weight: 700;
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: var(--radius-pill);
}

/* Info tag (capacity, date, etc.) */
.tag-info {
  background: var(--color-gold-light);
  color: var(--color-ink-mid);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--color-gold-mid);
}
```

---

## ✨ Decorative & Texture System

### Background Patterns

Use these subtle patterns to give screens texture and warmth. Apply very lightly (opacity 0.04–0.08).

```css
/* Diagonal fine grid — parchment texture feel */
.bg-pattern-grid {
  background-image: repeating-linear-gradient(
    45deg,
    var(--color-gold-mid) 0,
    var(--color-gold-mid) 0.5px,
    transparent 0,
    transparent 50%
  );
  background-size: 16px 16px;
  opacity: 0.05;
}

/* Dot grid — modern festive */
.bg-pattern-dots {
  background-image: radial-gradient(
    circle,
    var(--color-gold) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  opacity: 0.06;
}

/* Paisley-inspired diagonal lines */
.bg-pattern-lines {
  background-image: repeating-linear-gradient(
    -60deg,
    transparent,
    transparent 8px,
    rgba(201, 135, 10, 0.08) 8px,
    rgba(201, 135, 10, 0.08) 9px
  );
}
```

### Section Background Gradients

```css
/* Hero section — warm ivory to cream */
.bg-hero {
  background: linear-gradient(
    160deg,
    var(--color-ivory) 0%,
    var(--color-cream) 40%,
    var(--color-gold-light) 100%
  );
}

/* Invite / premium section — parchment glow */
.bg-invite {
  background: linear-gradient(
    135deg,
    var(--color-parchment) 0%,
    #FFFEF5 50%,
    var(--color-cream) 100%
  );
}

/* Shagun section — rose blush */
.bg-shagun {
  background: linear-gradient(
    135deg,
    var(--color-pink-pastel) 0%,
    var(--color-rose-light) 100%
  );
}

/* Feature highlight — warm white */
.bg-feature {
  background: linear-gradient(
    180deg,
    var(--color-white) 0%,
    var(--color-cream) 100%
  );
}
```

### Decorative Dividers

```css
/* Gold ruled line */
.divider-gold {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold-mid) 30%,
    var(--color-gold-bright) 50%,
    var(--color-gold-mid) 70%,
    transparent 100%
  );
  margin: var(--space-8) 0;
}

/* Ornamental divider with center motif */
.divider-ornament {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: var(--space-8) 0;
}
.divider-ornament::before,
.divider-ornament::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--color-gold-mid)
  );
}
.divider-ornament::after {
  background: linear-gradient(
    90deg,
    var(--color-gold-mid),
    transparent
  );
}
/* Place ✦ or ❧ character as the center motif */
```

---

## 🎬 Motion & Animation System

```css
/* Timing functions */
:root {
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy, festive */
  --ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);        /* Standard smooth */
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);       /* Deliberate */
}

/* Page / section entry — staggered fade up */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fadeUp 0.5s var(--ease-smooth) both;
}
/* Apply delays for stagger: animation-delay: 0s, 0.08s, 0.16s, 0.24s ... */

/* Card hover shimmer */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

/* Invite border draw */
@keyframes borderDraw {
  from { stroke-dashoffset: 1000; }
  to   { stroke-dashoffset: 0; }
}

/* Shagun coin float */
@keyframes coinFloat {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  50%  { transform: translateY(-20px) scale(1.1); opacity: 1; }
  100% { transform: translateY(-40px) scale(0.8); opacity: 0; }
}

/* Diya flicker (use on special screens) */
@keyframes flicker {
  0%, 100% { opacity: 1; transform: scale(1) rotate(-1deg); }
  50%       { opacity: 0.9; transform: scale(1.05) rotate(1deg); }
}

/* Pulse glow for gold CTAs */
@keyframes goldPulse {
  0%, 100% { box-shadow: var(--shadow-gold); }
  50%       { box-shadow: 0 4px 28px rgba(201, 135, 10, 0.40); }
}
.btn-primary {
  animation: goldPulse 2.5s ease-in-out infinite;
}

/* RSVP confirm checkmark draw */
@keyframes checkDraw {
  from { stroke-dashoffset: 100; }
  to   { stroke-dashoffset: 0; }
}
```

### Animation Rules

- All page loads: use `fadeUp` with 80ms stagger between cards
- Hover on cards: `translateY(-2px)` + shadow increase (200ms ease)
- All buttons: `transform: translateY(-1px)` on hover (150ms)
- Invite card opening: border draws with `borderDraw` animation
- Shagun send: coin floats up with `coinFloat` (600ms)
- RSVP confirmed: checkmark draws + brief green flash
- Sub-event tab switch: 200ms crossfade + pill slides
- Modal open: `fadeUp` 300ms + background overlay fades in 200ms
- **No animation duration above 600ms** — keep it snappy and joyful

---

## 🖼️ Iconography & Visual Language

### Icon Style
Use **Phosphor Icons** or **Tabler Icons** (outline style only). Size rules:
- Navigation icons: 20px
- Card action icons: 18px
- Decorative / feature icons: 24–28px
- Hero feature icons: 32–40px (inside coloured circle containers)

### Sub-Event Icon System

Each ceremony gets a **dedicated emoji + colour container** used consistently across the entire app:

| Ceremony | Icon | Container bg | Text colour |
|---|---|---|---|
| Mehndi | 🌿 | `--color-mehndi-light` | `--color-mehndi` |
| Haldi | 💛 | `--color-haldi-event-light` | `--color-haldi-event` |
| Sangeet | 🎵 | `--color-sangeet-light` | `--color-sangeet` |
| Baraat | 🐴 | `--color-bridal-red-light` | `--color-bridal-red` |
| Wedding | 🌸 | `--color-wedding-light` | `--color-wedding` |
| Reception | ✦ | `--color-reception-light` | `--color-reception` |
| Shagun | 🪙 | `--color-gold-light` | `--color-gold` |
| Memories | 📸 | `--color-cream` | `--color-ink-mid` |
| Venue | 🏛️ | `--color-cream` | `--color-ink-mid` |
| RSVP | ✉️ | `--color-pink-soft` | `--color-rose` |

```css
/* Icon container */
.icon-container {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
```

### Decorative Motifs
Use these Unicode characters as CSS content/text for ornamental moments (section separators, invite cards):
- `❧` — floral pointing hand (invite card top)
- `✦` — four-pointed star (section dividers, reception icon)
- `◈` — geometric (venue rating)
- `⁂` — asterism (footer, bottom of invite)
- `༺ ༻` — Tibetan ornaments (invite frame corners)

---

## 📐 Layout & Grid System

```css
/* App container */
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-8);
}

/* Section padding */
.section {
  padding: var(--space-16) 0;
}
.section-sm {
  padding: var(--space-10) 0;
}

/* Standard 12-column grid */
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}

/* Card grids */
.card-grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-6);
}
.card-grid-4 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-5);
}
.card-grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: var(--space-6);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile first */
:root {
  --bp-sm:  480px;   /* Large phones */
  --bp-md:  768px;   /* Tablets */
  --bp-lg:  1024px;  /* Small laptops */
  --bp-xl:  1280px;  /* Desktop */
  --bp-2xl: 1536px;  /* Wide screens */
}

/* Usage */
@media (max-width: 768px) {
  /* Stack to single column */
  /* Increase padding to space-5 minimum on cards */
  /* Reduce hero text by 20% */
  /* Full-width buttons on mobile */
}
```

---

## 🔑 Screen-Specific Guidelines

### Home / Landing Page
- Background: `bg-hero` gradient
- Hero text in Playfair Display, size `--text-hero`
- Floating decorative petals/marigold motifs in corners (SVG, very subtle)
- Feature cards in 3-column grid on desktop, 1-column on mobile
- CTA section: `bg-shagun` gradient with rose tones
- Footer: `--color-ink-dark` background, `--color-gold-mid` accent text

### Event Page (Couple's event microsite)
- Full-width header with couple names in Playfair Display Italic
- `card-invite` styling for the main invite card section
- Sub-event tabs with colour pills (mehndi green → haldi yellow → sangeet purple → wedding red → reception teal)
- Countdown timer in gold numerals on cream background
- RSVP section in rose-blush (`bg-shagun`)
- Google Maps embed with gold-bordered frame

### Shagun / Gifting Screen
- Entire screen background: `bg-shagun` gradient
- Digital envelope animation on send (CSS keyframes)
- Amount in Playfair Display, large, gold coloured
- "Send blessing" button: `btn-secondary` (red) — the moment should feel important
- Confirmation screen: rose background + floating coin animation

### Venue Listing Page
- Cards: `card-venue` with image-first layout
- Filter chips: pill-style with gold active state
- Premium/featured venue: `card-premium` with gold border
- Search bar: full-width, prominent, `border-color: var(--color-gold-bright)` on focus

### Dashboard (Host view)
- Sidebar or top nav in white with gold active state
- Stat cards: `bg-feature` with large Playfair Display numbers in gold
- Guest list table: warm striped rows (`--color-ivory` alternating with `--color-white`)
- Shagun ledger: rose-tinted rows for received amounts

---

## 🚫 Things To Never Do

1. **No dark/black backgrounds** anywhere except text on white surfaces
2. **No cool grey tones** — all greys must be warm (brownish, not bluish)
3. **No rectangular buttons** — always pill-shaped
4. **No Inter, Roboto, or Arial** — only Playfair Display + Nunito
5. **No blue colour accents** — this is not a tech app, it's a celebration platform
6. **No white text on light backgrounds** — maintain warm dark text on light surfaces
7. **No flat, purely white (#FFFFFF) backgrounds** for page-level surfaces — use ivory or cream
8. **No abrupt transitions** — all state changes must animate (200ms minimum)
9. **No generic stock-photo style placeholder images** — use warm, Indian-wedding-context imagery
10. **No corporate iconography** — no briefcase, no bar charts as primary icons

---

## ✅ Quick-Reference Cheatsheet

```
APP BACKGROUND:   #FFFDF7  (ivory)
CARD SURFACE:     #FFFFFF  (white)
SECTION BG:       #FEF9EC  (gold-light)

PRIMARY CTA:      #F0A500  (gold-bright)  → white text
SECONDARY CTA:    #C0392B  (bridal-red)   → white text
GHOST BUTTON:     transparent + #E8C87A border + #C9870A text

PRIMARY TEXT:     #2C1810  (ink-dark)
SECONDARY TEXT:   #6B3A2A  (ink-mid)
MUTED TEXT:       #A07060  (ink-muted)

BORDERS:          #F0D9C8  (default) / #E8C87A (gold)

DISPLAY FONT:     Playfair Display  (headings, names)
BODY FONT:        Nunito            (all UI text)

BORDER RADIUS:    Buttons → 999px  |  Cards → 14px  |  Inputs → 10px

SHADOWS:          sm: 0 2px 8px rgba(192,57,43,0.08)
                  md: 0 4px 20px rgba(192,57,43,0.12)
                  gold: 0 4px 20px rgba(201,135,10,0.20)
```

---

*Theme: Shaadi Shringaar v1.0 | Utsav App | Generated for AI coding agent handoff*
