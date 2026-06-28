import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import StartPage from './pages/StartPage'
import CachePage from './pages/CachePage'
import FinishPage from './pages/FinishPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <HashRouter>
      <nav className="topnav">
        <Link to="/">🏠 Start</Link>
        <Link to="/admin">📋 Overzicht</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/cache/:id" element={<CachePage />} />
        <Route path="/finish" element={<FinishPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
