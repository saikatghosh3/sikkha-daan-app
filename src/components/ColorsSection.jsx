import { useState, useEffect } from 'react'
import { api } from '../api/client'
import ColorFlashCard from './ColorFlashCard'

export default function ColorsSection() {
  const [colors, setColors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.colors.getAll()
      .then(setColors)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <ColorFlashCard items={colors} title="Colors (রং)" />
  )
}
