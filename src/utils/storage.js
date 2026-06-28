const TEAM_KEY = 'qrhunt_team'
const FOUND_KEY = 'qrhunt_found'

export function getTeam() {
  return localStorage.getItem(TEAM_KEY) || ''
}

export function setTeam(name) {
  localStorage.setItem(TEAM_KEY, name)
}

export function getFoundCaches() {
  try {
    return JSON.parse(localStorage.getItem(FOUND_KEY)) || []
  } catch {
    return []
  }
}

export function markCacheFound(cacheId) {
  const found = getFoundCaches()
  if (!found.includes(cacheId)) {
    found.push(cacheId)
    localStorage.setItem(FOUND_KEY, JSON.stringify(found))
  }
  return found
}

export function isCacheFound(cacheId) {
  return getFoundCaches().includes(cacheId)
}

export function resetProgress() {
  localStorage.removeItem(TEAM_KEY)
  localStorage.removeItem(FOUND_KEY)
}
