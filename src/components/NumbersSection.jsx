import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

export default function NumbersSection() {
  const [bangla, setBangla] = useState([])
  const [english, setEnglish] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.numbers.getBangla(), api.numbers.getEnglish()])
      .then(([b, e]) => { setBangla(b); setEnglish(e) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <>
      {bangla.length > 0 && (
        <FlashCard
          items={bangla}
          title="বাংলা সংখ্যা"
          categoryColor="#FF6B6B"
        />
      )}
      {english.length > 0 && (
        <FlashCard
          items={english}
          title="English Numbers"
          categoryColor="#4ECDC4"
        />
      )}
    </>
  )
}
