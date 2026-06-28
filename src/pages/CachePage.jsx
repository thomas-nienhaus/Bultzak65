import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCacheById, getAllCaches, calculateScore } from '../utils/scoring'
import { getTeam, setTeam, getFoundCaches, markCacheFound, isCacheFound } from '../utils/storage'

export default function CachePage() {
  const { id } = useParams()
  const cache = getCacheById(id)
  const [team, setTeamState] = useState(getTeam())
  const [teamInput, setTeamInput] = useState('')
  const [found, setFound] = useState(isCacheFound(Number(id)))

  if (!team) {
    return (
      <div className="page">
        <h1>🏆 Schatzoektocht</h1>
        <p>Voer je teamnaam in om verder te gaan.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!teamInput.trim()) return
            setTeam(teamInput.trim())
            setTeamState(teamInput.trim())
          }}
        >
          <input
            type="text"
            value={teamInput}
            onChange={(e) => setTeamInput(e.target.value)}
            placeholder="Teamnaam"
            autoFocus
          />
          <button type="submit">Start</button>
        </form>
      </div>
    )
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
