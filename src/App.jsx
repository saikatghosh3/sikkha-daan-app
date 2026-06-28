import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import BanglaSection from './components/BanglaSection'
import NumbersSection from './components/NumbersSection'
import EnglishSection from './components/EnglishSection'
import RhymesSection from './components/RhymesSection'
import MultiplicationSection from './components/MultiplicationSection'
import ScrollToTop from './components/ScrollToTop'
import MatchGame from './components/MatchGame'
import ShapesSection from './components/ShapesSection'
import ColorsSection from './components/ColorsSection'
import GeneralKnowledgeSection from './components/GeneralKnowledgeSection'
import AdminPanel from './admin/AdminPanel'

function App() {
  const [activeSection, setActiveSection] = useState('bangla')
  const [isAdmin, setIsAdmin] = useState(false)

  if (isAdmin) {
    return <AdminPanel onExit={() => setIsAdmin(false)} />
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-left">
            <div className="app-logo">SD</div>
            <div className="app-header-text">
              <h1>Sikkha Daan</h1>
              <p>শিক্ষা দান — শিক্ষার অফুরান দান</p>
            </div>
          </div>
          <div className="app-header-right">
            <button className="app-header-btn" onClick={() => setIsAdmin(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              Admin
            </button>
          </div>
        </div>
      </header>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="main-content">
        {activeSection === 'bangla' && <BanglaSection />}
        {activeSection === 'numbers' && <NumbersSection />}
        {activeSection === 'english' && <EnglishSection />}
        {activeSection === 'rhymes' && <RhymesSection />}
        {activeSection === 'multiplication' && <MultiplicationSection />}
        {activeSection === 'match' && <MatchGame />}
        {activeSection === 'shapes' && <ShapesSection />}
        {activeSection === 'colors' && <ColorsSection />}
        {activeSection === 'generalknowledge' && <GeneralKnowledgeSection />}
      </main>
      <ScrollToTop />
    </div>
  )
}

export default App
