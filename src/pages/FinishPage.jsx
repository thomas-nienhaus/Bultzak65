import { Link } from 'react-router-dom'
import { getTeam, getFoundCaches } from '../utils/storage'
import { calculateScore, getAllCaches } from '../utils/scoring'

export default function FinishPage() {
  const team = getTeam()
  const found = getFoundCaches()
  const score = calculateScore(found)
  const total = getAllCaches().length

  return (
    <div className="page">
      <h1>🏁 Finish!</h1>
      {team ? (
        <>
          <p>
            Goed gedaan, <strong>{team}</strong>!
          </p>
          <p className="points">
            Eindscore: {score} punten ({found.length}/{total} caches gevonden)
          </p>
        </>
      ) : (
        <p>Je hebt nog niet meegedaan.</p>
      )}
      <Link className="button-link" to="/">
        Terug naar start
      </Link>
    </div>
  )
}
