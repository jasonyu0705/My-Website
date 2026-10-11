# Minimal personal website

A single-page React website inspired by your reference: generous whitespace, muted labels, mint links, and a persistent light/dark switch. Uses esbuild with no Vite, backend, or database.

## Run locally

Requires Node.js 22.9 or newer for the build tools.

```sh
npm install
npm run dev
```

Open http://localhost:3000. React and CSS changes rebuild automatically; refresh your browser to see them. Restart the dev command after editing files in `public/`.

## Make it yours

Edit `src/profile.js` to replace the sample name, bio, current activity, GitHub, LinkedIn, email, resume URL, and portfolio URL. All displayed personal details and links are sample placeholders.

You can place your own resume in `public/resume.pdf` and set `resumeUrl` to `/resume.pdf`. Use your portfolio's URL for `portfolioUrl`. Add a second email with `secondaryEmail`, or leave it empty.

Style the page in `src/styles.css`. The layout switches to stacked rows on mobile. Theme choice is saved in the visitor's browser and defaults to their system preference.

## Build and deploy

```sh
npm run build
```

The `dist/` folder is ready for a static host. No application server or database is required. Build again after changing your profile.
