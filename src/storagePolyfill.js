// Einfacher Ersatz für die Claude.ai-Artefakt-Storage-API,
// basierend auf localStorage. Läuft komplett lokal im Browser.
window.storage = {
  async get(key, shared = false) {
    const storeKey = shared ? `shared:${key}` : key;
    const v = localStorage.getItem(storeKey);
    if (v === null) {
      throw new Error(`Key not found: ${key}`);
    }
    return { key, value: v, shared };
  },
  async set(key, value, shared = false) {
    const storeKey = shared ? `shared:${key}` : key;
    localStorage.setItem(storeKey, value);
    return { key, value, shared };
  },
  async delete(key, shared = false) {
    const storeKey = shared ? `shared:${key}` : key;
    localStorage.removeItem(storeKey);
    return { key, deleted: true, shared };
  },
  async list(prefix = "", shared = false) {
    const scanPrefix = shared ? `shared:${prefix}` : prefix;
    const keys = Object.keys(localStorage)
      .filter((k) => k.startsWith(scanPrefix))
      .map((k) => (shared ? k.replace(/^shared:/, "") : k));
    return { keys, prefix, shared };
  },
};
