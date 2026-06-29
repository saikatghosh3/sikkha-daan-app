import confetti from 'canvas-confetti'
import { useRef } from 'react'

const NAV_ITEMS = [
  { key: 'bangla', label: 'বাংলা', sub: 'Bangla' },
  { key: 'numbers', label: '১২৩', sub: 'Numbers' },
  { key: 'english', label: 'ABC', sub: 'English' },
  { key: 'rhymes', label: 'ছড়া', sub: 'Rhymes' },
  { key: 'multiplication', label: 'নামতা', sub: 'Table' },
 { key: 'match', label: 'মিলকরণ', sub: 'Match' },
  { key: 'shapes', label: 'আকৃতি', sub: 'Shapes' },
  { key: 'colors', label: 'রং', sub: 'Colors' },
  { key: 'generalknowledge', label: 'সাধারণ জ্ঞান', sub: 'GK' },
]

export default function Navigation({ activeSection, setActiveSection }) {
  const toggleRef = useRef(false)

  const handleClick = (section) => {
    setActiveSection(section)
    toggleRef.current = !toggleRef.current
    confetti({
      particleCount: 60,
      spread: 60,
      startVelocity: 25,
      origin: { x: toggleRef.current ? 0.1 : 0.9, y: 0.5 },
    })
  }

  return (
    <nav className="navigation">
      {NAV_ITEMS.map(item => (
        <button
          key={item.key}
          className={`nav-button ${activeSection === item.key ? 'active' : ''}`}
          onClick={() => handleClick(item.key)}
          title={item.sub}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
