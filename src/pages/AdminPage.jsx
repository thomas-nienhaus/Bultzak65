import { useEffect, useState } from 'react'
import { getTeam, resetProgress } from '../utils/storage'
import { getAllCaches, calculateScore } from '../utils/scoring'
import { getAllFinds } from '../utils/supabase'
import { useNavigate } from 'react-router-dom'

function groupByTeam(finds) {
  const byTeam = new Map()
  for (const { team, cache_id } of finds) {
    if (!byTeam.has(team)) byTeam.set(team, [])
    byTeam.get(team).push(cache_id)
  }
  return byTeam
}

export default function AdminPage() {
  const navigate = useNavigate()
  const team = getTeam()
  const caches = getAllCaches()
  const [finds, setFinds] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    function load() {
      getAllFinds()
        .then((data) => {
          if (!cancelled) {
            setFinds(data)
            setError(false)
          }
        })
        .catch(() => {
          if (!cancelled) setError(true)
        })
    }

    load()
    const interval = setInterval(load, 5000)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  function handleReset() {
    if (confirm('Voortgang op dit toestel wissen?')) {
      resetProgress()
      navigate('/')
    }
  }

  const byTeam = finds ? groupByTeam(finds) : new Map()
  const teams = [...byTeam.entries()]
    .map(([name, foundIds]) => ({ name, foundIds, score: calculateScore(foundIds) }))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="page">
      <h1>📋 Overzicht</h1>
      <p>
        Dit toestel: <strong>{team || '(nog niet gestart)'}</strong>
      </p>

      <h2>Live scorebord</h2>
      {error && <p className="note">Kan geen verbinding maken met het scorebord.</p>}
      {!error && finds === null && <p className="note">Laden…</p>}
      {!error && finds !== null && teams.length === 0 && (
        <p className="note">Nog geen team heeft een cache gevonden.</p>
      )}
      {teams.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Score</th>
              <th>Gevonden</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.name}>
                <td>{t.name}</td>
                <td>{t.score}</td>
                <td>
                  {t.foundIds.length} / {caches.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={handleReset}>Voortgang op dit toestel wissen</button>
    </div>
  )
}
