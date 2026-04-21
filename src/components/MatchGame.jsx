import { useState, useMemo } from "react"

export default function MatchGame() {

  const gameModes = {
    english: [
      { id: 1, left: "A", right: "Apple" },
      { id: 2, left: "B", right: "Ball" },
      { id: 3, left: "C", right: "Cat" },
      { id: 4, left: "D", right: "Dog" }
    ],
    bangla: [
      { id: 1, left: "অ", right: "অজগর" },
      { id: 2, left: "আ", right: "আম" },
      { id: 3, left: "ই", right: "ইঁদুর" },
      { id: 4, left: "উ", right: "উট" }
    ],
    numbers: [
      { id: 1, left: "1", right: "One" },
      { id: 2, left: "2", right: "Two" },
      { id: 3, left: "3", right: "Three" },
      { id: 4, left: "4", right: "Four" }
    ]
  }

  const [mode, setMode] = useState("english")
  const data = gameModes[mode]

  const [shuffleKey, setShuffleKey] = useState(0)

  const shuffledRight = useMemo(() => {
    return [...data].sort(() => Math.random() - 0.5)
  }, [mode, shuffleKey])

  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrongPair, setWrongPair] = useState(null)
  const [score, setScore] = useState(0)

  // 🔥 FIXED MATCH LOGIC (IMPORTANT)
  const handleMatch = (leftItem, rightItem) => {
    if (leftItem.id === rightItem.id) {
      setMatched(prev => [...prev, leftItem.id])
      setScore(prev => prev + 1)
      setWrongPair(null)
    } else {
      setWrongPair({
        left: leftItem.id,
        right: rightItem.id
      })

      setTimeout(() => setWrongPair(null), 700)
    }

    setSelectedLeft(null)
    setSelectedRight(null)
  }

  // 🔥 FIXED LEFT CLICK (NO RACE CONDITION)
  const handleLeftClick = (item) => {
    if (matched.includes(item.id)) return

    setSelectedLeft(item)

    if (selectedRight) {
      handleMatch(item, selectedRight)
    }
  }

  // 🔥 FIXED RIGHT CLICK
  const handleRightClick = (item) => {
    if (matched.includes(item.id)) return

    setSelectedRight(item)

    if (selectedLeft) {
      handleMatch(selectedLeft, item)
    }
  }

  const resetGame = () => {
    setMatched([])
    setScore(0)
    setSelectedLeft(null)
    setSelectedRight(null)
    setWrongPair(null)
    setShuffleKey(prev => prev + 1)
  }

  const changeMode = (newMode) => {
    setMode(newMode)
    setMatched([])
    setScore(0)
    setSelectedLeft(null)
    setSelectedRight(null)
    setWrongPair(null)
    setShuffleKey(prev => prev + 1)
  }

  return (
    <div className="match-container">

      <h2 className="match-title">Match the Pair 🎯</h2>

      <div className="mode-switch">
        <button
          className={mode === "english" ? "active" : ""}
          onClick={() => changeMode("english")}
        >
          English
        </button>

        <button
          className={mode === "bangla" ? "active" : ""}
          onClick={() => changeMode("bangla")}
        >
          বাংলা
        </button>

        <button
          className={mode === "numbers" ? "active" : ""}
          onClick={() => changeMode("numbers")}
        >
          Numbers
        </button>
      </div>

      <div className="match-grid">

        {/* LEFT */}
        <div className="match-column">
          {data.map(item => (
            <div
              key={item.id}
              className={`match-item
                ${selectedLeft?.id === item.id ? "selected" : ""}
                ${matched.includes(item.id) ? "matched" : ""}
                ${wrongPair?.left === item.id ? "wrong" : ""}
              `}
              onClick={() => handleLeftClick(item)}
            >
              {item.left}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="match-column">
          {shuffledRight.map(item => (
            <div
              key={item.id}
              className={`match-item
                ${selectedRight?.id === item.id ? "selected" : ""}
                ${matched.includes(item.id) ? "matched" : ""}
                ${wrongPair?.right === item.id ? "wrong" : ""}
              `}
              onClick={() => handleRightClick(item)}
            >
              {item.right}
            </div>
          ))}
        </div>

      </div>

      <div className="score-row">
        <p key={score} className="score">
          Score: {score}
        </p>

        <button className="reset-btn" onClick={resetGame}>
          🔄 Reset
        </button>
      </div>

    </div>
  )
}