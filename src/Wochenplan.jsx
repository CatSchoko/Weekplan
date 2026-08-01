import React, { useState, useEffect, useRef } from "react";

const TAGE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const PALETTE = ["#8b7cf6", "#f97066", "#2dd4bf", "#fbbf24", "#60a5fa", "#f472b6", "#4ade80", "#a3a3a3"];
const ERASER = "__eraser__";
const THEME_FIELD_KEYS = ["bg", "surface", "surface2", "border", "text", "textDim", "textFaint", "accent"];

const DEFAULT_THEME = {
  bg: "#0e1013",
  surface: "#16191f",
  surface2: "#1c2029",
  border: "#262b35",
  text: "#e8e9ec",
  textDim: "#9298a4",
  textFaint: "#5b6270",
  accent: "#8b7cf6",
};

const TRANSLATIONS = {
  en: {
    locale: "en-GB",
    daysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    daysLong: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    themeLabels: { bg: "Background", surface: "Surface", surface2: "Surface (2)", border: "Border", text: "Text", textDim: "Text (dim)", textFaint: "Text (faint)", accent: "Accent" },
    appTitle: "Weekly Planner",
    weekAbbr: "Wk",
    prevWeek: "Previous week",
    nextWeek: "Next week",
    today: "Today",
    continueBtn: "⟳ Continue",
    continueTitle: "Continue week",
    continueDesc: "Carries the current week's layout 1:1 into the coming weeks.",
    weeksLabel: "Week(s)",
    apply: "Apply",
    saveFile: "⬇ Save",
    saveFileTitle: "Save week as file",
    backupTitle: "Backup",
    backupDesc: "Back up or restore all categories, fixed appointments, the theme, and every week as a file — independent of GitHub.",
    backupExport: "⬇ Export as JSON",
    backupImport: "⬆ Import JSON",
    backupIconTitle: "Export/import full backup",
    syncIconTitle: "Sync between devices",
    syncTitle: "Device sync",
    syncDescPre: "Runs through a private, ",
    syncDescBold: "end-to-end encrypted",
    syncDescPost: " GitHub Gist. Enter the same three values on both devices.",
    tokenPlaceholder: "GitHub token (gist scope)",
    gistPlaceholder: "Gist ID (auto-filled after 1st upload)",
    passPlaceholder: "Encryption password (your choice)",
    autoSyncLabel: "Sync automatically (every ~25s + on changes)",
    conflictTitle: "⚠ Conflict detected",
    conflictDesc: "Something changed on another device while you have changes here that haven't been uploaded yet. Choose which version should win:",
    keepMine: "Keep my version",
    takeTheirs: "Use other version",
    uploadNow: "⬆ Upload now",
    downloadNow: "⬇ Download now",
    statusConflict: "⚠ Conflict — see above",
    statusSyncing: "🔄 Syncing…",
    statusError: "⚠ Last attempt failed",
    statusDirty: "🟡 Unsaved changes",
    statusReady: "🟢 Ready",
    lastSyncedLabel: "Last",
    syncFootnotePre: 'Create a token at github.com/settings/tokens → only the "gist" scope. The password encrypts everything locally before it reaches GitHub — GitHub never sees plain text. Both are stored only in this browser.',
    syncFootnoteBold: "Keep the password safe",
    syncFootnotePost: " — without it nothing can be recovered.",
    colorsIconTitle: "Customize colors",
    colorsTitle: "Customize colors",
    resetColors: "Reset",
    languageIconTitle: "Language",
    languageTitle: "Language",
    tabCategories: "Categories",
    tabAppointments: "📌 Fixed appointments",
    noAppointments: "No fixed appointments yet.",
    timePlaceholder: "09:00",
    titlePlaceholder: "Title, e.g. Vacation",
    addBtn: "+ Add",
    customColorTitle: "Choose a custom color",
    off: "Off",
    eraser: "🧹 Eraser",
    newCategoryPlaceholder: "New category",
    brushActive: (name) => `Brush active: ${name} — click a cell or day button to color it`,
    eraserActive: "Eraser active — click a cell or day button to clear it",
    rangeToggle: "Color a date range across weeks",
    rangeTo: "to",
    rangeColoring: "Coloring…",
    rangeColorBtn: "Color range",
    loadingWeek: "Loading week…",
    timeCol: "Time",
    wholeDayBtn: "whole day",
    dragHandleTitle: "Drag to reorder",
    editTimeTitle: "Click to edit",
    descriptionLabel: "Description",
    descriptionPlaceholder: "Description / details…",
    deleteRowTitle: "Delete row",
    newTimePlaceholder: "e.g. 07:30",
    addTimeBtn: "+ Add time",
    bottomHint: "⠿ to drag · click a time to rename · 📝 for a description",
    toastCatApplied: (tag) => `Category applied to ${tag}`,
    toastCatCleared: (tag) => `${tag} reset`,
    toastPickBrush: "Please pick a category as brush first",
    toastPickDates: "Please pick a start and end date",
    toastInvalidRange: "Invalid date range",
    toastRangeColored: "Range colored",
    toastRangeColoredWeeks: (n) => `Range colored across ${n} weeks`,
    toastRangeError: "Error coloring the range",
    toastApptCreated: "Fixed appointment created — shows up every week automatically",
    toastWeekCarried: "Carried over to next week",
    toastWeeksCarried: (n) => `Carried over to the next ${n} weeks`,
    toastColorsReset: "Colors reset",
    toastTokenPassMissing: "Please enter token and password",
    toastEncryptedUploaded: "Uploaded (encrypted)",
    toastUploadError: "Upload failed — check token/internet",
    toastTokenGistPassMissing: "Please enter token, gist ID, and password",
    toastDownloaded: "Downloaded — up to date",
    toastWrongPassword: "Wrong password",
    toastDownloadError: "Download failed",
    toastConflictFound: "⚠ Changes found on another device — resolve in the Sync panel",
    toastSyncCredsSaved: "Sync credentials saved",
    toastBackupDownloaded: "Backup downloaded",
    toastBackupError: "Error creating the backup",
    toastBackupApplied: "Backup applied",
    toastBackupInvalid: "Invalid backup file",
    toastFileDownloading: "Downloading file",
    confirmPullDirty: "You have local changes that haven't been uploaded yet.\n\nDownloading will replace them with the cloud version — your local changes will be lost.\n\nDownload anyway?",
    confirmImportBackup: "This will overwrite all current data (categories, fixed appointments, theme, every week) with the contents of the backup file. This cannot be undone.\n\nApply the backup now?",
    exportCreatedWith: "Made with Weekly Planner · print or save as PDF: Ctrl/Cmd+P",
    exportHtmlLang: "en",
  },
  de: {
    locale: "de-DE",
    daysShort: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    daysLong: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    themeLabels: { bg: "Hintergrund", surface: "Fläche", surface2: "Fläche (2)", border: "Rahmen", text: "Text", textDim: "Text gedämpft", textFaint: "Text schwach", accent: "Akzent" },
    appTitle: "Wochenplan",
    weekAbbr: "KW",
    prevWeek: "Vorherige Woche",
    nextWeek: "Nächste Woche",
    today: "Heute",
    continueBtn: "⟳ Fortsetzen",
    continueTitle: "Woche fortsetzen",
    continueDesc: "Überträgt die aktuelle Woche 1:1 in die kommenden Wochen.",
    weeksLabel: "Woche(n)",
    apply: "Übernehmen",
    saveFile: "⬇ Speichern",
    saveFileTitle: "Woche als Datei speichern",
    backupTitle: "Backup",
    backupDesc: "Alle Kategorien, festen Termine, das Theme und sämtliche Wochen als Datei sichern oder wiederherstellen — unabhängig von GitHub.",
    backupExport: "⬇ Als JSON exportieren",
    backupImport: "⬆ JSON importieren",
    backupIconTitle: "Vollständiges Backup exportieren/importieren",
    syncIconTitle: "Zwischen Geräten synchronisieren",
    syncTitle: "Geräte-Sync",
    syncDescPre: "Läuft über einen privaten, ",
    syncDescBold: "Ende-zu-Ende-verschlüsselten",
    syncDescPost: " GitHub Gist. Auf beiden Geräten dieselben drei Werte eintragen.",
    tokenPlaceholder: "GitHub-Token (gist-Rechte)",
    gistPlaceholder: "Gist-ID (nach 1. Upload automatisch)",
    passPlaceholder: "Verschlüsselungs-Passwort (frei wählbar)",
    autoSyncLabel: "Automatisch synchronisieren (alle ~25s + bei Änderungen)",
    conflictTitle: "⚠ Konflikt erkannt",
    conflictDesc: "Auf einem anderen Gerät wurde etwas geändert, während du hier noch nicht hochgeladene Änderungen hast. Wähle, welcher Stand gelten soll:",
    keepMine: "Meine Version behalten",
    takeTheirs: "Andere Version übernehmen",
    uploadNow: "⬆ Jetzt hochladen",
    downloadNow: "⬇ Jetzt herunterladen",
    statusConflict: "⚠ Konflikt — siehe oben",
    statusSyncing: "🔄 Synchronisiere…",
    statusError: "⚠ Letzter Versuch fehlgeschlagen",
    statusDirty: "🟡 Ungespeicherte Änderungen",
    statusReady: "🟢 Bereit",
    lastSyncedLabel: "Zuletzt",
    syncFootnotePre: 'Token erstellen: github.com/settings/tokens → nur "gist"-Berechtigung. Das Passwort verschlüsselt alle Daten lokal, bevor sie zu GitHub gehen — GitHub sieht nie Klartext. Beides wird nur in diesem Browser gespeichert.',
    syncFootnoteBold: "Passwort gut aufbewahren",
    syncFootnotePost: " — ohne lässt sich nichts wiederherstellen.",
    colorsIconTitle: "Farben anpassen",
    colorsTitle: "Farben anpassen",
    resetColors: "Zurücksetzen",
    languageIconTitle: "Sprache",
    languageTitle: "Sprache",
    tabCategories: "Kategorien",
    tabAppointments: "📌 Feste Termine",
    noAppointments: "Noch keine festen Termine angelegt.",
    timePlaceholder: "09:00",
    titlePlaceholder: "Titel, z. B. Ferien",
    addBtn: "+ Anlegen",
    customColorTitle: "Eigene Farbe wählen",
    off: "Aus",
    eraser: "🧹 Radierer",
    newCategoryPlaceholder: "Neue Kategorie",
    brushActive: (name) => `Pinsel aktiv: ${name} — Zelle oder Tag-Button anklicken zum Färben`,
    eraserActive: "Radierer aktiv — Zelle oder Tag-Button anklicken zum Zurücksetzen",
    rangeToggle: "Zeitraum über mehrere Wochen färben",
    rangeTo: "bis",
    rangeColoring: "Färbe…",
    rangeColorBtn: "Zeitraum färben",
    loadingWeek: "Lade Woche…",
    timeCol: "Zeit",
    wholeDayBtn: "ganzer Tag",
    dragHandleTitle: "Ziehen zum Verschieben",
    editTimeTitle: "Klicken zum Bearbeiten",
    descriptionLabel: "Beschreibung",
    descriptionPlaceholder: "Beschreibung / Details…",
    deleteRowTitle: "Zeile löschen",
    newTimePlaceholder: "z. B. 07:30",
    addTimeBtn: "+ Uhrzeit hinzufügen",
    bottomHint: "⠿ zum Ziehen · Zeit anklicken zum Umbenennen · 📝 für Beschreibung",
    toastCatApplied: (tag) => `Kategorie auf ${tag} angewendet`,
    toastCatCleared: (tag) => `${tag} zurückgesetzt`,
    toastPickBrush: "Bitte zuerst eine Kategorie als Pinsel wählen",
    toastPickDates: "Bitte Start- und Enddatum wählen",
    toastInvalidRange: "Ungültiger Zeitraum",
    toastRangeColored: "Zeitraum eingefärbt",
    toastRangeColoredWeeks: (n) => `Zeitraum über ${n} Wochen eingefärbt`,
    toastRangeError: "Fehler beim Einfärben des Zeitraums",
    toastApptCreated: "Fester Termin angelegt — erscheint jede Woche automatisch",
    toastWeekCarried: "In die nächste Woche übernommen",
    toastWeeksCarried: (n) => `In die nächsten ${n} Wochen übernommen`,
    toastColorsReset: "Farben zurückgesetzt",
    toastTokenPassMissing: "Bitte Token und Passwort eintragen",
    toastEncryptedUploaded: "Verschlüsselt hochgeladen",
    toastUploadError: "Fehler beim Hochladen — Token/Internet prüfen",
    toastTokenGistPassMissing: "Bitte Token, Gist-ID und Passwort eintragen",
    toastDownloaded: "Heruntergeladen — Stand aktualisiert",
    toastWrongPassword: "Falsches Passwort",
    toastDownloadError: "Fehler beim Herunterladen",
    toastConflictFound: "⚠ Änderungen auf einem anderen Gerät gefunden — im Sync-Panel auflösen",
    toastSyncCredsSaved: "Sync-Zugangsdaten gespeichert",
    toastBackupDownloaded: "Backup heruntergeladen",
    toastBackupError: "Fehler beim Erstellen des Backups",
    toastBackupApplied: "Backup eingespielt",
    toastBackupInvalid: "Ungültige Backup-Datei",
    toastFileDownloading: "Datei wird heruntergeladen",
    confirmPullDirty: "Du hast lokale Änderungen, die noch nicht hochgeladen wurden.\n\nHerunterladen ersetzt sie mit dem Cloud-Stand — deine lokalen Änderungen gehen dabei verloren.\n\nTrotzdem herunterladen?",
    confirmImportBackup: "Dies überschreibt alle aktuellen Daten (Kategorien, feste Termine, Theme, alle Wochen) mit dem Inhalt der Backup-Datei. Dieser Schritt lässt sich nicht rückgängig machen.\n\nBackup jetzt einspielen?",
    exportCreatedWith: "Erstellt mit Wochenplan · zum Ausdrucken oder als PDF speichern: Strg/Cmd+P",
    exportHtmlLang: "de",
  },
};

function getISOWeekKey(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  d.setHours(0, 0, 0, 0);
  return d;
}

function fmtDate(d, locale = "en-GB") {
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit" });
}

function fmtDateLong(d, locale = "en-GB") {
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

function makeDefaultRows() {
  const rows = [];
  for (let h = 8; h <= 18; h++) rows.push({ id: `r${h}`, label: `${String(h).padStart(2, "0")}:00` });
  return rows;
}

function emptyGrid(rows) {
  const g = {};
  rows.forEach((r) => {
    g[r.id] = {};
    TAGE.forEach((t) => (g[r.id][t] = { text: "", desc: "", cat: null }));
  });
  return g;
}

function normalizeCell(c) {
  if (c == null) return { text: "", desc: "", cat: null };
  if (typeof c === "string") return { text: c, desc: "", cat: null };
  return { text: c.text || "", desc: c.desc || "", cat: c.cat || null };
}

function normalizeGrid(rows, grid) {
  const g = {};
  rows.forEach((r) => {
    g[r.id] = {};
    TAGE.forEach((t) => (g[r.id][t] = normalizeCell(grid?.[r.id]?.[t])));
  });
  return g;
}

function escapeHtml(s) {
  return String(s || "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}

function getContrastColor(hex) {
  if (!hex || hex[0] !== "#" || hex.length < 7) return "#111318";
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 140 ? "#111318" : "#ffffff";
}

// --- Ende-zu-Ende-Verschlüsselung fürs Sync (AES-GCM, Passwort via PBKDF2) ---
function bufToB64(buf) {
  let bin = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
function b64ToBuf(b64) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr.buffer;
}
async function deriveSyncKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(passphrase), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function encryptSyncData(obj, passphrase) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveSyncKey(passphrase, salt);
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(JSON.stringify(obj)));
  return `WPENC1:${bufToB64(salt)}:${bufToB64(iv)}:${bufToB64(ciphertext)}`;
}
async function decryptSyncData(payload, passphrase) {
  if (!payload || !payload.startsWith("WPENC1:")) throw new Error("Unbekanntes oder unverschlüsseltes Format");
  const [, saltB64, ivB64, ctB64] = payload.split(":");
  const salt = new Uint8Array(b64ToBuf(saltB64));
  const iv = new Uint8Array(b64ToBuf(ivB64));
  const key = await deriveSyncKey(passphrase, salt);
  const plainBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, b64ToBuf(ctB64));
  return JSON.parse(new TextDecoder().decode(plainBuf));
}

const STYLE = `
.wp-root { --bg: #0e1013; --surface: #16191f; --surface-2: #1c2029; --border: #262b35;
  --border-soft: #1f232c; --text: #e8e9ec; --text-dim: #9298a4; --text-faint: #5b6270;
  --accent: #8b7cf6; --accent-dim: #3a3260; font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg); color: var(--text); border-radius: 16px; padding: 1.5rem;
  max-width: 1040px; margin: 0 auto; }
.wp-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap;
  gap: 12px; margin-bottom: 14px; }
.wp-title { font-size: 21px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
.wp-subtitle { font-size: 13px; color: var(--text-dim); margin: 4px 0 0; }
.wp-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
  gap: 10px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
.wp-weeknav { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 9px;
  overflow: hidden; background: var(--surface); }
.wp-navbtn { border: none; background: transparent; color: var(--text); padding: 7px 14px; font-size: 13px;
  cursor: pointer; transition: background .15s ease, color .15s ease; border-right: 1px solid var(--border); }
.wp-navbtn:last-child { border-right: none; }
.wp-navbtn:hover { background: var(--surface-2); }
.wp-navbtn.today { font-weight: 600; }
.wp-navbtn.today.on { background: var(--accent-dim); color: var(--text); }
.wp-toolbargroup { display: flex; align-items: center; gap: 8px; }
.wp-btn { border: 1px solid var(--border); background: var(--surface); color: var(--text);
  border-radius: 8px; padding: 7px 14px; font-size: 13px; cursor: pointer;
  transition: all .18s cubic-bezier(.4,0,.2,1); white-space: nowrap; }
.wp-btn:hover { background: var(--surface-2); border-color: #333a48; transform: translateY(-1px); }
.wp-btn:active { transform: translateY(0) scale(.97); }
.wp-btn.ghost { border-color: var(--border); background: transparent; }
.wp-btn.ghost:hover { background: var(--surface-2); }
.wp-iconbtn { border: 1px solid var(--border); background: var(--surface); color: var(--text);
  border-radius: 8px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all .18s cubic-bezier(.4,0,.2,1); flex-shrink: 0; position: relative; }
.wp-iconbtn:hover { background: var(--surface-2); border-color: #333a48; transform: translateY(-1px); }
.wp-continuewrap { display: flex; align-items: center; gap: 6px; margin: 10px 0; }
.wp-weeksinput { width: 42px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text);
  font-size: 13px; text-align: center; outline: none; border-radius: 6px; padding: 4px 2px; }

.wp-panel { margin-bottom: 12px; padding: 12px 14px; background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; animation: fadeIn .3s ease; }
.wp-tabs { display: flex; gap: 4px; margin-bottom: 12px; border-bottom: 1px solid var(--border); }
.wp-tab { border: none; background: none; color: var(--text-faint); font-size: 13px; font-weight: 500;
  padding: 6px 4px 10px; cursor: pointer; position: relative; transition: color .15s ease; margin-right: 14px; }
.wp-tab:hover { color: var(--text-dim); }
.wp-tab.active { color: var(--text); }
.wp-tab.active::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: var(--accent); border-radius: 2px; }
.wp-tabbody { animation: fadeIn .18s ease; }
.wp-chiprow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
.wp-chip { display: flex; align-items: center; gap: 6px; padding: 5px 10px 5px 6px; border-radius: 999px;
  border: 1px solid var(--border); background: var(--surface-2); cursor: pointer; font-size: 12px;
  color: var(--text); transition: all .15s ease; }
.wp-chip:hover { border-color: #3a4150; transform: translateY(-1px); }
.wp-chip.active { box-shadow: 0 0 0 1.5px var(--chip-color, var(--accent)); }
.wp-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--chip-color, var(--text-faint)); flex-shrink: 0; }
.wp-chip-x { color: var(--text-faint); font-size: 11px; margin-left: 2px; }
.wp-chip-x:hover { color: #f87171; }
.wp-addcat, .wp-addterm { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.wp-catinput { border: 1px solid var(--border); background: var(--surface-2); color: var(--text);
  border-radius: 999px; padding: 5px 12px; font-size: 12px; width: 100px; outline: none;
  transition: border-color .15s ease; }
.wp-catinput:focus { border-color: var(--accent); }
.wp-select, .wp-timeinput2 { border: 1px solid var(--border); background: var(--surface-2); color: var(--text);
  border-radius: 999px; padding: 5px 10px; font-size: 12px; outline: none; }
.wp-select:focus, .wp-timeinput2:focus { border-color: var(--accent); }
.wp-timeinput2 { width: 62px; font-family: ui-monospace, monospace; }
.wp-swatch { width: 18px; height: 18px; border-radius: 50%; cursor: pointer; border: 1.5px solid transparent;
  transition: transform .12s ease, border-color .12s ease; }
.wp-swatch:hover { transform: scale(1.15); }
.wp-swatch.sel { border-color: var(--text); }
.wp-rainbow { width: 18px; height: 18px; border-radius: 50%; cursor: pointer; flex-shrink: 0;
  background: conic-gradient(red, yellow, lime, cyan, blue, magenta, red);
  border: 1.5px solid var(--border); display: inline-block; position: relative;
  transition: transform .12s ease, border-color .12s ease; overflow: hidden; }
.wp-rainbow:hover { transform: scale(1.15); border-color: var(--text); }
.wp-rainbow input[type="color"] { position: absolute; inset: -4px; width: 26px; height: 26px; border: none;
  padding: 0; cursor: pointer; opacity: 0; }
.wp-paintinfo { font-size: 11.5px; color: var(--accent); margin: 8px 0 0; }
.wp-termchip-pin { font-size: 10px; opacity: .8; }
.wp-rangetoggle { display: flex; align-items: center; gap: 5px; border: none; background: none; cursor: pointer;
  font-size: 12px; color: var(--text-faint); padding: 10px 0 0; transition: color .15s ease; }
.wp-rangetoggle:hover { color: var(--accent); }
.wp-rangerow { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; width: 100%;
  margin-top: 8px; padding-top: 10px; border-top: 1px dashed var(--border); animation: fadeIn .15s ease; }
.wp-dateinput { border: 1px solid var(--border); background: var(--surface-2); color: var(--text);
  border-radius: 8px; padding: 5px 9px; font-size: 12px; outline: none; color-scheme: dark;
  transition: border-color .15s ease; }
.wp-dateinput:focus { border-color: var(--accent); }
.wp-rangebtn { border: 1px solid var(--border); background: var(--accent-dim); color: var(--text);
  border-radius: 8px; padding: 6px 12px; font-size: 12.5px; cursor: pointer;
  transition: transform .15s ease, opacity .15s ease; }
.wp-rangebtn:hover { transform: translateY(-1px); }
.wp-rangebtn:disabled { opacity: .5; cursor: default; transform: none; }

.wp-tablewrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 12px;
  background: var(--surface); animation: fadeIn .35s cubic-bezier(.4,0,.2,1);
  scrollbar-width: none; -ms-overflow-style: none; }
.wp-tablewrap::-webkit-scrollbar { display: none; height: 0; width: 0; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.wp-table { border-collapse: collapse; width: 100%; min-width: 820px; }
.wp-th { text-align: left; font-size: 12px; font-weight: 600; color: var(--text); padding: 10px 12px;
  border-bottom: 1px solid var(--border); background: var(--surface-2); position: relative; }
.wp-th .d { font-weight: 400; color: var(--text-faint); font-size: 11px; margin-top: 2px; }
.wp-daybtn { position: absolute; top: 6px; right: 6px; font-size: 10px; padding: 3px 7px; border-radius: 6px;
  border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); cursor: pointer;
  opacity: 0; transition: opacity .15s ease, background .15s ease; }
.wp-th:hover .wp-daybtn { opacity: 1; }
.wp-daybtn:hover { background: var(--accent-dim); color: var(--text); }
.wp-th.today-col { background: var(--accent-dim); }
.wp-th.today-col::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
  background: var(--accent); }
.wp-td.today-col { background: color-mix(in srgb, var(--accent) 6%, transparent); }
.wp-td { border-bottom: 1px solid var(--border-soft); border-right: 1px solid var(--border-soft);
  vertical-align: top; transition: box-shadow .12s ease; }
.wp-row { transition: background .15s ease, opacity .15s ease; animation: fadeIn .25s ease; }
.wp-row:hover { background: rgba(255,255,255,0.015); }
.wp-row.dragging { opacity: .35; }
.wp-row.dragover td { box-shadow: inset 0 2px 0 0 var(--accent); }
.wp-timecell { display: flex; align-items: center; gap: 4px; padding: 4px 4px 4px 6px; }
.wp-draghandle { cursor: grab; color: var(--text-faint); font-size: 13px; padding: 2px 4px; border-radius: 4px;
  opacity: 0; transition: opacity .15s ease, color .15s ease, background .15s ease; user-select: none; }
.wp-row:hover .wp-draghandle { opacity: 1; }
.wp-draghandle:hover { color: var(--accent); background: var(--surface-2); }
.wp-draghandle:active { cursor: grabbing; }
.wp-time { font-family: ui-monospace, 'SF Mono', monospace; font-size: 12px; color: var(--text-dim);
  font-weight: 500; background: var(--surface-2); padding: 8px 10px; white-space: nowrap; cursor: text;
  border-radius: 6px; transition: background .15s ease; }
.wp-time:hover { background: #23283380; color: var(--text); }
.wp-timeinput { font-family: ui-monospace, 'SF Mono', monospace; font-size: 12px; width: 56px;
  background: var(--surface); border: 1px solid var(--accent); border-radius: 5px; color: var(--text);
  padding: 3px 5px; outline: none; }
.wp-cellwrap { position: relative; }
.wp-cell { width: 100%; min-height: 38px; border: none; outline: none; resize: vertical;
  padding: 8px 26px 4px 10px; font-size: 13px; font-family: inherit; background: transparent; color: var(--text);
  box-sizing: border-box; transition: background .18s ease, box-shadow .18s ease; border-radius: 6px; }
.wp-cell:hover { background: rgba(255,255,255,0.02); }
.wp-cell:focus { box-shadow: inset 0 0 0 1px var(--accent); }
.wp-cell::placeholder { color: var(--text-faint); }
.wp-catdot { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%;
  pointer-events: none; box-shadow: 0 0 0 2px var(--surface); }
.wp-pin { display: flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 600; padding: 3px 8px 3px 6px;
  border-radius: 6px 6px 0 0; color: #0e1013; }
.wp-desctoggle { display: flex; align-items: center; gap: 4px; border: none; background: none; cursor: pointer;
  font-size: 10.5px; color: var(--text-faint); padding: 2px 10px 4px; opacity: 0; width: 100%; text-align: left;
  transition: opacity .15s ease, color .15s ease; }
.wp-cellwrap:hover .wp-desctoggle, .wp-desctoggle.open, .wp-desctoggle.has { opacity: 1; }
.wp-desctoggle:hover { color: var(--accent); }
.wp-desctoggle.has:not(.open) { color: var(--accent); }
.wp-descarrow { display: inline-block; transition: transform .18s cubic-bezier(.4,0,.2,1); font-size: 9px; }
.wp-desctoggle.open .wp-descarrow { transform: rotate(90deg); }
.wp-desccollapse.open { animation: fadeIn .15s ease; }
.wp-desc { width: 100%; box-sizing: border-box; border: none; border-top: 1px dashed var(--border);
  background: rgba(255,255,255,0.02); color: var(--text-dim); font-size: 11.5px; font-style: italic;
  padding: 6px 10px; outline: none; resize: vertical; font-family: inherit; display: block; }
.wp-desc::placeholder { color: var(--text-faint); }
.wp-del { border: none; background: none; color: var(--text-faint); cursor: pointer; font-size: 14px;
  width: 100%; height: 100%; padding: 10px; opacity: 0; transition: opacity .15s ease, color .15s ease; }
.wp-row:hover .wp-del { opacity: 1; }
.wp-del:hover { color: #f87171; }
.wp-addrow { display: flex; gap: 8px; margin-top: 14px; align-items: center; flex-wrap: wrap; }
.wp-input { border: 1px solid var(--border); background: var(--surface); color: var(--text);
  border-radius: 8px; padding: 7px 11px; font-size: 13px; width: 100px; outline: none;
  transition: border-color .15s ease, box-shadow .15s ease; }
.wp-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
.wp-hint { font-size: 12px; color: var(--text-faint); }
.wp-loading { color: var(--text-faint); font-size: 14px; padding: 2rem 0; text-align: center;
  animation: pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: .4; } 50% { opacity: .9; } }
.wp-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(0);
  background: var(--surface-2); border: 1px solid var(--border); color: var(--text); font-size: 13px;
  padding: 9px 16px; border-radius: 999px; box-shadow: 0 8px 24px rgba(0,0,0,.4);
  animation: toastIn .25s cubic-bezier(.4,0,.2,1); z-index: 20; }
@keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

.wp-gear { font-size: 15px; transition: transform .4s cubic-bezier(.4,0,.2,1); display: inline-block; }
.wp-btn:hover .wp-gear { transform: rotate(75deg); }
.wp-settingswrap { position: relative; }
.wp-settingspanel { position: absolute; top: calc(100% + 8px); right: 0; z-index: 30; width: 300px;
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 14px;
  box-shadow: 0 12px 32px rgba(0,0,0,.5); animation: settingsIn .18s cubic-bezier(.4,0,.2,1); }
@keyframes settingsIn { from { opacity: 0; transform: translateY(-6px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
.wp-settingstitle { font-size: 13px; font-weight: 600; margin: 0 0 10px; display: flex; justify-content: space-between; align-items: center; }
.wp-settingsclose { border: none; background: none; color: var(--text-faint); cursor: pointer; font-size: 15px;
  transition: color .15s ease; }
.wp-settingsclose:hover { color: var(--text); }
.wp-colorgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.wp-colorfield { display: flex; align-items: center; gap: 8px; }
.wp-colorinput { width: 26px; height: 26px; padding: 0; border: 1px solid var(--border); border-radius: 6px;
  background: none; cursor: pointer; flex-shrink: 0; }
.wp-colorinput::-webkit-color-swatch-wrapper { padding: 2px; }
.wp-colorinput::-webkit-color-swatch { border: none; border-radius: 4px; }
.wp-colorfieldlabel { font-size: 11.5px; color: var(--text-dim); }
.wp-settingsreset { width: 100%; margin-top: 12px; border: 1px solid var(--border); background: var(--surface-2);
  color: var(--text); border-radius: 8px; padding: 7px; font-size: 12.5px; cursor: pointer;
  transition: background .15s ease; }
.wp-settingsreset:hover { background: var(--accent-dim); }
.wp-settingsreset.accent { background: var(--accent-dim); color: var(--text); border-color: var(--accent); }
.wp-settingspanel.narrow { width: 220px; }
.wp-syncinput { width: 100%; box-sizing: border-box; border: 1px solid var(--border); background: var(--surface-2);
  color: var(--text); border-radius: 8px; padding: 7px 10px; font-size: 12px; outline: none; margin-bottom: 8px;
  transition: border-color .15s ease; }
.wp-syncinput:focus { border-color: var(--accent); }
.wp-syncbtns { display: flex; gap: 6px; }
.wp-syncbtns .wp-settingsreset { margin-top: 0; }
.wp-syncdot { position: absolute; top: -3px; right: -3px; width: 9px; height: 9px; border-radius: 50%;
  background: #4ade80; border: 2px solid var(--surface); animation: pulse 2s ease-in-out infinite; }
.wp-syncdot.error { background: #f87171; animation: none; }
.wp-syncdot.conflict { background: #fbbf24; animation: pulse 1s ease-in-out infinite; }
.wp-autosynctoggle { display: flex; align-items: center; gap: 7px; font-size: 11.5px; color: var(--text-dim);
  margin: 2px 0 10px; cursor: pointer; }
.wp-autosynctoggle input { accent-color: var(--accent); cursor: pointer; }
.wp-conflictbox { border: 1px solid #fbbf24; background: rgba(251, 191, 36, 0.08); border-radius: 8px;
  padding: 10px; margin-bottom: 4px; animation: fadeIn .2s ease; }
.wp-conflicttitle { font-size: 12.5px; font-weight: 600; color: #fbbf24; margin: 0 0 4px; }
.wp-root button:focus-visible, .wp-root input:focus-visible, .wp-root textarea:focus-visible,
.wp-root select:focus-visible, .wp-root label:focus-within { outline: 2px solid var(--accent);
  outline-offset: 2px; border-radius: 4px; }

@media (display-mode: standalone) {
  .wp-root { padding-top: calc(1.5rem + env(safe-area-inset-top));
    padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
    padding-left: calc(1.5rem + env(safe-area-inset-left));
    padding-right: calc(1.5rem + env(safe-area-inset-right)); }
}

/* Touch-Geräte: Aktionen, die auf Desktop nur bei Hover erscheinen, brauchen einen
   permanent sichtbaren Trigger, da es kein Hover gibt (z. B. Drag-Handle, Löschen). */
@media (hover: none) {
  .wp-draghandle, .wp-del, .wp-descbtn { opacity: 0.55; }
  .wp-move { opacity: 0.55; }
}

@media (max-width: 640px) {
  .wp-root { padding: 0.85rem 0.6rem; border-radius: 0; max-width: 100%; }
  .wp-title { font-size: 19px; }
  .wp-subtitle { font-size: 12.5px; }

  /* Toolbar: einheitliche, ausreichend große Touch-Ziele (min 40px hoch) */
  .wp-toolbar { gap: 8px; }
  .wp-weeknav { flex: 1 1 auto; }
  .wp-navbtn { padding: 9px 10px; font-size: 13px; min-height: 40px; flex: 1; text-align: center; }
  .wp-toolbargroup { gap: 6px; flex-wrap: wrap; }
  .wp-btn.ghost { padding: 9px 12px; min-height: 40px; font-size: 12.5px; }
  .wp-iconbtn { width: 40px; height: 40px; }
  .wp-continuewrap { min-height: 28px; }

  .wp-panel { padding: 10px; }
  .wp-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .wp-tab { white-space: nowrap; font-size: 12.5px; }
  .wp-chip { padding: 7px 12px 7px 7px; font-size: 12.5px; }
  .wp-swatch, .wp-rainbow { width: 22px; height: 22px; }
  .wp-catinput, .wp-select, .wp-timeinput2 { font-size: 13px; padding: 7px 11px; }

  /* Popover-Panels dürfen den Bildschirmrand nie überschreiten */
  .wp-settingspanel { right: -8px; width: min(300px, 90vw); max-height: 70vh; overflow-y: auto; }
  .wp-settingspanel.narrow { width: min(260px, 90vw); }

  /* Zeitspalte beim horizontalen Scrollen fixieren, damit man sich nie verliert */
  .wp-tablewrap { position: relative; }
  .wp-table { min-width: 640px; }
  .wp-table .wp-th:first-child, .wp-table td.wp-td:first-child {
    position: sticky; left: 0; z-index: 5; background: var(--surface-2);
    box-shadow: 2px 0 6px -2px rgba(0,0,0,0.35);
  }
  .wp-table thead .wp-th:first-child { z-index: 6; }
  .wp-time { padding: 10px 8px; font-size: 13px; }
  .wp-timecell { padding: 4px 2px 4px 4px; }
  .wp-cell { padding: 10px 26px 6px 10px; font-size: 13.5px; min-height: 44px; }
  .wp-desctoggle { padding: 4px 10px 6px; font-size: 11px; }

  /* Dezenter Rand-Schatten als Hinweis, dass die Tabelle horizontal scrollt */
  .wp-tablewrap::after {
    content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 14px;
    background: linear-gradient(to right, transparent, var(--surface) 92%);
    pointer-events: none; border-radius: 0 12px 12px 0;
  }

  .wp-addrow { gap: 8px; }
  .wp-input { flex: 1 1 100px; min-height: 40px; }
  .wp-btn { min-height: 40px; }
  .wp-hint { font-size: 11.5px; }
}

@media (max-width: 380px) {
  .wp-navbtn { padding: 9px 6px; font-size: 12.5px; }
  .wp-btn.ghost span, .wp-btn.ghost { font-size: 12px; }
  .wp-title { font-size: 17px; }
}
`;

export default function Wochenplan() {
  const [monday, setMonday] = useState(getMondayOfWeek(new Date()));
  const [rows, setRows] = useState(makeDefaultRows());
  const [grid, setGrid] = useState(() => emptyGrid(makeDefaultRows()));
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState(PALETTE[0]);
  const [termine, setTermine] = useState([]);
  const [newTermDay, setNewTermDay] = useState("Mo");
  const [newTermTime, setNewTermTime] = useState("");
  const [newTermTitle, setNewTermTitle] = useState("");
  const [newTermColor, setNewTermColor] = useState(PALETTE[1]);
  const [loading, setLoading] = useState(true);
  const [newTime, setNewTime] = useState("");
  const [toast, setToast] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [weeksToContinue, setWeeksToContinue] = useState(1);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [expandedDesc, setExpandedDesc] = useState(null);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [continueOpen, setContinueOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("kategorien");
  const [rangeToolOpen, setRangeToolOpen] = useState(false);
  const [rangeFrom, setRangeFrom] = useState("");
  const [rangeTo, setRangeTo] = useState("");
  const [rangeBusy, setRangeBusy] = useState(false);
  const [syncOpen, setSyncOpen] = useState(false);
  const [syncToken, setSyncToken] = useState("");
  const [syncGistId, setSyncGistId] = useState("");
  const [syncPassphrase, setSyncPassphrase] = useState("");
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [syncBusy, setSyncBusy] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [syncStatus, setSyncStatus] = useState("idle");
  const [localDirty, setLocalDirty] = useState(false);
  const [hasConflict, setHasConflict] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  const [lang, setLang] = useState("en");
  const saveTimer = useRef(null);
  const toastTimer = useRef(null);
  const settingsRef = useRef(null);
  const continueRef = useRef(null);
  const syncRef = useRef(null);
  const backupRef = useRef(null);
  const backupFileInput = useRef(null);
  const conflictToastShown = useRef(false);
  const autoPushTimer = useRef(null);
  const autoPollInterval = useRef(null);
  const suppressAutoPush = useRef(false);
  const localDirtyRef = useRef(false);
  const lastRemoteUpdatedAt = useRef(null);
  const syncConfigLoaded = useRef(false);
  const isFirstDataEffect = useRef(true);

  const weekKey = getISOWeekKey(monday);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  function dayLabel(code) {
    const idx = TAGE.indexOf(code);
    return idx >= 0 ? t.daysShort[idx] : code;
  }

  useEffect(() => {
    localDirtyRef.current = localDirty;
  }, [localDirty]);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("kategorien");
        if (res && res.value) setCategories(JSON.parse(res.value));
      } catch (e) {}
      try {
        const res2 = await window.storage.get("termine");
        if (res2 && res2.value) setTermine(JSON.parse(res2.value));
      } catch (e) {}
      try {
        const res3 = await window.storage.get("theme");
        if (res3 && res3.value) setTheme({ ...DEFAULT_THEME, ...JSON.parse(res3.value) });
      } catch (e) {}
      try {
        const res4 = await window.storage.get("sync:config");
        if (res4 && res4.value) {
          const cfg = JSON.parse(res4.value);
          setSyncToken(cfg.token || "");
          setSyncGistId(cfg.gistId || "");
          setSyncPassphrase(cfg.passphrase || "");
          setAutoSyncEnabled(cfg.autoSync !== false);
          setLastSynced(cfg.lastSynced || null);
          lastRemoteUpdatedAt.current = cfg.lastRemoteUpdatedAt || null;
        }
      } catch (e) {}
      try {
        const res5 = await window.storage.get("lang");
        if (res5 && res5.value) setLang(res5.value === "de" ? "de" : "en");
      } catch (e) {}
      syncConfigLoaded.current = true;
    })();
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
      if (continueRef.current && !continueRef.current.contains(e.target)) setContinueOpen(false);
      if (syncRef.current && !syncRef.current.contains(e.target)) setSyncOpen(false);
      if (backupRef.current && !backupRef.current.contains(e.target)) setBackupOpen(false);
    }
    if (settingsOpen || continueOpen || syncOpen || backupOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [settingsOpen, continueOpen, syncOpen, backupOpen]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const res = await window.storage.get(`woche:${weekKey}`);
        if (!cancelled && res && res.value) {
          const data = JSON.parse(res.value);
          const r = data.rows && data.rows.length ? data.rows : makeDefaultRows();
          setRows(r);
          setGrid(normalizeGrid(r, data.grid));
        } else if (!cancelled) {
          const r = makeDefaultRows();
          setRows(r);
          setGrid(emptyGrid(r));
        }
      } catch (e) {
        const r = makeDefaultRows();
        setRows(r);
        setGrid(emptyGrid(r));
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [weekKey]);

  function showToast(msg) {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }

  function persistWeek(key, nextRows, nextGrid) {
    return window.storage.set(key, JSON.stringify({ rows: nextRows, grid: nextGrid }));
  }

  function persist(nextRows, nextGrid) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      persistWeek(`woche:${weekKey}`, nextRows, nextGrid).catch((e) => console.error(e));
    }, 400);
  }

  function persistCategories(next) {
    window.storage.set("kategorien", JSON.stringify(next)).catch((e) => console.error(e));
  }

  function persistTermine(next) {
    window.storage.set("termine", JSON.stringify(next)).catch((e) => console.error(e));
  }

  function updateThemeColor(key, value) {
    setTheme((prev) => {
      const next = { ...prev, [key]: value };
      window.storage.set("theme", JSON.stringify(next)).catch((e) => console.error(e));
      return next;
    });
  }

  function resetTheme() {
    setTheme(DEFAULT_THEME);
    window.storage.set("theme", JSON.stringify(DEFAULT_THEME)).catch((e) => console.error(e));
    showToast(t.toastColorsReset);
  }

  function changeLanguage(next) {
    setLang(next);
    window.storage.set("lang", next).catch((e) => console.error(e));
  }

  function updateCellField(rowId, tag, field, value) {
    setGrid((prev) => {
      const next = { ...prev, [rowId]: { ...prev[rowId], [tag]: { ...prev[rowId][tag], [field]: value } } };
      persist(rows, next);
      return next;
    });
  }

  function paintCell(rowId, tag) {
    setGrid((prev) => {
      const cur = prev[rowId][tag];
      const nextCat = activeCat === ERASER ? null : cur.cat === activeCat ? null : activeCat;
      const next = { ...prev, [rowId]: { ...prev[rowId], [tag]: { ...cur, cat: nextCat } } };
      persist(rows, next);
      return next;
    });
  }

  function paintWholeDay(tag) {
    if (!activeCat) return;
    const applyCat = activeCat === ERASER ? null : activeCat;
    setGrid((prev) => {
      const next = { ...prev };
      rows.forEach((r) => {
        next[r.id] = { ...next[r.id], [tag]: { ...next[r.id][tag], cat: applyCat } };
      });
      persist(rows, next);
      return next;
    });
    showToast(activeCat === ERASER ? t.toastCatCleared(tag) : t.toastCatApplied(tag));
  }

  async function paintDateRange() {
    if (!activeCat) {
      showToast(t.toastPickBrush);
      return;
    }
    if (!rangeFrom || !rangeTo) {
      showToast(t.toastPickDates);
      return;
    }
    const from = new Date(rangeFrom + "T00:00:00");
    const to = new Date(rangeTo + "T00:00:00");
    if (isNaN(from) || isNaN(to) || from > to) {
      showToast(t.toastInvalidRange);
      return;
    }

    setRangeBusy(true);
    try {
      const weeksMap = new Map();
      const cursor = new Date(from);
      while (cursor <= to) {
        const wMonday = getMondayOfWeek(cursor);
        const wKey = getISOWeekKey(wMonday);
        const dayIdx = (cursor.getDay() + 6) % 7;
        const tag = TAGE[dayIdx];
        if (!weeksMap.has(wKey)) weeksMap.set(wKey, { monday: wMonday, tags: new Set() });
        weeksMap.get(wKey).tags.add(tag);
        cursor.setDate(cursor.getDate() + 1);
      }

      for (const [wKey, info] of weeksMap) {
        let r, g;
        if (wKey === weekKey) {
          r = rows;
          g = grid;
        } else {
          try {
            const res = await window.storage.get(`woche:${wKey}`);
            if (res && res.value) {
              const data = JSON.parse(res.value);
              r = data.rows && data.rows.length ? data.rows : makeDefaultRows();
              g = normalizeGrid(r, data.grid);
            } else {
              r = makeDefaultRows();
              g = emptyGrid(r);
            }
          } catch (e) {
            r = makeDefaultRows();
            g = emptyGrid(r);
          }
        }
        const nextG = { ...g };
        r.forEach((row) => {
          const rowCells = { ...nextG[row.id] };
          info.tags.forEach((tag) => {
            rowCells[tag] = { ...normalizeCell(rowCells[tag]), cat: activeCat === ERASER ? null : activeCat };
          });
          nextG[row.id] = rowCells;
        });
        await persistWeek(`woche:${wKey}`, r, nextG);
        if (wKey === weekKey) setGrid(nextG);
      }

      showToast(
        weeksMap.size === 1
          ? t.toastRangeColored
          : t.toastRangeColoredWeeks(weeksMap.size)
      );
      setRangeFrom("");
      setRangeTo("");
    } catch (e) {
      console.error(e);
      showToast(t.toastRangeError);
    } finally {
      setRangeBusy(false);
    }
  }

  function addRow() {
    const timeVal = newTime.trim();
    if (!/^\d{1,2}:\d{2}$/.test(timeVal)) return;
    const id = `custom-${timeVal}-${Date.now()}`;
    setRows((prevRows) => {
      const nextRows = [...prevRows, { id, label: timeVal }];
      setGrid((prevGrid) => {
        const nextGrid = {
          ...prevGrid,
          [id]: Object.fromEntries(TAGE.map((t2) => [t2, { text: "", desc: "", cat: null }])),
        };
        persist(nextRows, nextGrid);
        return nextGrid;
      });
      return nextRows;
    });
    setNewTime("");
  }

  function removeRow(rowId) {
    setRows((prevRows) => {
      const nextRows = prevRows.filter((r) => r.id !== rowId);
      setGrid((prevGrid) => {
        const nextGrid = { ...prevGrid };
        delete nextGrid[rowId];
        persist(nextRows, nextGrid);
        return nextGrid;
      });
      return nextRows;
    });
  }

  function startEditRow(row) {
    setEditingRow(row.id);
    setEditValue(row.label);
  }

  function commitEditRow(rowId) {
    const val = editValue.trim();
    setEditingRow(null);
    if (!val) return;
    setRows((prevRows) => {
      const next = prevRows.map((r) => (r.id === rowId ? { ...r, label: val } : r));
      persist(next, grid);
      return next;
    });
  }

  function handleDrop(targetIndex) {
    setRows((prevRows) => {
      if (dragIndex === null || dragIndex === targetIndex) return prevRows;
      const next = [...prevRows];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, moved);
      persist(next, grid);
      return next;
    });
    setDragIndex(null);
    setDragOverIndex(null);
  }

  function addCategory() {
    const name = newCatName.trim();
    if (!name) return;
    const cat = { id: `c${Date.now()}`, name, color: newCatColor };
    const next = [...categories, cat];
    setCategories(next);
    persistCategories(next);
    setNewCatName("");
    setActiveCat(cat.id);
  }

  function removeCategory(id) {
    const next = categories.filter((c) => c.id !== id);
    setCategories(next);
    persistCategories(next);
    if (activeCat === id) setActiveCat(null);
  }

  function addTermin() {
    const time = newTermTime.trim();
    const title = newTermTitle.trim();
    if (!/^\d{1,2}:\d{2}$/.test(time) || !title) return;
    const newTerm = { id: `t${Date.now()}`, day: newTermDay, time, title, color: newTermColor };
    const next = [...termine, newTerm];
    setTermine(next);
    persistTermine(next);
    setNewTermTitle("");
    showToast(t.toastApptCreated);
  }

  function removeTermin(id) {
    const next = termine.filter((term) => term.id !== id);
    setTermine(next);
    persistTermine(next);
  }

  function changeWeek(delta) {
    const d = new Date(monday);
    d.setDate(d.getDate() + delta * 7);
    setMonday(d);
  }

  function goToday() {
    setMonday(getMondayOfWeek(new Date()));
  }

  async function continueWeeks() {
    const n = Math.max(1, Math.min(52, Number(weeksToContinue) || 1));
    try {
      let last = monday;
      for (let i = 1; i <= n; i++) {
        const target = new Date(monday);
        target.setDate(target.getDate() + i * 7);
        await persistWeek(`woche:${getISOWeekKey(target)}`, rows, grid);
        last = target;
      }
      showToast(n === 1 ? t.toastWeekCarried : t.toastWeeksCarried(n));
      setMonday(last);
      setContinueOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  function persistSyncConfig(next) {
    window.storage.set("sync:config", JSON.stringify(next)).catch((e) => console.error(e));
  }

  function currentSyncConfig(overrides = {}) {
    return {
      token: syncToken.trim(),
      gistId: syncGistId.trim(),
      passphrase: syncPassphrase,
      autoSync: autoSyncEnabled,
      lastSynced,
      lastRemoteUpdatedAt: lastRemoteUpdatedAt.current,
      ...overrides,
    };
  }

  async function collectAllData() {
    const data = { categories, termine, theme, wochen: {} };
    try {
      const list = await window.storage.list("woche:");
      const keys = (list && list.keys) || [];
      for (const key of keys) {
        try {
          const res = await window.storage.get(key);
          if (res && res.value) data.wochen[key] = JSON.parse(res.value);
        } catch (e) {}
      }
    } catch (e) {}
    return data;
  }

  async function applyAllData(data) {
    suppressAutoPush.current = true;
    if (data.categories) {
      setCategories(data.categories);
      persistCategories(data.categories);
    }
    if (data.termine) {
      setTermine(data.termine);
      persistTermine(data.termine);
    }
    if (data.theme) {
      const nextTheme = { ...DEFAULT_THEME, ...data.theme };
      setTheme(nextTheme);
      window.storage.set("theme", JSON.stringify(nextTheme)).catch((e) => console.error(e));
    }
    if (data.wochen) {
      for (const [key, val] of Object.entries(data.wochen)) {
        await window.storage.set(key, JSON.stringify(val));
      }
    }
    try {
      const res = await window.storage.get(`woche:${weekKey}`);
      if (res && res.value) {
        const wdata = JSON.parse(res.value);
        const r = wdata.rows && wdata.rows.length ? wdata.rows : makeDefaultRows();
        setRows(r);
        setGrid(normalizeGrid(r, wdata.grid));
      }
    } catch (e) {}
    setLocalDirty(false);
    setHasConflict(false);
    conflictToastShown.current = false;
    setTimeout(() => {
      suppressAutoPush.current = false;
    }, 800);
  }

  async function syncPush({ silent = false } = {}) {
    if (!syncToken.trim() || !syncPassphrase) {
      if (!silent) showToast(t.toastTokenPassMissing);
      return;
    }
    if (!silent) setSyncBusy(true);
    setSyncStatus("syncing");
    try {
      const data = await collectAllData();
      const encrypted = await encryptSyncData(data, syncPassphrase);
      const body = {
        description: "Wochenplan Sync (verschlüsselt, nicht löschen)",
        public: false,
        files: { "wochenplan-sync.enc": { content: encrypted } },
      };
      const headers = {
        Authorization: `token ${syncToken.trim()}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      };
      let res;
      if (syncGistId.trim()) {
        res = await fetch(`https://api.github.com/gists/${syncGistId.trim()}`, { method: "PATCH", headers, body: JSON.stringify(body) });
      } else {
        res = await fetch("https://api.github.com/gists", { method: "POST", headers, body: JSON.stringify(body) });
      }
      if (!res.ok) throw new Error(`GitHub-Fehler ${res.status}`);
      const json = await res.json();
      const newGistId = json.id || syncGistId.trim();
      const now = new Date().toISOString();
      lastRemoteUpdatedAt.current = json.updated_at || now;
      setSyncGistId(newGistId);
      setLastSynced(now);
      setSyncStatus("idle");
      setLocalDirty(false);
      setHasConflict(false);
      conflictToastShown.current = false;
      persistSyncConfig(currentSyncConfig({ gistId: newGistId, lastSynced: now, lastRemoteUpdatedAt: lastRemoteUpdatedAt.current }));
      if (!silent) showToast(t.toastEncryptedUploaded);
    } catch (e) {
      console.error(e);
      setSyncStatus("error");
      if (!silent) showToast(t.toastUploadError);
    } finally {
      if (!silent) setSyncBusy(false);
    }
  }

  async function syncPull({ silent = false, force = false } = {}) {
    if (!syncToken.trim() || !syncGistId.trim() || !syncPassphrase) {
      if (!silent) showToast(t.toastTokenGistPassMissing);
      return false;
    }
    if (!silent && !force && localDirty) {
      const ok = window.confirm(t.confirmPullDirty);
      if (!ok) return false;
    }
    if (!silent) setSyncBusy(true);
    setSyncStatus("syncing");
    try {
      const res = await fetch(`https://api.github.com/gists/${syncGistId.trim()}`, {
        headers: { Authorization: `token ${syncToken.trim()}`, Accept: "application/vnd.github+json" },
      });
      if (!res.ok) throw new Error(`GitHub-Fehler ${res.status}`);
      const json = await res.json();
      const file = (json.files && (json.files["wochenplan-sync.enc"] || json.files["wochenplan-sync.json"])) || null;
      if (!file) throw new Error("Keine Sync-Datei im Gist gefunden");
      let data;
      if (file.content.startsWith("WPENC1:")) {
        try {
          data = await decryptSyncData(file.content, syncPassphrase);
        } catch (decErr) {
          const wrongPw = new Error("WRONG_PASSPHRASE");
          throw wrongPw;
        }
      } else {
        data = JSON.parse(file.content);
      }
      await applyAllData(data);
      const now = new Date().toISOString();
      lastRemoteUpdatedAt.current = json.updated_at || now;
      setLastSynced(now);
      setSyncStatus("idle");
      persistSyncConfig(currentSyncConfig({ lastSynced: now, lastRemoteUpdatedAt: lastRemoteUpdatedAt.current }));
      if (!silent) showToast(t.toastDownloaded);
      return true;
    } catch (e) {
      console.error(e);
      setSyncStatus("error");
      if (!silent) showToast(e.message === "WRONG_PASSPHRASE" ? t.toastWrongPassword : t.toastDownloadError);
      return false;
    } finally {
      if (!silent) setSyncBusy(false);
    }
  }

  // Auto-Pull: regelmäßig prüfen, ob der Gist neuer ist als der letzte bekannte Stand
  async function checkRemoteAndAutoPull() {
    if (!syncToken.trim() || !syncGistId.trim() || !syncPassphrase || document.hidden) return;
    try {
      const res = await fetch(`https://api.github.com/gists/${syncGistId.trim()}`, {
        headers: { Authorization: `token ${syncToken.trim()}`, Accept: "application/vnd.github+json" },
      });
      if (!res.ok) return;
      const json = await res.json();
      if (json.updated_at && json.updated_at !== lastRemoteUpdatedAt.current) {
        if (localDirtyRef.current) {
          // Konflikt: Remote hat sich geändert, aber wir haben auch unhochgeladene lokale Änderungen.
          // Nicht automatisch überschreiben — Nutzer muss im Sync-Panel entscheiden.
          setHasConflict(true);
          setSyncStatus("conflict");
          if (!conflictToastShown.current) {
            conflictToastShown.current = true;
            showToast(t.toastConflictFound);
          }
          return;
        }
        const file = (json.files && (json.files["wochenplan-sync.enc"] || json.files["wochenplan-sync.json"])) || null;
        if (!file) return;
        const data = file.content.startsWith("WPENC1:")
          ? await decryptSyncData(file.content, syncPassphrase)
          : JSON.parse(file.content);
        await applyAllData(data);
        lastRemoteUpdatedAt.current = json.updated_at;
        const now = new Date().toISOString();
        setLastSynced(now);
        persistSyncConfig(currentSyncConfig({ lastSynced: now, lastRemoteUpdatedAt: json.updated_at }));
      }
    } catch (e) {
      // still im Hintergrund — kein Toast bei automatischen Versuchen
    }
  }

  // Auto-Push: debounced, nach Änderungen an Kategorien/Terminen/Theme/aktueller Woche
  useEffect(() => {
    if (!syncConfigLoaded.current) return;
    if (isFirstDataEffect.current) {
      isFirstDataEffect.current = false;
      return;
    }
    if (suppressAutoPush.current) return;
    setLocalDirty(true);
    if (!autoSyncEnabled || !syncToken.trim() || !syncPassphrase) return;
    if (autoPushTimer.current) clearTimeout(autoPushTimer.current);
    autoPushTimer.current = setTimeout(() => {
      syncPush({ silent: true });
    }, 4000);
    return () => clearTimeout(autoPushTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, termine, theme, grid, rows, autoSyncEnabled]);

  // Auto-Pull: Polling-Intervall + sofortige Prüfung beim Zurückkommen ins Tab
  useEffect(() => {
    if (!autoSyncEnabled || !syncToken.trim() || !syncGistId.trim() || !syncPassphrase) return;
    checkRemoteAndAutoPull();
    autoPollInterval.current = setInterval(checkRemoteAndAutoPull, 25000);
    function onFocus() {
      checkRemoteAndAutoPull();
    }
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      clearInterval(autoPollInterval.current);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoSyncEnabled, syncToken, syncGistId, syncPassphrase]);

  function toggleAutoSync() {
    const next = !autoSyncEnabled;
    setAutoSyncEnabled(next);
    persistSyncConfig(currentSyncConfig({ autoSync: next }));
  }

  function saveSyncCredentials() {
    persistSyncConfig(currentSyncConfig());
    showToast(t.toastSyncCredsSaved);
  }

  async function backupExportJSON() {
    try {
      const data = await collectAllData();
      const backup = { app: "wochenplan", version: 1, exportedAt: new Date().toISOString(), data };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `wochenplan-backup-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(t.toastBackupDownloaded);
      setBackupOpen(false);
    } catch (e) {
      console.error(e);
      showToast(t.toastBackupError);
    }
  }

  function backupImportClick() {
    if (backupFileInput.current) backupFileInput.current.click();
  }

  function backupImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(reader.result);
        const data = parsed && parsed.data ? parsed.data : parsed;
        if (!data || (!data.categories && !data.termine && !data.wochen)) {
          throw new Error("Not a Wochenplan backup file");
        }
        const ok = window.confirm(t.confirmImportBackup);
        if (!ok) return;
        await applyAllData(data);
        showToast(t.toastBackupApplied);
        setBackupOpen(false);
      } catch (err) {
        console.error(err);
        showToast(t.toastBackupInvalid);
      } finally {
        e.target.value = "";
      }
    };
    reader.readAsText(file);
  }

  function exportAsFile() {
    const sun = new Date(monday);
    sun.setDate(sun.getDate() + 6);
    const legend = categories
      .map((c) => `<span style="display:inline-flex;align-items:center;gap:5px;margin-right:14px;font-size:12px;color:#555">
        <span style="width:10px;height:10px;border-radius:50%;background:${c.color};display:inline-block"></span>${escapeHtml(c.name)}</span>`)
      .join("");

    const headerCells = t.daysLong.map((dLabel, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return `<th style="text-align:left;padding:8px 10px;border-bottom:2px solid #333;font-size:12px;background:#f4f4f5">${dLabel}<br><span style="font-weight:400;color:#888;font-size:11px">${fmtDate(d, t.locale)}</span></th>`;
    }).join("");

    const bodyRows = rows
      .map((row) => {
        const cells = TAGE.map((tag) => {
          const cell = normalizeCell(grid[row.id]?.[tag]);
          const cat = categories.find((c) => c.id === cell.cat);
          const termin = termine.find((tm) => tm.day === tag && tm.time === row.label);
          const bg = cat ? `${cat.color}22` : "transparent";
          const tagHtml = cat
            ? `<div style="font-size:9px;font-weight:600;color:${cat.color};margin-bottom:2px">${escapeHtml(cat.name)}</div>`
            : "";
          const pinHtml = termin
            ? `<div style="font-size:10px;font-weight:700;color:${getContrastColor(termin.color)};background:${termin.color};display:inline-block;padding:1px 6px;border-radius:4px;margin-bottom:3px">📌 ${escapeHtml(termin.title)}</div>`
            : "";
          const descHtml = cell.desc
            ? `<div style="font-size:11px;color:#888;font-style:italic;margin-top:3px">${escapeHtml(cell.desc).replace(/\n/g, "<br>")}</div>`
            : "";
          return `<td style="padding:7px 10px;border-bottom:1px solid #e5e5e5;border-right:1px solid #eee;vertical-align:top;background:${bg};font-size:12.5px;color:#222;min-width:110px">${pinHtml}${tagHtml}${escapeHtml(cell.text).replace(/\n/g, "<br>")}${descHtml}</td>`;
        }).join("");
        return `<tr><td style="padding:7px 10px;border-bottom:1px solid #e5e5e5;font-family:ui-monospace,monospace;font-size:12px;color:#555;background:#fafafa;white-space:nowrap">${escapeHtml(row.label)}</td>${cells}</tr>`;
      })
      .join("");

    const html = `<!DOCTYPE html>
<html lang="${t.exportHtmlLang}"><head><meta charset="UTF-8">
<title>${t.appTitle} ${fmtDateLong(monday, t.locale)} – ${fmtDateLong(sun, t.locale)}</title>
<style>
  body { font-family: -apple-system, Arial, sans-serif; margin: 32px; color: #111; }
  table { border-collapse: collapse; width: 100%; }
  @media print { body { margin: 8mm; } }
</style></head>
<body>
  <h1 style="font-size:20px;margin:0 0 4px">${t.appTitle}</h1>
  <p style="color:#666;font-size:13px;margin:0 0 14px">${fmtDateLong(monday, t.locale)} – ${fmtDateLong(sun, t.locale)} · ${t.weekAbbr} ${weekKey.split("-W")[1]}</p>
  ${legend ? `<div style="margin-bottom:14px">${legend}</div>` : ""}
  <table>
    <thead><tr><th style="text-align:left;padding:8px 10px;border-bottom:2px solid #333;font-size:12px;background:#f4f4f5;width:90px">${t.timeCol}</th>${headerCells}</tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>
  <p style="margin-top:20px;color:#aaa;font-size:11px">${t.exportCreatedWith}</p>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Wochenplan_${t.weekAbbr}${weekKey.split("-W")[1]}_${monday.getFullYear()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.toastFileDownloading);
  }

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  const todayKey = getISOWeekKey(new Date());
  const isToday = weekKey === todayKey;
  const todayTag = TAGE[(new Date().getDay() + 6) % 7];
  const activeCategory = categories.find((c) => c.id === activeCat);

  const rootStyle = {
    "--bg": theme.bg,
    "--surface": theme.surface,
    "--surface-2": theme.surface2,
    "--border": theme.border,
    "--border-soft": theme.border,
    "--text": theme.text,
    "--text-dim": theme.textDim,
    "--text-faint": theme.textFaint,
    "--accent": theme.accent,
    "--accent-dim": `${theme.accent}33`,
  };

  return (
    <div className="wp-root" style={rootStyle}>
      <style>{STYLE}</style>

      <div className="wp-header">
        <div>
          <h1 className="wp-title">{t.appTitle}</h1>
          <p className="wp-subtitle" key={weekKey}>
            {fmtDate(monday, t.locale)} – {fmtDate(sunday, t.locale)} · {t.weekAbbr} {weekKey.split("-W")[1]}
          </p>
        </div>
      </div>

      <div className="wp-toolbar">
        <div className="wp-weeknav">
          <button onClick={() => changeWeek(-1)} className="wp-navbtn" title={t.prevWeek}>←</button>
          <button onClick={goToday} className={`wp-navbtn today${isToday ? " on" : ""}`}>{t.today}</button>
          <button onClick={() => changeWeek(1)} className="wp-navbtn" title={t.nextWeek}>→</button>
        </div>
        <div className="wp-toolbargroup">
          <div className="wp-settingswrap" ref={continueRef}>
            <button onClick={() => setContinueOpen((v) => !v)} className="wp-btn ghost" title={t.continueTitle}>
              {t.continueBtn}
            </button>
            {continueOpen && (
              <div className="wp-settingspanel narrow">
                <p className="wp-settingstitle">
                  {t.continueTitle}
                  <button className="wp-settingsclose" onClick={() => setContinueOpen(false)}>✕</button>
                </p>
                <p className="wp-hint" style={{ marginBottom: 8 }}>
                  {t.continueDesc}
                </p>
                <div className="wp-continuewrap">
                  <input
                    type="number"
                    min={1}
                    max={52}
                    value={weeksToContinue}
                    onChange={(e) => setWeeksToContinue(e.target.value)}
                    className="wp-weeksinput"
                  />
                  <span className="wp-hint">{t.weeksLabel}</span>
                </div>
                <button className="wp-settingsreset accent" onClick={continueWeeks}>{t.apply}</button>
              </div>
            )}
          </div>
          <button onClick={exportAsFile} className="wp-btn ghost" title={t.saveFileTitle}>
            {t.saveFile}
          </button>
          <div className="wp-settingswrap" ref={backupRef}>
            <button onClick={() => setBackupOpen((v) => !v)} className="wp-iconbtn" title={t.backupIconTitle}>
              💾
            </button>
            <input
              type="file"
              accept="application/json"
              ref={backupFileInput}
              onChange={backupImportFile}
              style={{ display: "none" }}
            />
            {backupOpen && (
              <div className="wp-settingspanel narrow">
                <p className="wp-settingstitle">
                  {t.backupTitle}
                  <button className="wp-settingsclose" onClick={() => setBackupOpen(false)}>✕</button>
                </p>
                <p className="wp-hint" style={{ marginBottom: 10 }}>
                  {t.backupDesc}
                </p>
                <button className="wp-settingsreset accent" onClick={backupExportJSON}>
                  {t.backupExport}
                </button>
                <button className="wp-settingsreset" onClick={backupImportClick}>
                  {t.backupImport}
                </button>
              </div>
            )}
          </div>
          <div className="wp-settingswrap" ref={syncRef}>
            <button onClick={() => setSyncOpen((v) => !v)} className="wp-iconbtn" title={t.syncIconTitle}>
              🔄
              {autoSyncEnabled && syncToken && syncGistId && syncPassphrase && (
                <span className={`wp-syncdot${syncStatus === "error" ? " error" : syncStatus === "conflict" ? " conflict" : ""}`} />
              )}
            </button>
            {syncOpen && (
              <div className="wp-settingspanel narrow">
                <p className="wp-settingstitle">
                  {t.syncTitle}
                  <button className="wp-settingsclose" onClick={() => setSyncOpen(false)}>✕</button>
                </p>
                <p className="wp-hint" style={{ marginBottom: 8 }}>
                  {t.syncDescPre}<strong>{t.syncDescBold}</strong>{t.syncDescPost}
                </p>
                <input
                  type="password"
                  className="wp-syncinput"
                  placeholder={t.tokenPlaceholder}
                  value={syncToken}
                  onChange={(e) => setSyncToken(e.target.value)}
                  onBlur={saveSyncCredentials}
                />
                <input
                  type="text"
                  className="wp-syncinput"
                  placeholder={t.gistPlaceholder}
                  value={syncGistId}
                  onChange={(e) => setSyncGistId(e.target.value)}
                  onBlur={saveSyncCredentials}
                />
                <input
                  type="password"
                  className="wp-syncinput"
                  placeholder={t.passPlaceholder}
                  value={syncPassphrase}
                  onChange={(e) => setSyncPassphrase(e.target.value)}
                  onBlur={saveSyncCredentials}
                />
                <label className="wp-autosynctoggle">
                  <input type="checkbox" checked={autoSyncEnabled} onChange={toggleAutoSync} />
                  {t.autoSyncLabel}
                </label>

                {hasConflict && (
                  <div className="wp-conflictbox">
                    <p className="wp-conflicttitle">{t.conflictTitle}</p>
                    <p className="wp-hint" style={{ marginBottom: 8 }}>
                      {t.conflictDesc}
                    </p>
                    <div className="wp-syncbtns">
                      <button className="wp-settingsreset accent" onClick={() => syncPush()} disabled={syncBusy}>
                        {t.keepMine}
                      </button>
                      <button className="wp-settingsreset" onClick={() => syncPull({ force: true })} disabled={syncBusy}>
                        {t.takeTheirs}
                      </button>
                    </div>
                  </div>
                )}

                <div className="wp-syncbtns" style={{ marginTop: hasConflict ? 8 : 0 }}>
                  <button className="wp-settingsreset accent" onClick={() => syncPush()} disabled={syncBusy}>
                    {syncBusy ? "…" : t.uploadNow}
                  </button>
                  <button className="wp-settingsreset" onClick={() => syncPull()} disabled={syncBusy}>
                    {syncBusy ? "…" : t.downloadNow}
                  </button>
                </div>
                <p className="wp-hint" style={{ marginTop: 8 }}>
                  {syncStatus === "conflict"
                    ? t.statusConflict
                    : syncStatus === "syncing"
                    ? t.statusSyncing
                    : syncStatus === "error"
                    ? t.statusError
                    : localDirty
                    ? t.statusDirty
                    : t.statusReady}
                  {lastSynced && ` · ${t.lastSyncedLabel}: ${new Date(lastSynced).toLocaleTimeString(t.locale)}`}
                </p>
                <p className="wp-hint" style={{ marginTop: 8 }}>
                  {t.syncFootnotePre} <strong>{t.syncFootnoteBold}</strong>{t.syncFootnotePost}
                </p>
              </div>
            )}
          </div>
          <div className="wp-settingswrap" ref={settingsRef}>
            <button onClick={() => setSettingsOpen((v) => !v)} className="wp-iconbtn" title={t.colorsIconTitle}>
              <span className="wp-gear">⚙</span>
            </button>
            {settingsOpen && (
              <div className="wp-settingspanel">
                <p className="wp-settingstitle">
                  {t.colorsTitle}
                  <button className="wp-settingsclose" onClick={() => setSettingsOpen(false)}>✕</button>
                </p>
                <div className="wp-colorgrid">
                  {THEME_FIELD_KEYS.map((key) => (
                    <div className="wp-colorfield" key={key}>
                      <input
                        type="color"
                        className="wp-colorinput"
                        value={theme[key]}
                        onChange={(e) => updateThemeColor(key, e.target.value)}
                      />
                      <span className="wp-colorfieldlabel">{t.themeLabels[key]}</span>
                    </div>
                  ))}
                </div>
                <button className="wp-settingsreset" onClick={resetTheme}>{t.resetColors}</button>
                <p className="wp-settingstitle" style={{ marginTop: 14, marginBottom: 6, fontSize: 12 }}>{t.languageTitle}</p>
                <div className="wp-syncbtns">
                  <button
                    className={`wp-settingsreset${lang === "en" ? " accent" : ""}`}
                    onClick={() => changeLanguage("en")}
                  >
                    English
                  </button>
                  <button
                    className={`wp-settingsreset${lang === "de" ? " accent" : ""}`}
                    onClick={() => changeLanguage("de")}
                  >
                    Deutsch
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="wp-panel">
        <div className="wp-tabs">
          <button
            className={`wp-tab${activeTab === "kategorien" ? " active" : ""}`}
            onClick={() => setActiveTab("kategorien")}
          >
            {t.tabCategories}
          </button>
          <button
            className={`wp-tab${activeTab === "termine" ? " active" : ""}`}
            onClick={() => setActiveTab("termine")}
          >
            {t.tabAppointments}
          </button>
        </div>

        {activeTab === "termine" && (
          <div className="wp-tabbody">
            <div className="wp-chiprow">
              {termine.length === 0 && <span className="wp-hint">{t.noAppointments}</span>}
              {termine.map((term) => (
                <span key={term.id} className="wp-chip" style={{ "--chip-color": term.color }}>
                  <span className="wp-dot" style={{ "--chip-color": term.color }} />
                  <span className="wp-termchip-pin">{dayLabel(term.day)} {term.time}</span> {term.title}
                  <span className="wp-chip-x" onClick={() => removeTermin(term.id)}>✕</span>
                </span>
              ))}
            </div>
            <div className="wp-addterm">
              <select className="wp-select" value={newTermDay} onChange={(e) => setNewTermDay(e.target.value)}>
                {TAGE.map((code) => <option key={code} value={code}>{dayLabel(code)}</option>)}
              </select>
              <input
                className="wp-timeinput2"
                placeholder={t.timePlaceholder}
                value={newTermTime}
                onChange={(e) => setNewTermTime(e.target.value)}
              />
              <input
                className="wp-catinput"
                placeholder={t.titlePlaceholder}
                value={newTermTitle}
                onChange={(e) => setNewTermTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTermin()}
              />
              {PALETTE.map((col) => (
                <span
                  key={col}
                  className={`wp-swatch${newTermColor === col ? " sel" : ""}`}
                  style={{ background: col }}
                  onClick={() => setNewTermColor(col)}
                />
              ))}
              <label className="wp-rainbow" title={t.customColorTitle}>
                <input type="color" value={newTermColor} onChange={(e) => setNewTermColor(e.target.value)} />
              </label>
              <button className="wp-btn ghost" onClick={addTermin}>{t.addBtn}</button>
            </div>
          </div>
        )}

        {activeTab === "kategorien" && (
          <div className="wp-tabbody">
            <div className="wp-chiprow">
              <button
                className={`wp-chip${activeCat === null ? " active" : ""}`}
                style={{ "--chip-color": "#5b6270" }}
                onClick={() => setActiveCat(null)}
              >
                <span className="wp-dot" style={{ "--chip-color": "#5b6270" }} />
                {t.off}
              </button>
              <button
                className={`wp-chip${activeCat === ERASER ? " active" : ""}`}
                style={{ "--chip-color": "#f87171" }}
                onClick={() => setActiveCat(ERASER)}
              >
                <span className="wp-dot" style={{ "--chip-color": "#f87171" }} />
                {t.eraser}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  className={`wp-chip${activeCat === c.id ? " active" : ""}`}
                  style={{ "--chip-color": c.color }}
                  onClick={() => setActiveCat(c.id)}
                >
                  <span className="wp-dot" style={{ "--chip-color": c.color }} />
                  {c.name}
                  <span className="wp-chip-x" onClick={(e) => { e.stopPropagation(); removeCategory(c.id); }}>✕</span>
                </button>
              ))}
            </div>
            <div className="wp-addcat">
              <input
                className="wp-catinput"
                placeholder={t.newCategoryPlaceholder}
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
              />
              {PALETTE.map((col) => (
                <span
                  key={col}
                  className={`wp-swatch${newCatColor === col ? " sel" : ""}`}
                  style={{ background: col }}
                  onClick={() => setNewCatColor(col)}
                />
              ))}
              <label className="wp-rainbow" title={t.customColorTitle}>
                <input type="color" value={newCatColor} onChange={(e) => setNewCatColor(e.target.value)} />
              </label>
              <button className="wp-btn ghost" onClick={addCategory}>{t.addBtn}</button>
            </div>

            {(activeCategory || activeCat === ERASER) && (
              <p className="wp-paintinfo">
                {activeCategory ? t.brushActive(activeCategory.name) : t.eraserActive}
              </p>
            )}

            <button className="wp-rangetoggle" onClick={() => setRangeToolOpen((v) => !v)}>
              <span className={`wp-descarrow${rangeToolOpen ? " open" : ""}`}>▸</span>
              {t.rangeToggle}
            </button>
            {rangeToolOpen && (
              <div className="wp-rangerow">
                <input type="date" className="wp-dateinput" value={rangeFrom} onChange={(e) => setRangeFrom(e.target.value)} />
                <span className="wp-hint">{t.rangeTo}</span>
                <input type="date" className="wp-dateinput" value={rangeTo} onChange={(e) => setRangeTo(e.target.value)} />
                <button className="wp-rangebtn" onClick={paintDateRange} disabled={rangeBusy}>
                  {rangeBusy ? t.rangeColoring : t.rangeColorBtn}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="wp-loading">{t.loadingWeek}</div>
      ) : (
        <>
          <div className="wp-tablewrap" key={weekKey}>
            <table className="wp-table">
              <thead>
                <tr>
                  <th className="wp-th" style={{ width: 110 }}>{t.timeCol}</th>
                  {t.daysLong.map((dLabel, i) => {
                    const d = new Date(monday);
                    d.setDate(d.getDate() + i);
                    const isTodayCol = isToday && TAGE[i] === todayTag;
                    return (
                      <th key={dLabel} className={`wp-th${isTodayCol ? " today-col" : ""}`}>
                        <div>{dLabel}</div>
                        <div className="d">{fmtDate(d, t.locale)}</div>
                        {activeCat && (
                          <button className="wp-daybtn" onClick={() => paintWholeDay(TAGE[i])}>
                            {t.wholeDayBtn}
                          </button>
                        )}
                      </th>
                    );
                  })}
                  <th className="wp-th" style={{ width: 32 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`wp-row${dragIndex === idx ? " dragging" : ""}${dragOverIndex === idx && dragIndex !== idx ? " dragover" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); if (dragOverIndex !== idx) setDragOverIndex(idx); }}
                    onDragLeave={() => setDragOverIndex((v) => (v === idx ? null : v))}
                    onDrop={(e) => { e.preventDefault(); handleDrop(idx); }}
                  >
                    <td className="wp-td" style={{ padding: 0 }}>
                      <div className="wp-timecell">
                        <span
                          className="wp-draghandle"
                          draggable
                          onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; setDragIndex(idx); }}
                          onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
                          title={t.dragHandleTitle}
                        >
                          ⠿
                        </span>
                        {editingRow === row.id ? (
                          <input
                            autoFocus
                            className="wp-timeinput"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => commitEditRow(row.id)}
                            onKeyDown={(e) => e.key === "Enter" && commitEditRow(row.id)}
                          />
                        ) : (
                          <span className="wp-time" onClick={() => startEditRow(row)} title={t.editTimeTitle}>
                            {row.label}
                          </span>
                        )}
                      </div>
                    </td>
                    {TAGE.map((tag) => {
                      const cell = grid[row.id]?.[tag] || { text: "", desc: "", cat: null };
                      const cat = categories.find((c) => c.id === cell.cat);
                      const termin = termine.find((term) => term.day === tag && term.time === row.label);
                      const cellKey = `${row.id}|${tag}`;
                      const isExpanded = expandedDesc === cellKey;
                      return (
                        <td key={tag} className={`wp-td${isToday && tag === todayTag ? " today-col" : ""}`} style={{ padding: 0 }}>
                          <div className="wp-cellwrap" style={cat ? { background: `${cat.color}1f` } : undefined}>
                            {termin && (
                              <div className="wp-pin" style={{ background: termin.color, color: getContrastColor(termin.color) }}>
                                📌 {termin.title}
                              </div>
                            )}
                            <textarea
                              className="wp-cell"
                              value={cell.text}
                              placeholder=""
                              onChange={(e) => updateCellField(row.id, tag, "text", e.target.value)}
                              onMouseDown={(e) => {
                                if (activeCat !== null) {
                                  paintCell(row.id, tag);
                                }
                              }}
                              rows={1}
                            />
                            {cat && <span className="wp-catdot" style={{ background: cat.color }} title={cat.name} />}
                            <button
                              className={`wp-desctoggle${cell.desc ? " has" : ""}${isExpanded ? " open" : ""}`}
                              onClick={() => setExpandedDesc(isExpanded ? null : cellKey)}
                            >
                              <span className="wp-descarrow">▸</span>
                              {t.descriptionLabel}{cell.desc && !isExpanded ? " ●" : ""}
                            </button>
                            <div className={`wp-desccollapse${isExpanded ? " open" : ""}`}>
                              {isExpanded && (
                                <textarea
                                  className="wp-desc"
                                  autoFocus
                                  placeholder={t.descriptionPlaceholder}
                                  value={cell.desc}
                                  onChange={(e) => updateCellField(row.id, tag, "desc", e.target.value)}
                                  rows={2}
                                />
                              )}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    <td className="wp-td" style={{ padding: 0, textAlign: "center" }}>
                      <button onClick={() => removeRow(row.id)} title={t.deleteRowTitle} className="wp-del">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="wp-addrow">
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder={t.newTimePlaceholder}
              className="wp-input"
              onKeyDown={(e) => e.key === "Enter" && addRow()}
            />
            <button onClick={addRow} className="wp-btn">{t.addTimeBtn}</button>
            <span className="wp-hint">{t.bottomHint}</span>
          </div>
        </>
      )}

      {toast && <div className="wp-toast">{toast}</div>}
    </div>
  );
}
