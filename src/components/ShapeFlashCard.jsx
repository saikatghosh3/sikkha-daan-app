import useFlashCardNav from '../hooks/useFlashCardNav'
import './LearningSection.css'

export default function ShapeFlashCard({ items, title }) {
  const list = Array.isArray(items) ? items : []

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

  if (!total) return null

  const currentItem = list[currentIndex] || {}
  const progress = ((currentIndex + 1) / total) * 100

  return (
    <div className="learn-section" tabIndex={-1} onKeyDown={handleKeyDown}>
      <div className="learn-section-header">
        <h2 className="learn-section-title">{title}</h2>
        <p className="learn-section-subtitle">{total} shapes</p>
      </div>

      <div className="learn-progress">
        <div className="learn-progress-bar">
          <div className="learn-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="learn-progress-text">{currentIndex + 1}/{total}</span>
      </div>

      <div
        className="learn-shape-card"
        key={currentIndex}
        role="group"
        aria-roledescription="carousel"
        aria-label={title}
      >
        <div className="learn-shape-svg">
          {currentItem.svg}
        </div>
        <h3 className="learn-shape-name">{currentItem.name_en || currentItem.nameEn}</h3>
        <p className="learn-shape-name-bn">{currentItem.name_bn || currentItem.nameBn}</p>
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
            key={item.id ?? item.name_en ?? idx}
            className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goTo(idx)}
            aria-label={`Go to item ${idx + 1}`}
            aria-current={idx === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}
