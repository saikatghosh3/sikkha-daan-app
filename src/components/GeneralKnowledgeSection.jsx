import { useState, useEffect, useCallback, useRef } from 'react'
import { api, imgUrl } from '../api/client'
import './LearningSection.css'

const CATEGORY_CONFIG = [
  { value: 'national', label: '🇧🇩 National', icon: '🏛️' },
  { value: 'geography', label: '🗺️ Geography', icon: '🌍' },
  { value: 'history', label: '📜 History', icon: '📜' },
  { value: 'culture', label: '🎭 Culture', icon: '🎭' },
  { value: 'general', label: '📚 General', icon: '📚' },
]

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

const STATIC_GK_ITEMS = [
  { id: 1, category: 'national', title: 'National Bird', name: 'Oriental Magpie Robin', name_bn: 'দোয়েল', description: 'The national bird of Bangladesh, known for its melodious song.', image: '/img/gk/fdaa813b-0be9-44ac-a41c-66e07832bb12.png' },
  { id: 2, category: 'national', title: 'National Flower', name: 'Water Lily', name_bn: 'শাপলা', description: 'The national flower of Bangladesh, found in water bodies across the country.', image: '/img/gk/d4321be4-1474-4ba4-a1c9-381517d45c8b.png' },
  { id: 3, category: 'national', title: 'National Animal', name: 'Royal Bengal Tiger', name_bn: 'রয়েল বেঙ্গল টাইগার', description: 'The national animal of Bangladesh, found in the Sundarbans mangrove forest.', image: '/img/gk/47efded5-45c9-4358-8773-63975cb08b72.png' },
  { id: 4, category: 'national', title: 'National Fruit', name: 'Jackfruit', name_bn: 'কাঁঠাল', description: 'The national fruit of Bangladesh, known as the largest fruit in the world.', image: '/img/gk/1f03aaff-680d-41bf-a780-284c1221e5e0.png' },
  { id: 5, category: 'national', title: 'National Fish', name: 'Hilsha', name_bn: 'ইলিশ', description: 'The national fish of Bangladesh, a popular and delicious fish.', image: '/img/gk/f0f92186-03e4-4cc4-b42a-45f0c8b58548.png' },
  { id: 6, category: 'national', title: 'National Sport', name: 'Kabaddi', name_bn: 'কাবাডি', description: 'The national sport of Bangladesh, also known as Ha-du-du.', image: '/img/gk/5b43b11f-1b12-4f80-aae7-a0d2a007b3fc.png' },
  { id: 7, category: 'geography', title: 'Capital City', name: 'Dhaka', name_bn: 'ঢাকা', description: 'The capital and largest city of Bangladesh, home to over 10 million people.', image: '' },
  { id: 8, category: 'geography', title: 'Total Area', name: '147,570 km²', name_bn: '১,৪৭,৫৭০ বর্গ কিমি', description: 'Bangladesh has a total area of 147,570 square kilometers.', image: '' },
  { id: 9, category: 'geography', title: 'Number of Divisions', name: '8 Divisions', name_bn: '৮টি বিভাগ', description: 'Bangladesh is divided into 8 administrative divisions.', image: '' },
  { id: 10, category: 'geography', title: 'Number of Districts', name: '64 Districts', name_bn: '৬৪টি জেলা', description: 'Bangladesh has 64 districts (zila).', image: '' },
  { id: 11, category: 'geography', title: 'Largest Division', name: 'Chittagong Division', name_bn: 'চট্টগ্রাম বিভাগ', description: 'The largest division by area in Bangladesh.', image: '' },
  { id: 12, category: 'geography', title: 'Major Rivers', name: 'Padma, Meghna, Jamuna', name_bn: 'পদ্মা, মেঘনা, যমুনা', description: 'The three major rivers of Bangladesh.', image: '' },
  { id: 13, category: 'history', title: 'Independence Day', name: 'March 26', name_bn: '২৬ মার্চ', description: 'Bangladesh gained independence on March 26, 1971.', image: '' },
  { id: 14, category: 'history', title: 'Victory Day', name: 'December 16', name_bn: '১৬ ডিসেম্বর', description: 'Victory Day commemorates the surrender of Pakistani forces in 1971.', image: '' },
  { id: 15, category: 'history', title: 'Language Movement Day', name: 'February 21', name_bn: '২১ ফেব্রুয়ারি', description: 'International Mother Language Day, commemorating the 1952 language movement.', image: '' },
  { id: 16, category: 'history', title: 'Founding Father', name: 'Bangabandhu Sheikh Mujibur Rahman', name_bn: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান', description: 'The founding father and first President of Bangladesh.', image: '' },
  { id: 17, category: 'culture', title: 'New Year', name: 'Pohela Boishakh', name_bn: 'পহেলা বৈশাখ', description: 'The Bengali New Year, celebrated on April 14 with festivals and parades.', image: '/img/gk/c33776f5-e180-49c6-83e7-28bf0508f201.png' },
  { id: 18, category: 'culture', title: 'National Dress', name: 'Sharee & Panjabi', name_bn: 'শাড়ি ও পাঞ্জাবি', description: 'Traditional dresses of Bangladesh: sharee for women, panjabi for men.', image: '/img/gk/1f17d8ce-9cf7-4efe-9a81-dbef0b19ada4.png' },
  { id: 19, category: 'culture', title: 'National Language', name: 'Bangla (Bengali)', name_bn: 'বাংলা', description: 'The official language of Bangladesh, spoken by 98% of the population.', image: '' },
  { id: 20, category: 'general', title: 'Currency', name: 'Bangladeshi Taka', name_bn: 'বাংলাদেশী টাকা', description: 'The official currency of Bangladesh, symbolized as ৳ and ISO code BDT.', image: '' },
  { id: 21, category: 'general', title: 'Time Zone', name: 'BST (UTC+6)', name_bn: 'বাংলাদেশ মান সময়', description: 'Bangladesh Standard Time is 6 hours ahead of Coordinated Universal Time.', image: '' },
  { id: 22, category: 'general', title: 'Calling Code', name: '+880', name_bn: '+৮৮০', description: 'The international dialing code for Bangladesh.', image: '' },
  { id: 23, category: 'general', title: 'National Anthem', name: 'Amar Shonar Bangla', name_bn: 'আমার সোনার বাংলা', description: 'Written by Rabindranath Tagore, adopted in 1972.', image: '' },
  { id: 24, category: 'general', title: 'Government Type', name: 'Unitary Parliamentary Republic', name_bn: 'একক সংসদীয় প্রজাতন্ত্র', description: 'Bangladesh is a parliamentary republic with a Prime Minister as head of government.', image: '' },
]

export default function GeneralKnowledgeSection() {
  const [items, setItems] = useState(STATIC_GK_ITEMS)
  const [activeCat, setActiveCat] = useState('national')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    api.generalKnowledge.getAll()
      .then(data => {
        if (data.length) {
          const existingIds = new Set(STATIC_GK_ITEMS.map(i => i.id))
          const merged = [...STATIC_GK_ITEMS, ...data.filter(i => !existingIds.has(i.id))]
          setItems(merged)
        }
      })
      .catch(() => {})
  }, [])

  const data = items.filter(i => i.category === activeCat)
  const catConfig = CATEGORY_CONFIG.find(c => c.value === activeCat) || CATEGORY_CONFIG[0]
  const current = data[currentIndex] || {}

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeCat])

  useEffect(() => {
    if (autoPlay && data.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % data.length)
      }, 3500)
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
    <div className="learn-section">
      <div className="learn-section-header">
        <h2 className="learn-section-title">General Knowledge</h2>
        <p className="learn-section-subtitle">Learn about Bangladesh</p>
      </div>

      <div className="learn-tabs">
        {CATEGORY_CONFIG.map(cat => (
          <button
            key={cat.value}
            className={`learn-tab ${activeCat === cat.value ? 'active' : ''}`}
            onClick={() => setActiveCat(cat.value)}
          >
            <span className="learn-tab-icon">{cat.icon}</span>
            <span>{cat.label}</span>
            <span className="learn-tab-count">({items.filter(i => i.category === cat.value).length})</span>
          </button>
        ))}
      </div>

      {data.length === 0 ? (
        <div className="learn-empty">
          <p>No items in this category yet.</p>
          <p className="learn-empty-hint">Add some from the admin panel.</p>
        </div>
      ) : (
        <>
          <div className="learn-progress">
            <div className="learn-progress-bar">
              <div className="learn-progress-fill" style={{ width: `${progress}%`, background: '#6366f1' }} />
            </div>
            <span className="learn-progress-text">{currentIndex + 1}/{data.length}</span>
          </div>

          <div
            className="learn-card gk-card"
            key={`${activeCat}-${currentIndex}`}
            style={{
              background: current.image
                ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${current.image}) center/cover no-repeat`
                : bgGradient,
            }}
          >
            {current.image && (
              <div className="learn-image-wrap">
                <span className="gk-emoji">{catConfig.icon}</span>
              </div>
            )}
            {!current.image && (
              <div className="gk-emoji-large">{catConfig.icon}</div>
            )}
            {current.title && (
              <h3 className="gk-title">{current.title}</h3>
            )}
            {current.name && (
              <div className="gk-name-row">
                <span className="gk-name">{current.name}</span>
                {current.name_bn && <span className="gk-name-bn">{current.name_bn}</span>}
              </div>
            )}
            {current.description && (
              <p className="gk-desc">{current.description}</p>
            )}
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
                style={idx === currentIndex ? { background: '#6366f1' } : {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
