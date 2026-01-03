# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based web project demonstrating GSAP (GreenSock Animation Platform) animations, specifically featuring a scroll-driven canvas animation with image sequences and text effects.

## Development Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server at localhost:4321
npm run build           # Build production site to ./dist/
npm run preview         # Preview production build locally
```

## Technology Stack

- **Astro 5.10.2**: Static site framework
- **GSAP 3.13.0**: Animation library with ScrollTrigger and SplitText plugins
- **Tailwind CSS 4.1.11**: Utility-first CSS framework (v4 with Vite plugin)

## Project Architecture

### File Structure

```
src/
├── layouts/
│   └── Layout.astro      # Base layout with global CSS import, sets lang="es"
├── pages/
│   └── index.astro       # Main page with canvas animation
└── styles/
    └── global.css        # Tailwind import + custom fonts

public/
├── fonts/                # Custom font files (kulture.otf)
├── secuencia/            # Image sequence frames (web_00000.png - web_00149.png)
└── favicon.svg
```

### GSAP Animation Pattern

The project uses a scroll-driven canvas animation pattern:

1. **Canvas Image Sequence**: 150 PNG frames (`/secuencia/web_00000.png` to `web_00149.png`) rendered to a fixed-position canvas (1920x1080) that animates on scroll
2. **ScrollTrigger Integration**: Animates through frames using `scrollTrigger: { scrub: 0.5 }` for smooth scroll-tied playback
3. **SplitText Animation**: The `.title-agency` heading uses SplitText to split text into words and animates them individually with blur and opacity effects
4. **Timeline Coordination**: Multiple animations are coordinated via `gsap.timeline()` with stagger effects

### Styling Approach

- Base layout uses Tailwind with black background (`bg-black`)
- Custom font "kulture" loaded via `@font-face` in global.css
- Component-specific styles use Astro's scoped `<style>` blocks
- Fixed positioning pattern for canvas and title overlay (centered with transform translate)

### GSAP Plugin Usage

GSAP plugins must be imported from `gsap/all` and registered:

```javascript
import { SplitText, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);
```

Note: SplitText is a premium GSAP plugin requiring a valid license for production use.

## Configuration

- **Astro Config**: Tailwind CSS v4 integrated via Vite plugin (`@tailwindcss/vite`)
- **Language**: Site set to Spanish (`lang="es"`)
- **Asset Paths**: Static assets referenced from `/public` directory (e.g., `/fonts/`, `/secuencia/`)

## Key Implementation Details

### Image Sequence Loading

Images are preloaded in a loop and stored in an array. The first image's `onload` triggers the initial render:

```javascript
const frames = 150;
const currentFrame = (index) => `/secuencia/web_${String(index).padStart(5, "0")}.png`;
```

### Scroll Animation Setup

The hero container has `height: 300vh` to create scroll space. ScrollTrigger animates through the frame sequence as the user scrolls.

### Canvas Rendering

Canvas is fixed-positioned and centered, with `clearRect()` and `drawImage()` updating on each frame change driven by GSAP's `onUpdate: render` callback.
