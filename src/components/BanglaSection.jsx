import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

export default function BanglaSection() {
  const [vowels, setVowels] = useState([])
  const [consonants, setConsonants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([api.bangla.getVowels(), api.bangla.getConsonants()])
      .then(([v, c]) => { setVowels(v); setConsonants(c) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <>
      {vowels.length > 0 && (
        <FlashCard
          items={vowels}
          title="স্বরবর্ণ (Bangla Vowels)"
          categoryColor="#FF6B6B"
        />
      )}
      {consonants.length > 0 && (
        <FlashCard
          items={consonants}
          title="ব্যঞ্জনবর্ণ (Bangla Consonants)"
          categoryColor="#4ECDC4"
        />
      )}
    </>
  )
}
