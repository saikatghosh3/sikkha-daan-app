import { useState } from 'react'

export default function ColorFlashCard({ items, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentItem = items[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="color-container">
      <h2 className="color-title">{title}</h2>

      {/* Card */}
      <div
        className="color-card"
        style={{ background: currentItem.color }}
      >
        {/* Color Circle */}
        {/* <div className="color-preview" /> */}

        {/* Names */}
        <h3 className="color-name">{currentItem.nameEn}</h3>
        <p className="color-bn">{currentItem.nameBn}</p>

        {/* Example */}
        <p className="color-example">
          {currentItem.example}
        </p>
      </div>

      {/* Controls */}
      <div className="color-controls">
        <button onClick={handlePrev}>←</button>
        <button onClick={handleNext}>→</button>
      </div>

      {/* Dots */}
      <div className="color-dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}