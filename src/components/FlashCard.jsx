import { useState, useEffect, useCallback, useRef } from 'react'
import './LearningSection.css'

const imgCache = new Set()

function preloadImg(src) {
  if (!src || imgCache.has(src)) return
  imgCache.add(src)
  const img = new Image()
  img.src = src
}

export default function FlashCard({ items, title, categoryColor }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [loaded, setLoaded] = useState(false)
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

  useEffect(() => {
    setLoaded(false)
    if (currentItem.image) {
      preloadImg(currentItem.image)
      const img = new Image()
      img.onload = () => setLoaded(true)
      img.src = currentItem.image
    } else {
      setLoaded(true)
    }
  }, [currentIndex, currentItem.image])

  useEffect(() => {
    if (items.length > 1) {
      const nextIdx = (currentIndex + 1) % items.length
      const nextItem = items[nextIdx]
      if (nextItem?.image) preloadImg(nextItem.image)
    }
  }, [currentIndex, items])

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
        <p className="learn-section-subtitle">{items.length} items</p>
      </div>

      <div className="learn-progress">
        <div className="learn-progress-bar">
          <div className="learn-progress-fill" style={{ width: `${progress}%`, background: categoryColor }} />
        </div>
        <span className="learn-progress-text">{currentIndex + 1}/{items.length}</span>
      </div>

      <div className={`learn-card ${loaded ? 'loaded' : ''}`} key={currentIndex}>
        {currentItem.character && (
          <div className="learn-character">{currentItem.character}</div>
        )}

        {currentItem.name && (
          <div className="learn-name">{currentItem.name}</div>
        )}

        {currentItem.image && (
          <div className="learn-image-wrap">
            <img src={currentItem.image} alt="" className="learn-image" loading="lazy" />
          </div>
        )}

        {currentItem.text && (
          <p className="learn-rhyme-text">{currentItem.text}</p>
        )}

        {currentItem.description && (
          <p className="learn-description">{currentItem.description}</p>
        )}
      </div>

      <div className="learn-controls">
        <button className="learn-btn learn-btn-prev" onClick={handlePrev}>
          ← Prev
        </button>
        <button className={`learn-btn learn-btn-auto ${autoPlay ? 'playing' : ''}`} onClick={toggleAuto}>
          {autoPlay ? '⏹ Stop' : '▶ Auto'}
        </button>
        <button className="learn-btn learn-btn-next" onClick={handleNext}>
          Next →
        </button>
      </div>

      <div className="learn-dots">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            style={idx === currentIndex ? { background: categoryColor } : {}}
          />
        ))}
      </div>
    </div>
  )
}
