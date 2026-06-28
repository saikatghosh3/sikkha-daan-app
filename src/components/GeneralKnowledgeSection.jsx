import { useState, useEffect, useCallback, useRef } from 'react'
import { api } from '../api/client'
import './LearningSection.css'

const CATEGORY_CONFIG = [
  { value: 'national', label: '🇧🇩 National', icon: '🏛️' },
  { value: 'geography', label: '🗺️ Geography', icon: '🌍' },
  { value: 'history', label: '📜 History', icon: '📜' },
  { value: 'culture', label: '🎭 Culture', icon: '🎭' },
  { value: 'general', label: '📚 General', icon: '📚' },
]

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

export default function GeneralKnowledgeSection() {
  const [items, setItems] = useState([])
  const [activeCat, setActiveCat] = useState('national')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    api.generalKnowledge.getAll()
      .then(data => { if (data.length) setItems(data) })
      .catch(() => {})
  }, [])

  const data = items.filter(i => i.category === activeCat)
  const catConfig = CATEGORY_CONFIG.find(c => c.value === activeCat) || CATEGORY_CONFIG[0]
  const current = data[currentIndex] || {}

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCat])

  useEffect(() => {
    if (autoPlay && data.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % data.length)
      }, 3500)
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

  const progress = data.length > 0 ? ((currentIndex + 1) / data.length) * 100 : 0
  const bgGradient = BG_GRADIENTS[currentIndex % BG_GRADIENTS.length]

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <h2 className="learn-section-title">General Knowledge</h2>
        <p className="learn-section-subtitle">Learn about Bangladesh</p>
      </div>

      <div className="learn-tabs">
        {CATEGORY_CONFIG.map(cat => (
          <button
            key={cat.value}
            className={`learn-tab ${activeCat === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCat(cat.value)}
          >
            <span className="learn-tab-icon">{cat.icon}</span>
            <span>{cat.label}</span>
            <span className="learn-tab-count">({items.filter(i => i.category === cat.value).length})</span>
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="learn-empty">
          <p>No items in this category yet.</p>
          <p className="learn-empty-hint">Add some from the admin panel.</p>
        </div>
      ) : (
        <>
          <div className="learn-progress">
            <div className="learn-progress-bar">
              <div className="learn-progress-fill" style={{ width: `${progress}%`, background: '#6366f1' }} />
            </div>
            <span className="learn-progress-text">{currentIndex + 1}/{data.length}</span>
          </div>

          <div
            className="learn-card gk-card"
            key={`${activeCat}-${currentIndex}`}
            style={{
              background: current.image
                ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${current.image}) center/cover no-repeat`
                : bgGradient,
            }}
          >
            {current.image && (
              <div className="learn-image-wrap">
                <span className="gk-emoji">{catConfig.icon}</span>
              </div>
            )}
            {!current.image && (
              <div className="gk-emoji-large">{catConfig.icon}</div>
            )}
            {current.title && (
              <h3 className="gk-title">{current.title}</h3>
            )}
            {current.name && (
              <div className="gk-name-row">
                <span className="gk-name">{current.name}</span>
                {current.name_bn && <span className="gk-name-bn">{current.name_bn}</span>}
              </div>
            )}
            {current.description && (
              <p className="gk-desc">{current.description}</p>
            )}
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
                style={idx === currentIndex ? { background: '#6366f1' } : {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
