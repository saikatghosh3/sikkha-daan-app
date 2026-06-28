import confetti from 'canvas-confetti'
import './LearningSection.css'

const fireConfetti = () => {
  const duration = 1500
  const end = Date.now() + duration
  const interval = setInterval(() => {
    if (Date.now() > end) return clearInterval(interval)
    confetti({ particleCount: 50, spread: 100, startVelocity: 30, origin: { x: Math.random(), y: Math.random() - 0.2 } })
  }, 200)
}

const toBanglaNumber = (number) => {
  const digits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
  return number.toString().split('').map(d => digits[d]).join('')
}

const generateTable = (num) => {
  const rows = []
  for (let i = 1; i <= 10; i++) {
    rows.push(`${toBanglaNumber(num)} × ${toBanglaNumber(i)} = ${toBanglaNumber(num * i)}`)
  }
  return rows
}

const COLORS = [
  '#6366f1', '#ec4899', '#14b8a6', '#f59e0b',
  '#ef4444', '#8b5cf6', '#06b6d4', '#10b981',
  '#f97316', '#3b82f6',
]

export default function MultiplicationSection() {
  const tables = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="multiply-wrapper">
      <div className="multiply-header">
        <h2 className="multiply-title">বাংলা নামতা (১ - ১০)</h2>
        <p className="multiply-subtitle">Bengali Multiplication Tables 1 to 10</p>
      </div>

      <div className="multiply-grid">
        {tables.map((num, idx) => (
          <div
            key={num}
            className="multiply-card"
            style={{ background: `linear-gradient(135deg, ${COLORS[idx]}, ${COLORS[idx]}cc)` }}
          >
            <h3 className="multiply-card-title">{toBanglaNumber(num)} এর নামতা</h3>
            <ul className="multiply-card-list">
              {generateTable(num).map((item, i) => (
                <li key={i} className="multiply-card-item">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
