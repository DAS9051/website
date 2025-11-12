## Content & Accessibility Strategy

### Core Narrative
- **Persona:** Dylan Sahota, Infrastructure Architect and ML-focused developer; target audiences include tech recruiters and non-technical stakeholders.
- **Tone:** Confident, concise, technically proficient with approachable language for non-technical visitors.
- **Primary Goals:** Showcase infrastructure/automation expertise, highlight leadership (VP Web Dev), and surface projects aligned with AI/quant finance interests.

### Section Overviews
- **Intro Prompt:** Quick greeting (`dylan@shell:~$`) explaining the site works like a terminal; provide immediate hint that buttons and scrolling are available for anyone unfamiliar with CLI.
- **About:** 3–4 sentence summary covering current role at SamaritanApps, academic status at University of Toronto, and focus on scalable cloud + ML solutions.
- **Experience:** Ordered chronologically with role, org, dates, and 1–2 bullet achievements each (Infrastructure Architect, VP Web Development, Machine Learning Developer & Researcher, Software Developer).
- **Projects:** Three spotlight projects from résumé with brief context + technology stack; ensure language clarifies problem, solution, impact.
- **Education:** University of Toronto entry with program details and expected graduation.
- **Certifications:** List CompTIA Linux+, CompTIA Security+, Google Data Analytics Certificate with issue dates.
- **Skills:** Categorize into Languages, Frameworks, Tools & Technologies, Libraries mirroring résumé; present as comma-separated lists for readability.
- **Contact:** Provide email, LinkedIn, GitHub; invite visitors to reach out for collaborations or opportunities.

### Command Taxonomy (Terminal View)
- `help` — Display available commands and tips for first-time visitors.
- `about` — Show About summary.
- `experience` — Render full experience timeline; subcommands `experience infra`, `experience vp`, `experience ml`, `experience software` show focused entries.
- `projects` — List all projects with brief summaries. Subcommands `projects portfolio`, `projects chess`, `projects admin` provide deep dives.
- `education` — Show education details.
- `certifications` — Show certifications list.
- `skills` — Present categorized skills.
- `contact` — Show contact info and quick action links (mailto, LinkedIn, GitHub).
- `clear` — Clear terminal output.
- `toggle` — Switch between terminal-only mode and hybrid view.
- `scroll` — Open fallback scrollable view (mirrored content) for non-CLI navigation.
- `download resume` (stub) — Provide instructions for downloading PDF version when implemented.

### Hybrid / Fallback Layout
- Persistent instruction banner clarifies that content is also available by scrolling or clicking command chips.
- Section cards mirror terminal responses with semantic headings (`<section>` with `aria-labelledby`).
- Include command chips beneath terminal area enabling click-to-run commands.
- Provide “Skip to content” link for screen readers leading to main scrollable layout.

### Accessibility Considerations
- **Semantic Structure:** Use `<main>`, `<nav>`, `<section>`, `<header>`; associate terminal output with `aria-live="polite"` for command responses.
- **Keyboard Navigation:** Ensure focus management when executing commands; maintain obvious focus outlines; support keyboard shortcuts (`Ctrl+L`, `Tab`) without trapping focus.
- **High Contrast:** Dark background with light text; verify WCAG AA contrast; configurable accent color with sufficient contrast.
- **Animations:** Typing and cursor effects kept subtle with `prefers-reduced-motion` respect.
- **Language Clarity:** Each terminal response includes a leading plain-language sentence explaining the content before listing technical bullet points.
- **Error Handling:** Friendly message for unknown commands suggesting `help`.

### Onboarding Cues
- Default terminal output includes short tutorial (e.g., “Type `help` or click a command below”) and highlights that a full scrollable résumé follows.
- Show keyboard shortcut hints (`Tab` autocomplete, `↑` history) along with clickable icons.
- For mobile users, provide an on-screen command list and ensure virtual keyboard doesn’t obstruct content.

### Content Maintenance Notes
- Store all résumé data in `data/resume.ts` as structured objects.
- Keep command metadata in `data/commands.ts` to avoid duplication between terminal and fallback views.
- Provide a single source for contact information to ensure consistency across terminal, footer, and metadata.

