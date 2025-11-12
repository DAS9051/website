# Project Scope

## Ordered Task Plan

1. [x] **Solidify Content & Accessibility Strategy**
   - Finalize résumé sections, command taxonomy, and wording for both terminal output and fallback view.
   - Define accessibility measures (screen-reader flow, ARIA roles, keyboard navigation, non-terminal explanations).

2. [x] **Design System & Interaction Blueprint**
   - Establish terminal-inspired visual language (colors, typography, spacing, cursor/typing animations).
   - Sketch layout for hybrid view combining terminal interface with traditional scrollable sections and dedicated contact area.

3. [x] **Initialize Next.js Codebase**
   - Create Next.js (App Router) project with TypeScript support.
   - Configure Tailwind CSS (or CSS Modules) and global styles supporting the terminal theme.
   - Set up base project structure (`app` directory, shared components, content data modules).

4. [x] **Model Résumé Data**
   - Encode Education, Experience, Projects, Certifications, and Skills into structured TypeScript data objects.
   - Provide utilities to format data for both terminal command responses and UI components.

5. [x] **Build Terminal Interface**
   - Implement command-line component with input parsing, history, autocomplete, and help output.
   - Connect commands to render respective résumé sections and dedicated contact information.

6. [x] **Implement Fallback & Hybrid Layout**
   - Create accessible scrollable section layout mirroring command outputs.
   - Ensure synchronization between terminal interactions and visible sections; add explanatory copy for non-technical users.

7. [x] **Enhance Experience**
   - Add subtle animations (typing effect, prompt cursor), responsive behavior, and print-friendly résumé export.
   - Configure SEO metadata and social preview tags.

8. [ ] **Testing & Polish**
   - Run Lighthouse (desktop & mobile) plus axe scans; document findings and address high-priority issues.
   - Verify keyboard navigation, reduced-motion behavior, and print layout.
   - Perform cross-browser checks (Chrome, Safari, Firefox) to confirm hybrid interactions.
   - Confirm `npm run build` passes and outline deployment steps (e.g., Vercel).

## Key Considerations

- Balance UNIX aesthetics with clarity for non-technical visitors by surfacing plain-language summaries alongside command outputs.
- Keep palette minimal and high-contrast to maintain terminal authenticity while ensuring readability.
- Maintain modular content data to simplify future updates or integration with GitHub projects when needed.
