import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import BanglaManager from './pages/BanglaManager'
import EnglishManager from './pages/EnglishManager'
import NumbersManager from './pages/NumbersManager'
import RhymesManager from './pages/RhymesManager'
import MatchGameManager from './pages/MatchGameManager'
import ShapesManager from './pages/ShapesManager'
import ColorsManager from './pages/ColorsManager'
import AdminLogin from './AdminLogin'
import './admin.css'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Crect x="3" y="3" width="7" height="7"%3E%3C/rect%3E%3Crect x="14" y="3" width="7" height="7"%3E%3C/rect%3E%3Crect x="14" y="14" width="7" height="7"%3E%3C/rect%3E%3Crect x="3" y="14" width="7" height="7"%3E%3C/rect%3E%3C/svg%3E' },
  { key: 'bangla', label: 'Bangla', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ctext x="4" y="20" font-size="18" font-weight="bold" fill="currentColor"%3Eঅ%3C/text%3E%3C/svg%3E' },
  { key: 'english', label: 'English', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ctext x="5" y="20" font-size="18" font-weight="bold" fill="currentColor"%3EA%3C/text%3E%3C/svg%3E' },
  { key: 'numbers', label: 'Numbers', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ctext x="5" y="20" font-size="18" font-weight="bold" fill="currentColor"%3E123%3C/text%3E%3C/svg%3E' },
  { key: 'rhymes', label: 'Rhymes', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"%3E%3C/path%3E%3Cpath d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"%3E%3C/path%3E%3C/svg%3E' },
  { key: 'matchgame', label: 'Match Game', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M20 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"%3E%3C/path%3E%3Cpath d="M8 12h8"%3E%3C/path%3E%3Cpath d="M12 8v8"%3E%3C/path%3E%3C/svg%3E' },
  { key: 'shapes', label: 'Shapes', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpolygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"%3E%3C/polygon%3E%3C/svg%3E' },
  { key: 'colors', label: 'Colors', icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Cpath d="M12 2a7 7 0 0 0 0 14c2.2 0 4-1.8 4-4s-1.8-4-4-4"%3E%3C/path%3E%3C/svg%3E' },
]

export default function AdminPanel({ onExit }) {
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showLogout, setShowLogout] = useState(false)

  if (!user) {
    return <AdminLogin onLogin={(email) => setUser(email)} />
  }

  const renderPage = () => {
    switch (page) {
      case 'bangla': return <BanglaManager />
      case 'english': return <EnglishManager />
      case 'numbers': return <NumbersManager />
      case 'rhymes': return <RhymesManager />
      case 'matchgame': return <MatchGameManager />
      case 'shapes': return <ShapesManager />
      case 'colors': return <ColorsManager />
      default: return <Dashboard />
    }
  }

  const currentLabel = navItems.find(n => n.key === page)?.label || 'Dashboard'

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <span className="admin-sidebar-logo">SD</span>
          <span className="admin-sidebar-title">Sikkha Daan</span>
        </div>
        <nav className="admin-sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.key}
              className={`admin-nav-item ${page === item.key ? 'active' : ''}`}
              onClick={() => { setPage(item.key); setSidebarOpen(false) }}
            >
              <img src={item.icon} alt="" className="admin-nav-icon" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user" onClick={() => setShowLogout(!showLogout)}>
            <div className="admin-sidebar-avatar">{user[0].toUpperCase()}</div>
            <div className="admin-sidebar-userinfo">
              <span className="admin-sidebar-username">{user}</span>
              {showLogout && (
                <button className="admin-sidebar-logout-btn" onClick={onExit}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <h2 className="admin-topbar-title">{currentLabel}</h2>
          <div className="admin-topbar-spacer" />
        </header>

        <div className="admin-content">
          {renderPage()}
        </div>
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
