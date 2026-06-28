import { getTeam, getFoundCaches, resetProgress } from '../utils/storage'
import { getAllCaches, calculateScore } from '../utils/scoring'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const navigate = useNavigate()
  const team = getTeam()
  const found = getFoundCaches()
  const caches = getAllCaches()
  const score = calculateScore(found)

  function handleReset() {
    if (confirm('Voortgang op dit toestel wissen?')) {
      resetProgress()
      navigate('/')
    }
  }

  return (
    <div className="page">
      <h1>📋 Overzicht</h1>
      <p className="note">Dit overzicht toont enkel de voortgang van jouw eigen team.</p>
      <p>
        Team: <strong>{team || '(nog niet gestart)'}</strong>
      </p>
      <p className="points">Score: {score} punten</p>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cache</th>
            <th>Punten</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {caches.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.points}</td>
              <td>{found.includes(c.id) ? '✅ gevonden' : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleReset}>Voortgang wissen</button>
    </div>
  )
}
