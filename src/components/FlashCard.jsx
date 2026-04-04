import { useState } from 'react'

export default function FlashCard({ items, title, categoryColor }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showImage, setShowImage] = useState(false)

  const currentItem = items[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setShowImage(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setShowImage(false)
  }

  const handleFlip = () => {
    setShowImage(prev => !prev)
  }

  return (
    <div className="flashcard-container">
      <h2 className="flashcard-title">{title}</h2>

      {/* Progress Bar */}
      <div className="flashcard-progress">
        <span>{currentIndex + 1} / {items.length}</span>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%`, backgroundColor: categoryColor }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="flashcard" style={{ borderColor: categoryColor }}>
        <div className="flashcard-character">{currentItem.character}</div>

        <div className={`flashcard-image-container ${showImage ? 'show' : ''}`}>
          <img
            src={currentItem.image}
            alt={currentItem.character}
            className="flashcard-image"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flashcard-controls">
        <button className="control-button prev-button" onClick={handlePrev}>
          ← Previous
        </button>
        <button className="control-button flip-button" onClick={handleFlip}>
          Flip Card
        </button>
        <button className="control-button next-button" onClick={handleNext}>
          Next →
        </button>
      </div>

      {/* Alphabet Selector */}
      <div className="card-items">
        {items.map((item, index) => (
          <div
            key={index}
            className={`card-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(index)
              setShowImage(false)
            }}
            style={{ backgroundColor: index === currentIndex ? categoryColor : '#f0f0f0' }}
          >
            {item.character}
          </div>
        ))}
      </div>
    </div>
  )
}