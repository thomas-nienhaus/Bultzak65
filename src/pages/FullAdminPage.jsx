import { useEffect, useState } from 'react'
import { getAllCaches, calculateScore } from '../utils/scoring'
import { getAllFinds } from '../utils/supabase'

const UNLOCK_KEY = 'qrhunt_admin_unlocked'

function groupByTeam(finds) {
  const byTeam = new Map()
  for (const { team, cache_id } of finds) {
    if (!byTeam.has(team)) byTeam.set(team, [])
    byTeam.get(team).push(cache_id)
  }
  return byTeam
}

function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [wrong, setWrong] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      localStorage.setItem(UNLOCK_KEY, '1')
      onUnlock()
    } else {
      setWrong(true)
    }
  }

  return (
    <div className="page">
      <h1>🔒 Beheer</h1>
      <p>Voer de beheer-pincode in.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value)
            setWrong(false)
          }}
          placeholder="Pincode"
          autoFocus
        />
        <button type="submit">Ontgrendelen</button>
      </form>
      {wrong && <p className="note">Onjuiste pincode.</p>}
    </div>
  )
}

export default function FullAdminPage() {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(UNLOCK_KEY) === '1')
  const caches = getAllCaches()
  const [finds, setFinds] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!unlocked) return
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
  }, [unlocked])

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />
  }

  const byTeam = finds ? groupByTeam(finds) : new Map()
  const teams = [...byTeam.entries()]
    .map(([name, foundIds]) => ({ name, foundIds, score: calculateScore(foundIds) }))
    .sort((a, b) => b.score - a.score)

  return (
    <div className="page">
      <h1>🔓 Beheer: volledig overzicht</h1>

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
    </div>
  )
}
