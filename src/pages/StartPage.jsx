import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTeam, setTeam } from '../utils/storage'

export default function StartPage() {
  const [name, setName] = useState(getTeam())
  const navigate = useNavigate()

  function handleStart(e) {
    e.preventDefault()
    if (!name.trim()) return
    setTeam(name.trim())
    navigate('/cache/1')
  }

  return (
    <div className="page">
      <h1>🏆 Schatzoektocht</h1>
      <p>Voer je teamnaam in om te beginnen.</p>
      <form onSubmit={handleStart}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Teamnaam"
          autoFocus
        />
        <button type="submit">Start</button>
      </form>
    </div>
  )
}
