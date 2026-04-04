import { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import BanglaSection from './components/BanglaSection'
import NumbersSection from './components/NumbersSection'
import EnglishSection from './components/EnglishSection'

function App() {
  const [activeSection, setActiveSection] = useState('bangla')

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Learning Alphabets</h1>
        <p>Interactive flashcards for children</p>
      </header>

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="main-content">
        {activeSection === 'bangla' && <BanglaSection />}
        {activeSection === 'numbers' && <NumbersSection />}
        {activeSection === 'english' && <EnglishSection />}
      </main>
    </div>
  )
}

export default App
