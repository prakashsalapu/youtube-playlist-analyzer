const cache = new Map();

export function getCache(key) {
  const entry = cache.get(key);
  if (!entry) return null;

  const { data, expiry } = entry;

  if (Date.now() > expiry) {
    cache.delete(key);
    return null;
  }

  return data;
}

export function setCache(key, data, ttlMs = 1000 * 60 * 60) {
  cache.set(key, {
    data,
    expiry: Date.now() + ttlMs,
  });
}