# IronForge Gym Brand Guidelines & Design System

This document outlines the core design language, color palette, typography, and UI patterns used across the IronForge Gym ERP Portal. The aesthetic is defined as **"Premium Industrial Clinical"**—combining high-utility density with a gritty, high-performance feel.

---

## 🎨 Color Palette (Lime & Dark)

The project utilizes a high-contrast theme grounded in stark off-whites, deep industrial navies, and a vibrant "Electric Lime" accent to reflect an elite, high-energy fitness environment.

### Core Colors
*   **Primary (Electric Lime):** `#d4ff3d` (CSS: `--primary`)
    *   *Usage:* Primary call-to-action buttons, active navigation states, focus borders, and brand accents.
    *   *Hover:* `#bde635` (CSS: `--primary-hover`)
    *   *Glow:* `rgba(212, 255, 61, 0.2)`
*   **Secondary (Slate/Metal):** `#86868b` (CSS: `--secondary`)
    *   *Usage:* Supporting UI elements, secondary buttons, icons, and non-primary chart series.
*   **Neutral (Dark Navy/Obsidian):** `#1d1d2b` (CSS: `--bg-sidebar`)
    *   *Usage:* Sidebar backgrounds, dark-mode panels, and high-contrast containers.

### Feedback Colors
*   **Success (Pulse Green):** `#34c759` (CSS: `--success`)
*   **Danger (Aggressive Red):** `#ff3b30` (CSS: `--danger`)
*   **Warning (Warning Orange):** `#ff9500` (CSS: `--warning`)

### Neutral & Background Colors
*   **Background Base (Clinical Grey):** `#f7f7f5` (CSS: `--bg-dark`)
    *   *Usage:* Main application background. Provides a clean, paper-like surface for high-density data.
*   **Surface/Card Base:** `#ffffff` (CSS: `--bg-card`)
    *   *Usage:* Standard content panels and interactive cards.
*   **Border Light:** `#e6e6e9` (CSS: `--border-light`)
    *   *Usage:* Subtle dividers and component outlines.

### Typography Colors
*   **Text Primary:** `#1d1d1f` (CSS: `--text-primary`) - Headlines and critical data points.
*   **Text Secondary:** `#86868b` (CSS: `--text-secondary`) - Sub-headings and descriptive text.
*   **Text Muted:** `#afafb6` (CSS: `--text-muted`) - Placeholders and background metadata.

---

## ✍️ Typography

The application prioritizes clarity and density for an ERP experience.

*   **Primary Fonts:** `'Inter', 'Outfit', system-ui, sans-serif`
*   **Base Styling:** `font-size: 15px; line-height: 1.5;`
*   **Smoothing:** `-webkit-font-smoothing: antialiased`

### Heading Structure
*   **Heading 1 (`.heading-1`)**: Weight `800` (Extra Bold). Used for major dashboard landmarks.
*   **Heading 2 (`.heading-2`)**: Weight `700` (Bold). Used for section grouping.
*   **Heading 3 (`.heading-3`)**: Weight `600` (Semi-Bold). Used for specific card titles.

---

## 🪞 Core UI Patterns

### 1. The "Clinical Glass" System
Elements use a refined version of glassmorphism that favors high-utility over transparency.

*   **`.glass-panel`**: Used for large structural containers.
    *   Surface: White (`#ffffff`)
    *   Radius: `20px` (CSS: `--section-radius`)
    *   Shadow: Minimal `0 10px 15px -3px rgba(0, 0, 0, 0.03)`.
*   **`.glass-card`**: Used for repeating data items.
    *   Radius: `16px` (CSS: `--card-radius`)
    *   Hover Interaction: `translateY(-2px)` with a deeper shadow and a border-color transition to Electric Lime.

### 2. Button Hierarchy
*   **Primary Action**: Electric Lime background with black text (`#000000`) to ensure maximum accessibility and "pop."
*   **Icon Buttons**: Circular or softly rounded, using Lucide icons. Focus on immediate recognition and minimal footprint.
*   **Radius**: Standardized between `12px` and `24px` depending on the surrounding density.

### 3. Data Visualization
*   **Library**: Recharts.
*   **Standard Styling**: Area charts use Lime gradients (`rgba(212, 255, 61, 0.3)` down to transparent). 
*   **Grids**: Cartesian grids use `var(--border-light)` with horizontal-only lines to reduce visual noise.

---

## 📐 Layout & Density

*   **Sidebar Width**: `18%` (Fluid dashboard layout).
*   **Header Height**: `80px` (Large header with scroll-based "glass" sticky effect).
*   **Transitions**:
    *   Fast: `0.15s cubic-bezier(0.4, 0, 0.2, 1)` for immediate feedback.
    *   Normal: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for layout changes.