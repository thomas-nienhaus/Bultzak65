import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCacheById, getAllCaches, calculateScore } from '../utils/scoring'
import { getTeam, getFoundCaches, markCacheFound, isCacheFound } from '../utils/storage'

export default function CachePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const cache = getCacheById(id)
  const team = getTeam()
  const [found, setFound] = useState(isCacheFound(Number(id)))

  if (!team) {
    navigate('/')
    return null
  }

  if (!cache) {
    return (
      <div className="page">
        <h1>Cache niet gevonden</h1>
        <Link to="/">Terug naar start</Link>
      </div>
    )
  }

  function handleFound() {
    markCacheFound(cache.id)
    setFound(true)
  }

  const allCaches = getAllCaches()
  const nextCache = allCaches.find((c) => c.id === cache.id + 1)
  const score = calculateScore(getFoundCaches())

  return (
    <div className="page">
      <h1>📍 {cache.name}</h1>
      <p className="points">{cache.points} punten</p>
      <div className="hint">
        <h2>Hint</h2>
        <p>{cache.hint}</p>
      </div>

      {!found ? (
        <>
          <p>Heb je deze cache gevonden?</p>
          <button onClick={handleFound}>Gevonden! ✅</button>
        </>
      ) : (
        <>
          <p className="success">Goed gedaan, {team}! Punten toegekend.</p>
          {nextCache ? (
            <Link className="button-link" to={`/cache/${nextCache.id}`}>
              Naar volgende cache
            </Link>
          ) : (
            <Link className="button-link" to="/finish">
              Naar de finish
            </Link>
          )}
        </>
      )}

      <p className="score-footer">Huidige score: {score} punten</p>
    </div>
  )
}
