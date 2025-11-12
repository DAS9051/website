## Design System & Interaction Blueprint

### Visual Language
- **Palette**
  - Background: `#0b0d12` (near-black navy) with optional subtle noise texture.
  - Primary text: `#e8f1ff`.
  - Accent (prompt, highlights, links): `#5eead4` (teal) and `#f472b6` (secondary) with WCAG AA contrast.
  - Divider/grid lines: `rgba(94, 234, 212, 0.12)` for terminal frame outlines.
- **Typography**
  - Primary face: `JetBrains Mono` (or `Fira Code`) for authenticity.
  - Fallback: `Menlo, Monaco, Consolas, "Courier New", monospace`.
  - Heading treatment: uppercase, increased letter spacing; use consistent font-size scale (clamp-based).
- **Layout**
  - Container max width 1100px with generous padding to mimic terminal window.
  - Use CSS grid to position terminal pane left/top and scrollable cards beneath.
  - Incorporate faux window chrome: subtle bars, tab-like labels (e.g., `[ dylan.sh ]`).
- **Iconography**
  - Minimal; rely on ASCII-style symbols (`>`, `•`, `│`). Use lucide icons sparingly for clarity (copy link, external arrow) with simple outlines.
- **Motion**
  - Cursor blink at 750ms; typing animation for intro lines using CSS step animation.
  - Slide/fade transitions for command output with `prefers-reduced-motion` guard.

### Terminal Interface Blueprint
- **Prompt Structure**
  - Format: `dylan@shell:~$` with accent color on username; dynamic path when drill-down commands executed (e.g., `projects/portfolio`).
  - Input element hidden by default but accessible via `aria-label="Command input"`.
- **Command Handling**
  - Autocomplete suggestions appear inline ghost text; `Tab` cycles.
  - Command history navigable with `ArrowUp/ArrowDown`.
  - Unknown command response: “Command not found. Type `help` to list actions.”
  - Typing helper chips below prompt for click-to-insert commands.
- **Output Rendering**
  - Use card-like blocks within terminal with horizontal rule separators, keeping max width for readability.
  - Prepend each output with summary sentence; align key-value data with ASCII tables.
  - Provide copy-to-clipboard for contact info via inline button.
- **Status Indicators**
  - Command execution shows subtle spinner when data loads (future GitHub integration).
  - Display `Last updated` timestamp derived from build date.

### Hybrid Layout Blueprint
- **Structure**
  - Sticky terminal pane at top on desktop; on mobile, terminal transforms into collapsible sheet above sections.
  - Section order: About → Experience → Projects → Education → Certifications → Skills → Contact.
  - Each section includes: heading, command tag (e.g., `Command: about`), summary, detailed content.
- **Navigation Aids**
  - Chip row with commands mirrored; clicking triggers both terminal output and scroll to section.
  - Global keyboard shortcut `Shift+/` opens overlay cheat sheet listing commands and navigation tips.
  - Back-to-top button with caret icon; accessible `Skip terminal` link after hero.
- **Onboarding Banner**
  - Content: “New here? Scroll for the full résumé or type `help` to explore via the terminal interface.”
  - Include dismissible info icon; store state in local storage to hide after acknowledgment.

### Accessibility & Responsiveness
- Minimum font size 16px; ensure line height ≥ 1.5.
- Provide descriptive `aria-live` updates when command output changes.
- Ensure contrast for accent colors on dark background; test with color-blind simulator.
- Mobile layout uses stacked sections with terminal collapsing to command carousel.
- Provide print stylesheet removing animations, setting light background, and listing sections sequentially.

### Assets & Implementation Notes
- Install `@fontsource/jetbrains-mono` for self-hosted typography.
- Centralize design tokens (`colors`, `spacing`, `shadows`) in `styles/tokens.ts`.
- Use CSS custom properties for theming; allow future toggle to light mode if desired.
- Build command list as JSON to drive both terminal and UI chips.
- Document keyboard shortcuts in `README.md` once implemented.

