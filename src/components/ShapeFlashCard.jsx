import { useState, useEffect, useCallback, useRef } from 'react'
import './LearningSection.css'

export default function ShapeFlashCard({ items, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const timerRef = useRef(null)

  const currentItem = items[currentIndex] || {}

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % items.length)
      }, 2500)
    }
    return () => clearInterval(timerRef.current)
  }, [autoPlay, items.length])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % items.length)
  }, [items.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const toggleAuto = () => {
    setAutoPlay(prev => !prev)
    if (autoPlay) clearInterval(timerRef.current)
  }

  if (!items.length) return null

  const progress = ((currentIndex + 1) / items.length) * 100

  return (
    <div className="learn-section">
      <div className="learn-section-header">
        <h2 className="learn-section-title">{title}</h2>
        <p className="learn-section-subtitle">{items.length} shapes</p>
      </div>

      <div className="learn-progress">
        <div className="learn-progress-bar">
          <div className="learn-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="learn-progress-text">{currentIndex + 1}/{items.length}</span>
      </div>

      <div className="learn-shape-card" key={currentIndex}>
        <div className="learn-shape-svg">
          {currentItem.svg}
        </div>
        <h3 className="learn-shape-name">{currentItem.name_en || currentItem.nameEn}</h3>
        <p className="learn-shape-name-bn">{currentItem.name_bn || currentItem.nameBn}</p>
      </div>

      <div className="learn-controls">
        <button className="learn-btn learn-btn-prev" onClick={handlePrev}>← Prev</button>
        <button className={`learn-btn learn-btn-auto ${autoPlay ? 'playing' : ''}`} onClick={toggleAuto}>
          {autoPlay ? '⏹ Stop' : '▶ Auto'}
        </button>
        <button className="learn-btn learn-btn-next" onClick={handleNext}>Next →</button>
      </div>

      <div className="learn-dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  )
}
