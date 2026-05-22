# Junbao Liang — Personal Website

Static single-page site for job applications. No framework, no build step — just `index.html`, `styles.css`, `main.js`, and the `assets/` folder.

## Local preview

```bash
cd /Users/junbao/Documents/personal_website
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` directly in a browser also works, but the local server is closer to the deployed environment (and avoids any future CORS quirks).

## Deploy to GitHub Pages

This is set up as a **user site** — it lives at `https://junbaoliang.github.io`.

1. Create a new public repo on GitHub named **exactly** `JunbaoLiang.github.io`.
2. From this directory:

   ```bash
   git init
   git add .
   git commit -m "initial site"
   git branch -M main
   git remote add origin https://github.com/JunbaoLiang/JunbaoLiang.github.io.git
   git push -u origin main
   ```

3. In the repo on GitHub, go to **Settings → Pages**. Set source to **Deploy from a branch**, branch **`main`**, folder **`/ (root)`**, save.
4. After ~1 minute the site is live at https://junbaoliang.github.io.

The empty `.nojekyll` file in the repo root prevents GitHub Pages from running Jekyll on the files.

## Placeholders to swap in

These are wired up but pointing at placeholders:

| Placeholder | Where | What to do |
| --- | --- | --- |
| `assets/headshot.svg` | hero portrait | Replace with `assets/headshot.jpg` (any name works — update the `<img src>` in `index.html`). A 4:5 portrait around 800×1000 px looks good. |
| `LINKEDIN_URL_HERE` | nav + contact | Paste your full LinkedIn URL (search & replace in `index.html`). |
| `SCHOLAR_URL_HERE` | nav + contact | Paste your Google Scholar profile URL. |
| `DOI_HERE` | publications section | Paste the DOI link for the Protein Science 2025 paper. |

## Updating content

- **Add a project:** copy one of the `<article class="card">` blocks in `index.html` and edit the inner content.
- **Add a publication:** append a new `<li class="pub">` to `<ol class="pub-list">`.
- **Update the CV PDFs:** drop new files into `assets/cv-ml.pdf` and `assets/cv-mm.pdf` (overwrite).

## Notes on the design

- Dark theme is default; users can toggle to light. Preference persists via `localStorage`.
- Typography: Instrument Serif (display) + Geist (body) + JetBrains Mono (labels), loaded from Google Fonts.
- Accent color is phosphor-green in dark mode, evergreen in light mode.
- All interactive elements have visible focus rings and `aria-label`s on icon-only buttons.
