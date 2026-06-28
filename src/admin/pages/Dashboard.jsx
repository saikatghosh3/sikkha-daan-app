import { useState, useEffect } from 'react'
import { api } from '../../api/client'

const statConfig = [
  { key: 'banglaVowels', label: 'Bangla Vowels', color: '#6366f1' },
  { key: 'banglaConsonants', label: 'Bangla Consonants', color: '#8b5cf6' },
  { key: 'englishAlphabet', label: 'English Alphabet', color: '#3b82f6' },
  { key: 'banglaNumbers', label: 'Bangla Numbers', color: '#06b6d4' },
  { key: 'englishNumbers', label: 'English Numbers', color: '#10b981' },
  { key: 'banglaRhymes', label: 'Bangla Rhymes', color: '#f59e0b' },
  { key: 'englishRhymes', label: 'English Rhymes', color: '#f97316' },
  { key: 'matchGamePairs', label: 'Match Game Pairs', color: '#ef4444' },
  { key: 'shapes', label: 'Shapes', color: '#ec4899' },
  { key: 'colors', label: 'Colors', color: '#14b8a6' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.bangla.getVowels(),
      api.bangla.getConsonants(),
      api.english.getAll(),
      api.numbers.getBangla(),
      api.numbers.getEnglish(),
      api.rhymes.getBangla(),
      api.rhymes.getEnglish(),
      api.matchGame.getAll(),
      api.shapes.getAll(),
      api.colors.getAll(),
    ]).then(([bv, bc, en, bn, enn, br, er, mg, sh, co]) => {
      setStats({
        banglaVowels: bv.length,
        banglaConsonants: bc.length,
        englishAlphabet: en.length,
        banglaNumbers: bn.length,
        englishNumbers: enn.length,
        banglaRhymes: br.length,
        englishRhymes: er.length,
        matchGamePairs: mg.length,
        shapes: sh.length,
        colors: co.length,
      })
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalItems = stats ? Object.values(stats).reduce((a, b) => a + b, 0) : 0

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h2>Dashboard</h2>
        <p className="admin-dashboard-sub">
          {loading
            ? 'Loading statistics...'
            : `Managing ${totalItems} total items across ${statConfig.length} sections`
          }
        </p>
      </div>

      {loading ? (
        <div className="admin-loading">Loading statistics...</div>
      ) : (
        <div className="admin-stats-grid">
          {statConfig.map(({ key, label, color }) => (
            <div key={key} className="admin-stat-card">
              <span className="admin-stat-count" style={{ color }}>
                {stats?.[key] ?? 0}
              </span>
              <span className="admin-stat-label">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
