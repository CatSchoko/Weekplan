# Wochenplan

A fully customizable weekly planner you can install as an app on any device. Organize your week with color-coded categories, recurring appointments, drag-and-drop time slots, and date-range highlighting — all stored locally and usable offline.

Built with React + Vite, installable as a Progressive Web App (PWA), with automatic deployment to GitHub Pages.

## Features

- **Custom time slots** — add, rename, and reorder rows via drag & drop instead of a fixed schedule
- **Categories** — create color-coded labels (e.g. "Vacation", "Work", "Gym") and paint individual cells, whole days, or entire date ranges spanning multiple weeks
- **Recurring appointments** — fixed weekly events (e.g. "Mon 09:00 Team meeting") that automatically show up every week, independent of categories
- **Descriptions** — collapsible detail field on every time slot for extra notes beyond the short title
- **Week continuation** — carry the current week's layout forward into any number of upcoming weeks
- **Custom theme** — pick any accent, background, and text color via a built-in color picker; rainbow color wheel available for categories and appointments too
- **File export** — download the current week as a clean, print-ready HTML file (great for turning into a PDF)
- **Today highlight** — the current weekday column is subtly highlighted so you always know where you are
- **Offline-first** — installs like a native app (own icon, fullscreen, no browser chrome) and keeps working without a connection once installed

## Tech stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for the installable app manifest and offline service worker
- Data persistence via a small `window.storage` → `localStorage` polyfill (see [Storage](#storage) below)

## Getting started (desktop)

```bash
npm install
npm run dev
```
(or just double-click `start.bat` on Windows) → opens at http://localhost:5173

## Deploy to GitHub Pages (recommended — lets you install it on your phone)

This gives the app a permanent `https://...` address, reachable from any network, so you're not tied to your home Wi-Fi.

1. Create a new **empty** repository on github.com (don't check "Add README" or "Add .gitignore" during creation)
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Wochenplan"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
3. In the repository: **Settings → Pages → Source** → select **"GitHub Actions"** (one-time setup, everything after this is automatic)
4. The included workflow (`.github/workflows/deploy.yml`) builds and deploys the app automatically on every push. Watch progress under the **Actions** tab. After about a minute it goes live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`
5. Open that link on your Android phone in Chrome → menu (⋮) → **Install app** (Chrome will often suggest this automatically)

Every subsequent `git push` updates the installed app in the background — the service worker checks for updates on each launch.

> **Note:** if your repository is named `YOUR_USERNAME.github.io` (a personal user/organization site rather than a project repo), change the `VITE_BASE_PATH: /...` line in `.github/workflows/deploy.yml` to `VITE_BASE_PATH: /`.

## Alternative: test locally over Wi-Fi (no GitHub needed)

```bash
npm install
npm run build
npm run preview -- --host
```
Open the printed "Network:" address on your phone (must be on the same Wi-Fi as your computer). Or just double-click `start-android.bat`.

## Storage

The app talks to a `window.storage` API (the same interface used by Claude.ai artifacts). Outside of that environment, a small polyfill (`src/storagePolyfill.js`) backs it with the browser's `localStorage`, so all data — categories, appointments, weekly entries, theme — stays entirely on your own device. Nothing is sent to a server.

## A note on "app"

This is not a compiled `.apk`. It's a Progressive Web App: functionally identical to the web version, but installable, fullscreen, and fully usable offline once installed. A native APK would require Android Studio / the Android SDK to build.

## License

MIT — see [LICENSE](./LICENSE).
