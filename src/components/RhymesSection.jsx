import { useState, useEffect, useCallback, useRef } from "react"
import { api } from '../api/client'
import './LearningSection.css'

const TAB_COLORS = {
  bangla: { primary: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)' },
  english: { primary: '#3b82f6', gradient: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
}

const BG_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
]

const STATIC_BANGLA = [
  { title: "আয় আয় চাঁদ মামা", text: "আয় আয় চাঁদ মামা টিপ দিয়ে যা,\nচাঁদের কপালে চাঁদ টিপ দিয়ে যা।\nধান ভানলে কুঁড়ো দেব,\nমাছ কাটলে মুড়ো দেব,\nকালো গায়ের দুধ দেব,\nদুধ খাওয়ার বাটি দেব,\nচাঁদের কপালে চাঁদ টিপ দিয়ে যা।", image: "/img/chadmama.png" },
  { title: "আয় বৃষ্টি ঝেঁপে", text: "আয় বৃষ্টি ঝেঁপে,\nধান দেব মেপে।\nলেবুর পাতায় করমচা,\nযা বৃষ্টি ঝরে যা", image: "/img/rain.png" },
  { title: "আতা গাছে তোতা পাখি", text: "আতা গাছে তোতা পাখি,\nডালিম গাছে মৌ।\nএত ডাকি তবু কথা,\nকও না কেন বউ?", image: "/img/tota.png" },
  { title: "হাট্টিমা টিম টিম", text: "হাট্টিমা টিম টিম,\nতারা মাঠে পাড়ে ডিম।\nতাদের খাড়া দুটো শিং,\nতারা হাট্টিমা টিম টিম।", image: "/img/hattima.png" },
  { title: "খোকন খোকন ডাক পাড়ি", text: "খোকন খোকন ডাক পাড়ি,\nখোকন মোদের কার বাড়ি?\nআয় রে খোকন ঘরে আয়,\nদুধ-মাখা ভাত কাকে খায়।", image: "/img/khokon.png" },
  { title: "ভোর হলো দোর খোলো", text: "ভোর হলো দোর খোলো,\nখুকুমণি ওঠো রে।\nঐ ডাকে জুঁই শাখে,\nফুলখুকি ছোট রে।", image: "/img/bhor.png" },
  { title: "তাই তাই তাই", text: "তাই তাই তাই,\nমামার বাড়ি যাই।\nমামা দিল দুধ ভাত,\nদুয়ারে বসে খাই।\nমামি এল লাঠি নিয়ে,\nপালাই পালাই।", image: "/img/tai.png" },
]

const STATIC_ENGLISH = [
  { title: "Twinkle Twinkle Little Star", text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.", image: "/img/star.png" },
  { title: "Baa Baa Black Sheep", text: "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.\nOne for the master,\nAnd one for the dame,\nAnd one for the little boy,\nWho lives down the lane.", image: "/img/sheep.png" },
  { title: "Johny Johny Yes Papa", text: "Johny, Johny, Yes Papa?\nEating sugar, No Papa!\nTelling lies, No Papa!\nOpen your mouth, Ha! Ha! Ha!", image: "/img/johny.png" },
  { title: "Humpty Dumpty", text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again.", image: "/img/humpty.png" },
  { title: "Incy Wincy Spider", text: "The incy wincy spider climbed up the waterspout.\nDown came the rain and washed the spider out.\nOut came the sun and dried up all the rain,\nAnd the incy wincy spider climbed up the spout again.", image: "/img/spider.png" },
  { title: "Rain, Rain, Go Away", text: "Rain, rain, go away,\nCome again another day.\nLittle Johnny wants to play,\nRain, rain, go away.", image: "/img/rain_go.png" },
  { title: "Jack and Jill", text: "Jack and Jill went up the hill,\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.", image: "/img/Jack_jill.png" },
]

export default function RhymesSection() {
  const [bangla, setBangla] = useState(STATIC_BANGLA)
  const [english, setEnglish] = useState(STATIC_ENGLISH)
  const [activeTab, setActiveTab] = useState('bangla')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    Promise.all([api.rhymes.getBangla(), api.rhymes.getEnglish()])
      .then(([b, e]) => { if (b.length) setBangla(b); if (e.length) setEnglish(e) })
      .catch(() => {})
  }, [])

  const data = activeTab === 'bangla' ? bangla : english
  const colors = TAB_COLORS[activeTab]
  const current = data[currentIndex] || {}

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  useEffect(() => {
    if (autoPlay && data.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % data.length)
      }, 4000)
    }
    return () => clearInterval(timerRef.current)
  }, [autoPlay, data.length])

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % data.length)
  }, [data.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + data.length) % data.length)
  }, [data.length])

  const toggleAuto = () => {
    setAutoPlay(prev => !prev)
    if (autoPlay) clearInterval(timerRef.current)
  }

  const progress = data.length > 0 ? ((currentIndex + 1) / data.length) * 100 : 0
  const bgGradient = BG_GRADIENTS[currentIndex % BG_GRADIENTS.length]

  return (
    <div className="learn-rhymes-section">
      <div className="learn-section-header">
        <h2 className="learn-section-title">
          {activeTab === 'bangla' ? 'বাংলা ছড়া' : 'English Rhymes'}
        </h2>
        <p className="learn-section-subtitle">{data.length} rhymes</p>
      </div>

      <div className="learn-tabs">
        <button
          className={`learn-tab ${activeTab === 'bangla' ? 'active' : ''}`}
          onClick={() => setActiveTab('bangla')}
        >
          <span className="learn-tab-icon">🅱️</span>
          <span>বাংলা</span>
          <span className="learn-tab-count">({bangla.length})</span>
        </button>
        <button
          className={`learn-tab ${activeTab === 'english' ? 'active' : ''}`}
          onClick={() => setActiveTab('english')}
        >
          <span className="learn-tab-icon">🔤</span>
          <span>English</span>
          <span className="learn-tab-count">({english.length})</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="learn-empty">
          <p>No rhymes available for this language.</p>
          <p className="learn-empty-hint">Add some from the admin panel.</p>
        </div>
      ) : (
        <>
          <div className="learn-progress">
            <div className="learn-progress-bar">
              <div className="learn-progress-fill" style={{ width: `${progress}%`, background: colors.primary }} />
            </div>
            <span className="learn-progress-text">{currentIndex + 1}/{data.length}</span>
          </div>

          <div
            className="learn-rhyme-card"
            key={`${activeTab}-${currentIndex}`}
            style={{
              background: current.image
                ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${current.image}) center/cover no-repeat`
                : bgGradient,
            }}
          >
            <span className="learn-rhyme-icon">📖</span>
            <h3 className="learn-rhyme-title">{current.title}</h3>
            {current.text && (
              <p className="learn-rhyme-text">{current.text}</p>
            )}
            <span className="learn-rhyme-number">Rhyme {currentIndex + 1} of {data.length}</span>
          </div>

          <div className="learn-controls">
            <button className="learn-btn learn-btn-prev" onClick={handlePrev}>
              ← Previous
            </button>
            <button className={`learn-btn learn-btn-auto ${autoPlay ? 'playing' : ''}`} onClick={toggleAuto}>
              {autoPlay ? '⏹ Stop' : '▶ Auto'}
            </button>
            <button className="learn-btn learn-btn-next" onClick={handleNext}>
              Next →
            </button>
          </div>

          <div className="learn-dots">
            {data.map((_, idx) => (
              <button
                key={idx}
                className={`learn-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                style={idx === currentIndex ? { background: colors.primary } : {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
