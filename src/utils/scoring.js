import cachesData from '../data/caches.json'

export function getCacheById(id) {
  return cachesData.caches.find((c) => c.id === Number(id))
}

export function getAllCaches() {
  return cachesData.caches
}

export function calculateScore(foundIds) {
  return cachesData.caches
    .filter((c) => foundIds.includes(c.id))
    .reduce((sum, c) => sum + c.points, 0)
}
