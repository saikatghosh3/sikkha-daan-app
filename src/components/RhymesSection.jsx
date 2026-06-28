import { useState, useEffect, useCallback, useRef } from "react"
import { api } from '../api/client'
import './LearningSection.css'

const TAB_COLORS = {
  bangla: { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
  english: { primary: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
}

const BG_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
]

export default function RhymesSection() {
  const [bangla, setBangla] = useState([])
  const [english, setEnglish] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bangla')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    Promise.all([api.rhymes.getBangla(), api.rhymes.getEnglish()])
      .then(([b, e]) => { setBangla(b); setEnglish(e) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const data = activeTab === 'bangla' ? bangla : english
  const colors = TAB_COLORS[activeTab]
  const current = data[currentIndex] || {}

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  useEffect(() => {
    if (autoPlay && data.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % data.length)
      }, 4000)
    }
    return () => clearInterval(timerRef.current)
  }, [autoPlay, data.length])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % data.length)
  }, [data.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + data.length) % data.length)
  }, [data.length])

  const toggleAuto = () => {
    setAutoPlay(prev => !prev)
    if (autoPlay) clearInterval(timerRef.current)
  }

  if (loading) return <div className="learn-loading">Loading rhymes...</div>

  const progress = data.length > 0 ? ((currentIndex + 1) / data.length) * 100 : 0
  const bgGradient = BG_GRADIENTS[currentIndex % BG_GRADIENTS.length]

  return (
    <div className="learn-rhymes-section">
      <div className="learn-section-header">
        <h2 className="learn-section-title">
          {activeTab === 'bangla' ? 'বাংলা ছড়া' : 'English Rhymes'}
        </h2>
        <p className="learn-section-subtitle">{data.length} rhymes</p>
      </div>

      <div className="learn-tabs">
        <button
          className={`learn-tab ${activeTab === 'bangla' ? 'active' : ''}`}
          onClick={() => setActiveTab('bangla')}
        >
          <span className="learn-tab-icon">🅱️</span>
          <span>বাংলা</span>
          <span className="learn-tab-count">({bangla.length})</span>
        </button>
        <button
          className={`learn-tab ${activeTab === 'english' ? 'active' : ''}`}
          onClick={() => setActiveTab('english')}
        >
          <span className="learn-tab-icon">🔤</span>
          <span>English</span>
          <span className="learn-tab-count">({english.length})</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="learn-empty">
          <p>No rhymes available for this language.</p>
          <p className="learn-empty-hint">Add some from the admin panel.</p>
        </div>
      ) : (
        <>
          <div className="learn-progress">
            <div className="learn-progress-bar">
              <div className="learn-progress-fill" style={{ width: `${progress}%`, background: colors.primary }} />
            </div>
            <span className="learn-progress-text">{currentIndex + 1}/{data.length}</span>
          </div>

          <div
            className="learn-rhyme-card"
            key={`${activeTab}-${currentIndex}`}
            style={{
              background: current.image
                ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${current.image}) center/cover no-repeat`
                : bgGradient,
            }}
          >
            <span className="learn-rhyme-icon">📖</span>
            <h3 className="learn-rhyme-title">{current.title}</h3>
            {current.text && (
              <p className="learn-rhyme-text">{current.text}</p>
            )}
            <span className="learn-rhyme-number">Rhyme {currentIndex + 1} of {data.length}</span>
          </div>

          <div className="learn-controls">
            <button className="learn-btn learn-btn-prev" onClick={handlePrev}>
              ← Previous
            </button>
            <button className={`learn-btn learn-btn-auto ${autoPlay ? 'playing' : ''}`} onClick={toggleAuto}>
              {autoPlay ? '⏹ Stop' : '▶ Auto'}
            </button>
            <button className="learn-btn learn-btn-next" onClick={handleNext}>
              Next →
            </button>
          </div>

          <div className="learn-dots">
            {data.map((_, idx) => (
              <button
                key={idx}
                className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                style={idx === currentIndex ? { background: colors.primary } : {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
