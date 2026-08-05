const DEFAULT_PREFIX = 'astronauts_clone_pkl:'

function getFullKey(key) {
  return `${DEFAULT_PREFIX}${key}`
}

export function readJson(key, defaultValue) {
  const fullKey = getFullKey(key)
  try {
    const raw = localStorage.getItem(fullKey)
    if (!raw) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function writeJson(key, value) {
  const fullKey = getFullKey(key)
  localStorage.setItem(fullKey, JSON.stringify(value))
}

export function removeKey(key) {
  const fullKey = getFullKey(key)
  localStorage.removeItem(fullKey)
}

