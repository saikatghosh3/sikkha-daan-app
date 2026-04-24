import { useState } from 'react'

export default function ShapeFlashCard({ items, title, categoryColor }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentItem = items[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="shape-card-container">
      <h2 className="shape-title">{title}</h2>

      {/* Progress */}
      <div className="shape-progress">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Card */}
      <div
        className="shape-card"
        style={{ borderColor: categoryColor }}
      >
        {/* SHAPE FIRST (main focus) */}
        <div className="shape-svg">
          {currentItem.svg}
        </div>

        {/* NAME */}
        <h3 className="shape-name">
          {currentItem.nameEn}
        </h3>

        <p className="shape-bn">
          {currentItem.nameBn}
        </p>
      </div>

      {/* Controls */}
      <div className="shape-controls">
        <button onClick={handlePrev}>←</button>
        <button onClick={handleNext}>→</button>
      </div>

      {/* Dots */}
      <div className="shape-dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            style={{
              background:
                index === currentIndex ? categoryColor : '#ddd'
            }}
          />
        ))}
      </div>
    </div>
  )
}