import { useEffect, useMemo } from 'react'
import useFlashCardNav from '../hooks/useFlashCardNav'
import useImageReady, { preloadImage } from '../hooks/useImageReady'
import './LearningSection.css'

const NO_ITEMS = []

export default function FlashCard({ items, title, categoryColor }) {
  const list = useMemo(() => (Array.isArray(items) ? items : NO_ITEMS), [items])

  const {
    index: currentIndex,
    total,
    isNavigating,
    autoPlay,
    goNext,
    goPrev,
    goTo,
    toggleAutoPlay,
    handleKeyDown,
  } = useFlashCardNav(list.length, 2500)

  const currentItem = list[currentIndex] || {}
  const imageReady = useImageReady(currentItem.image)

  useEffect(() => {
    list.forEach(item => {
      if (item?.image) preloadImage(item.image)
    })
  }, [list])

  if (!total) return null

  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="learn-section" tabIndex={-1} onKeyDown={handleKeyDown}>
      <div className="learn-section-header">
        <h2 className="learn-section-title">{title}</h2>
        <p className="learn-section-subtitle">{total} items</p>
      </div>

      <div className="learn-progress">
        <div className="learn-progress-bar">
          <div className="learn-progress-fill" style={{ width: `${progress}%`, background: categoryColor }} />
        </div>
        <span className="learn-progress-text">{currentIndex + 1}/{total}</span>
      </div>

      <div
        className={`learn-card ${imageReady ? 'loaded' : ''}`}
        key={currentIndex}
        role="group"
        aria-roledescription="carousel"
        aria-label={title}
      >
        {currentItem.character && (
          <div className="learn-character">{currentItem.character}</div>
        )}

        {currentItem.name && (
          <div className="learn-name">{currentItem.name}</div>
        )}

        {currentItem.image && (
          <div className="learn-image-wrap">
            <img src={currentItem.image} alt={currentItem.name || ''} className="learn-image" />
          </div>
        )}

        {currentItem.text && (
          <p className="learn-rhyme-text">{currentItem.text}</p>
        )}

        {currentItem.description && (
          <p className="learn-description">{currentItem.description}</p>
        )}
      </div>

      <div className={`learn-controls ${isNavigating ? 'is-busy' : ''}`}>
        <button
          type="button"
          className="learn-btn learn-btn-prev"
          onClick={goPrev}
          aria-label="Previous item"
        >
          ← Prev
        </button>
        <button
          type="button"
          className={`learn-btn learn-btn-auto ${autoPlay ? 'playing' : ''}`}
          onClick={toggleAutoPlay}
          aria-pressed={autoPlay}
        >
          {autoPlay ? '⏹ Stop' : '▶ Auto'}
        </button>
        <button
          type="button"
          className="learn-btn learn-btn-next"
          onClick={goNext}
          aria-label="Next item"
        >
          Next →
        </button>
      </div>

      <div className="learn-dots">
        {list.map((item, idx) => (
          <button
            type="button"
            key={item.character ?? item.name ?? idx}
            className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to item ${idx + 1}`}
            aria-current={idx === currentIndex}
            style={idx === currentIndex ? { background: categoryColor } : {}}
          />
        ))}
      </div>
    </div>
  )
}
