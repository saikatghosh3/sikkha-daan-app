
import { useState } from 'react'

export default function FlashCard({ items, title, categoryColor }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentItem = items[currentIndex]

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
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
            style={{
              width: `${((currentIndex + 1) / items.length) * 100}%`,
              backgroundColor: categoryColor
            }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      {/* old code satrt */}
      {/* <div className="flashcard" style={{ borderColor: categoryColor }}>
        <div className="flashcard-character">
          {currentItem.character}
        </div>

        <div className="flashcard-image-container">
          <img
            src={currentItem.image}
            alt={currentItem.character}
            className="flashcard-image"
          />
        </div>
      </div> */}
      {/* old code end  */}
      {/* new code start */}
      <div className="flashcard" style={{ borderColor: categoryColor }}>
  
  {/* Title (NEW) */}
  {currentItem.title && (
    <h3 className="flashcard-heading">
      {currentItem.title}
    </h3>
  )}

  {/* Character (existing) */}
  {currentItem.character && (
    <div className="flashcard-character">
      {currentItem.character}
    </div>
  )}

  {/* Image (existing) */}
  {currentItem.image && (
    <div className="flashcard-image-container">
      <img
        src={currentItem.image}
        alt={currentItem.title || currentItem.character}
        className="flashcard-image"
      />
    </div>
  )}

  {/* Description / Text (NEW 🔥) */}
  {currentItem.text && (
    <p className="flashcard-text">
      {currentItem.text}
    </p>
  )}

</div>
      {/* new code end  */}

      {/* Controls */}
      <div className="flashcard-controls">
        <button className="control-button prev-button" onClick={handlePrev}>
          ← Previous
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
            onClick={() => setCurrentIndex(index)}
            style={{
              backgroundColor:
                index === currentIndex ? categoryColor : '#f0f0f0'
            }}
          >
            {item.character}
          </div>
        ))}
      </div>
    </div>
  )
}