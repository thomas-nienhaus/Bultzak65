import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import StartPage from './pages/StartPage'
import CachePage from './pages/CachePage'
import FinishPage from './pages/FinishPage'
import AdminPage from './pages/AdminPage'
import FullAdminPage from './pages/FullAdminPage'
import TeamJoinPage from './pages/TeamJoinPage'

function App() {
  return (
    <HashRouter>
      <nav className="topnav">
        <Link to="/">🏠 Start</Link>
        <Link to="/admin">📋 Overzicht</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/team/:name" element={<TeamJoinPage />} />
        <Route path="/cache/:id" element={<CachePage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/beheer" element={<FullAdminPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
