# GymSync Brand Guidelines & Design System

This document outlines the core design language, color palette, typography, and UI patterns used across the GymSync ERP Portal to maintain consistency and a premium aesthetic.

---

## 🎨 Color Palette

The project utilizes a light, modern theme grounded in soft creams and vibrant, energetic accents to reflect a high-end fitness brand.

### Core Colors
*   **Primary (Teal):** `#0d9488`
    *   *Usage:* Primary buttons, active nav links, focus borders, primary gradients.
    *   *Hover:* `#0f766e`
    *   *Glow:* `rgba(13, 148, 136, 0.25)`
*   **Secondary (Orange/Mustard):** `#f6ad55`
    *   *Usage:* Gradients, chart accents, secondary highlights (e.g., active days in schedules).
*   **Accent (Darker Orange):** `#f5a623`
    *   *Usage:* Warnings, premium badges.

### Feedback Colors
*   **Success (Green):** `#48bb78`
    *   *Usage:* Success badges, positive growth metrics.
*   **Danger (Red):** `#f56565`
    *   *Usage:* Delete buttons, error states, logout hovers.
    *   *Hover:* `#e53e3e`

### Neutral & Background Colors
*   **Background Base (Cool Off-White):** `#f8fafc`
    *   *Usage:* Main application background behind cards. Gives a crisp, high-contrast premium feel.
*   **Surface/Card Base:** `#ffffff`
    *   *Usage:* Sidebars, main content panels, glass cards.
*   **Border Light:** `#e2e8f0`
    *   *Usage:* Dividers, inactive input borders, card outlines.

### Typography Colors
*   **Text Primary:** `#0f172a` (Slate 900) - Main headings and heavy body copy.
*   **Text Secondary:** `#64748b` (Slate 500) - Subtitles, secondary body copy, standard navigation items.
*   **Text Muted:** `#94a3b8` (Slate 400) - Placeholder text, minor labels, disabled states.

---

## ✍️ Typography

The application uses modern, clean sans-serif typefaces to ensure readability and a tech-forward look.

*   **Primary Fonts:** `'Inter', 'Outfit', system-ui, sans-serif`
*   **Base Styling:** `-webkit-font-smoothing: antialiased; font-size: 15px;` (Density scaling for desktop apps)

### Heading Structure
*   **Heading 1 (`.heading-1`)**: `2.25rem`, Weight `800` (Extra Bold), Letter-spacing `-0.03em`. Used for main page titles (e.g., "TRAINERS PAGE MANAGER").
*   **Heading 2 (`.heading-2`)**: `1.5rem`, Weight `700` (Bold), Letter-spacing `-0.02em`. Used for section titles or modal headers.
*   **Heading 3 (`.heading-3`)**: `1.125rem`, Weight `700` (Bold), Letter-spacing `-0.01em`. Used for card titles or smaller sub-sections.
*   **Text Gradient (`.text-gradient`)**: A linear gradient from Primary (`#52b7a6`) to Secondary (`#f6ad55`) clipped to the text. Used for emphasis or brand moments.

---

## 🪞 Core UI Patterns

### 1. Glassmorphism & Cards
The dominant visual style is "clean glassmorphism." Elements sit on the cream background using stark white backgrounds with very subtle borders and soft shadows.

*   **`.glass-panel`**: Used for large structural containers (modals, hero containers, headers).
    *   Background: `#ffffff`
    *   Border: `1px solid #f1f5f9`
    *   Border Radius: `20px`
    *   Shadow: Soft, low-opacity layered shadow.
*   **`.glass-card`**: Used for repeating grid items (stat cards, trainers, testimonials).
    *   Border Radius: `16px`
    *   Interaction: On hover, cards smoothly translate up (`-2px` to `-4px`) and project a larger, softer shadow while the border subtly highlights.

### 2. Buttons
*   **Shape:** Pill-shaped (`border-radius: 24px` to `border-radius: 9999px`) for primary actions, or softly rounded (`8px` to `12px`) for secondary card actions.
*   **Primary Button (`.btn-primary`)**: Solid Teal (`#52b7a6`) with white text. Features a custom colored drop-shadow (`0 4px 10px rgba(82, 183, 166, 0.3)`) that expands on hover alongside a slight upward translation.
*   **Icon Buttons**: Usually circular, background transparent fading to a slight gray `rgba(0,0,0,0.05)` or primary tint on hover.

### 3. Inputs & Forms
*   **Base:** Very light gray backgrounds (`#f8fafc`) with light borders (`#f1f5f9`).
*   **Shape:** Substantially rounded (`border-radius: 12px`).
*   **Focus State:** Background turns pure white, border turns Primary Teal (`#52b7a6`), and a soft teal ring shadow appears.

### 4. Interactive Toggles & Pills
*   **Badges:** Used to categorize sections (e.g., "TRAINERS", "TESTIMONIALS"). They feature a very light background tint of the text color (e.g., light blue background with dark blue text) and a solid colored dot.
*   **Visibility Toggles:** Custom CSS toggles (e.g., eye icons). Inactive states are grey; active states turn Primary Teal (`var(--primary)`).

### 5. Scrollbars
*   Custom webkit scrollbars are implemented for scrollable areas (Sidebars, Modals).
*   **Width:** Thin (`6px` to `8px`).
*   **Thumb:** Muted slate (`#cbd5e1` or `#e2e8f0`), rounded (`10px`). Looks minimal and doesn't distract from the glass UI.

---

## 📐 Layout & Spacing

*   **Sidebar Width:** `250px`
*   **Header Height:** `70px`
*   **Page Container (`.page-container`)**:
    *   Padding: `2.5rem`
    *   Max-width constraint: `1400px` centered.
*   **Grid Gaps:** Standardized to `1.5rem` or `2rem` between cards.
*   **Transitions:**
    *   Fast (`--transition-fast`): `0.15s ease-in-out` (Hovers, color changes, input focus).
    *   Normal (`--transition-normal`): `0.3s ease-in-out` (Layout shifts, modal opens, card lifts).