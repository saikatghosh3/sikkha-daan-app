import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

export default function EnglishSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.english.getAll()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <FlashCard
      items={items}
      title="English Alphabet"
      categoryColor="#FFB347"
    />
  )
}
