import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { setTeam } from '../utils/storage'

export default function TeamJoinPage() {
  const { name } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setTeam(decodeURIComponent(name))
    navigate('/cache/1', { replace: true })
  }, [name, navigate])

  return null
}
