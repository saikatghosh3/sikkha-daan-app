import { useState, useEffect, useMemo, useCallback, useRef } from "react"
import { api } from '../api/client'
import confetti from 'canvas-confetti'
import './MatchGame.css'

const fireConfetti = () => {
  const duration = 1500
  const end = Date.now() + duration
  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval)
    confetti({ particleCount: 50, spread: 100, startVelocity: 30, origin: { x: Math.random(), y: Math.random() - 0.2 } })
  }, 200)
}

const MODE_OPTIONS = [
  { key: 'english', label: 'English', icon: '🔤' },
  { key: 'bangla', label: 'বাংলা', icon: '🅱️' },
  { key: 'numbers', label: 'Numbers', icon: '🔢' },
]

const COLORS = [
  { bg: '#6366f1', light: '#e0e7ff' },
  { bg: '#ec4899', light: '#fce7f3' },
  { bg: '#14b8a6', light: '#ccfbf1' },
  { bg: '#f59e0b', light: '#fef3c7' },
  { bg: '#ef4444', light: '#fee2e2' },
  { bg: '#8b5cf6', light: '#ede9fe' },
  { bg: '#06b6d4', light: '#cffafe' },
  { bg: '#10b981', light: '#d1fae5' },
]

const STATIC_PAIRS = [
  { id: 1, mode: 'english', left_value: 'A', right_value: 'Apple' },
  { id: 2, mode: 'english', left_value: 'B', right_value: 'Ball' },
  { id: 3, mode: 'english', left_value: 'C', right_value: 'Cat' },
  { id: 4, mode: 'english', left_value: 'D', right_value: 'Dog' },
  { id: 5, mode: 'bangla', left_value: 'অ', right_value: 'অজগর' },
  { id: 6, mode: 'bangla', left_value: 'আ', right_value: 'আম' },
  { id: 7, mode: 'bangla', left_value: 'ই', right_value: 'ইঁদুর' },
  { id: 8, mode: 'bangla', left_value: 'উ', right_value: 'উট' },
  { id: 9, mode: 'numbers', left_value: '১', right_value: 'One' },
  { id: 10, mode: 'numbers', left_value: '২', right_value: 'Two' },
  { id: 11, mode: 'numbers', left_value: '৩', right_value: 'Three' },
  { id: 12, mode: 'numbers', left_value: '৪', right_value: 'Four' },
]

export default function MatchGame() {
  const [allPairs, setAllPairs] = useState(STATIC_PAIRS)
  const [mode, setMode] = useState('english')
  const [shuffleKey, setShuffleKey] = useState(0)
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongLeft, setWrongLeft] = useState(null)
  const [wrongRight, setWrongRight] = useState(null)
  const [score, setScore] = useState(0)
  const [inputMethod, setInputMethod] = useState('click')
  const [completed, setCompleted] = useState(false)
  const [draggingOver, setDraggingOver] = useState(null)
  const rightRef = useRef(null)

  useEffect(() => {
    api.matchGame.getAll()
      .then(data => { if (data.length) setAllPairs(data) })
      .catch(() => {})
  }, [])

  const data = useMemo(() => allPairs.filter(p => p.mode === mode), [allPairs, mode])

  const shuffledRight = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5)
  }, [data, shuffleKey])

  const handleMatch = useCallback((leftItem, rightItem) => {
    if (leftItem.id === rightItem.id) {
      const newMatched = [...matched, leftItem.id]
      setMatched(newMatched)
      setScore(prev => prev + 1)
      setWrongLeft(null)
      setWrongRight(null)
      if (newMatched.length === data.length) {
        setCompleted(true)
        fireConfetti()
      }
    } else {
      setWrongLeft(leftItem.id)
      setWrongRight(rightItem.id)
      setTimeout(() => { setWrongLeft(null); setWrongRight(null) }, 600)
    }
    setSelectedLeft(null)
  }, [matched, data.length])

  const handleLeftClick = useCallback((item) => {
    if (matched.includes(item.id)) return
    if (selectedLeft?.id === item.id) {
      setSelectedLeft(null)
      return
    }
    setSelectedLeft(item)
  }, [matched, selectedLeft])

  const handleRightClick = useCallback((item) => {
    if (matched.includes(item.id)) return
    if (!selectedLeft) return
    handleMatch(selectedLeft, item)
  }, [matched, selectedLeft, handleMatch])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setDraggingOver(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setDraggingOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDraggingOver(false)
    try {
      const leftItem = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (matched.includes(leftItem.id)) return
      const rightEl = e.target.closest('.match-card.right')
      if (rightEl) return
    } catch {}
  }, [matched])

  const handleRightDrop = useCallback((e) => {
    e.preventDefault()
    setDraggingOver(false)
    try {
      const leftItem = JSON.parse(e.dataTransfer.getData('text/plain'))
      if (matched.includes(leftItem.id)) return
      const rightEl = e.target.closest('.match-card.right')
      if (rightEl) {
        const rightId = Number(rightEl.dataset.id)
        handleMatch(leftItem, { id: rightId })
      }
    } catch {}
  }, [matched, handleMatch])

  const changeMode = useCallback((newMode) => {
    setMode(newMode)
    setMatched([])
    setScore(0)
    setSelectedLeft(null)
    setCompleted(false)
    setShuffleKey(prev => prev + 1)
  }, [])

  const resetGame = useCallback(() => {
    setMatched([])
    setScore(0)
    setSelectedLeft(null)
    setCompleted(false)
    setWrongLeft(null)
    setWrongRight(null)
    setShuffleKey(prev => prev + 1)
  }, [])

  const progress = data.length > 0 ? (matched.length / data.length) * 100 : 0

  return (
    <div className="match-wrapper">
      <div className="match-header">
        <h2 className="match-title">Match the Pair</h2>
        <p className="match-subtitle">Match items from left to right</p>
      </div>

      <div className="match-controls">
        <div className="match-mode-tabs">
          {MODE_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className={`match-mode-tab ${mode === opt.key ? 'active' : ''}`}
              onClick={() => changeMode(opt.key)}
            >
              <span className="match-mode-icon">{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="match-input-toggle">
          <button
            className={`match-toggle-btn ${inputMethod === 'click' ? 'active' : ''}`}
            onClick={() => setInputMethod('click')}
          >
            Click
          </button>
          <button
            className={`match-toggle-btn ${inputMethod === 'drag' ? 'active' : ''}`}
            onClick={() => setInputMethod('drag')}
          >
            Drag & Drop
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="match-empty">
          <p>No pairs available for this mode.</p>
          <p className="match-empty-hint">Add some from the admin panel.</p>
        </div>
      ) : (
        <>
          <div className="match-progress">
            <div className="match-progress-bar">
              <div className="match-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="match-progress-text">{matched.length} / {data.length} matched</span>
          </div>

          <div className="match-board">
            <div className="match-column left-column">
              <div className="match-column-header">
                <span className="match-column-label">Items</span>
                {selectedLeft && inputMethod === 'click' && (
                  <span className="match-column-hint">Now click a match on the right</span>
                )}
                {inputMethod === 'drag' && (
                  <span className="match-column-hint">Drag items to the right</span>
                )}
              </div>
              <div className="match-column-body">
                {data.map((item, idx) => {
                  const matched2 = matched.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      draggable={inputMethod === 'drag' && !matched2}
                      onDragStart={(e) => {
                        if (inputMethod === 'drag' && !matched2) {
                          e.dataTransfer.setData('text/plain', JSON.stringify(item))
                        }
                      }}
                      className={`match-card left ${matched2 ? 'matched' : ''} ${selectedLeft?.id === item.id ? 'selected' : ''} ${wrongLeft === item.id ? 'wrong' : ''}`}
                      onClick={() => inputMethod === 'click' && !matched2 && handleLeftClick(item)}
                      style={{ '--idx': idx }}
                    >
                      <div className="match-card-badge">{idx + 1}</div>
                      <span className="match-card-value">{item.left_value}</span>
                      {matched2 && (
                        <span className="match-card-check">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="match-divider">
              <div className="match-divider-line" />
              <div className="match-divider-icon">
                {inputMethod === 'drag' ? '↔' : '⟷'}
              </div>
              <div className="match-divider-line" />
            </div>

            <div
              className={`match-column right-column ${draggingOver ? 'drag-over' : ''}`}
              ref={rightRef}
              onDragOver={inputMethod === 'drag' ? handleDragOver : undefined}
              onDragLeave={inputMethod === 'drag' ? handleDragLeave : undefined}
              onDrop={inputMethod === 'drag' ? handleRightDrop : undefined}
            >
              <div className="match-column-header">
                <span className="match-column-label">Matches</span>
                {inputMethod === 'click' && selectedLeft && (
                  <span className="match-column-hint">Tap a card to match</span>
                )}
              </div>
              <div className="match-column-body">
                {shuffledRight.map((item, idx) => {
                  const matched2 = matched.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      data-id={item.id}
                      className={`match-card right ${matched2 ? 'matched' : ''} ${wrongRight === item.id ? 'wrong' : ''} ${inputMethod === 'click' && selectedLeft && !matched2 ? 'highlight' : ''}`}
                      onClick={() => inputMethod === 'click' && !matched2 && handleRightClick(item)}
                      style={{ '--idx': idx }}
                    >
                      <span className="match-card-value">{item.right_value}</span>
                      {matched2 && (
                        <span className="match-card-check">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {completed && (
            <div className="match-complete">
              <span className="match-complete-icon">🎉</span>
              <span>All matched! Great job!</span>
            </div>
          )}

          <div className="match-footer">
            <div className="match-score">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span>{score} / {data.length}</span>
            </div>
            <button className="match-reset-btn" onClick={resetGame}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  )
}
