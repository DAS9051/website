# Updating Résumé Content

All portfolio copy lives in `content/resume.json`. Updating this file automatically refreshes the terminal experience and scrollable résumé because the app validates and loads the JSON at build time.

## Editing Steps
1. Open `content/resume.json`. Each top-level key matches a section in the site (`about`, `experience`, `projects`, etc.).
2. Modify or add entries. Keep IDs stable for existing items so deep links and command routing continue to work.
3. Run `npm run validate-content` to ensure the JSON passes schema validation. The script prints detailed errors with the failing path if something is wrong.
4. Start the dev server (`npm run dev`) to preview the changes locally.

## Validation Rules (Zod Schema)
- **Contact**: must include a valid email, phone string, location, and `links` with `label` + valid URL.
- **Experience & Projects**: require `id`, `title/name`, and supporting fields like `summary`, `achievements`, and `tech` arrays.
- **Dates**: `range.start`/`range.end` are plain strings, and `label` is optional.
- **Skills/Certifications**: simple label + string arrays.
- **Meta**: contains `tagline`, `location`, `availability`, and `lastUpdated`.

If validation fails, update the JSON and rerun the script. Because the schema is enforced at runtime, Next.js will also fail fast during `npm run dev` or `npm run build` if the content is invalid.

