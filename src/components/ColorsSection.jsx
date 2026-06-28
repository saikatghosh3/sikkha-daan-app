import { useState, useEffect } from 'react'
import { api } from '../api/client'
import ColorFlashCard from './ColorFlashCard'

const STATIC_COLORS = [
  { name_en: 'Red', name_bn: 'লাল', color: '#FF4D4D', example: '🍎 Apple' },
  { name_en: 'Blue', name_bn: 'নীল', color: '#4D9DFF', example: '🌊 Sky' },
  { name_en: 'Green', name_bn: 'সবুজ', color: '#4CAF50', example: '🌿 Grass' },
  { name_en: 'Yellow', name_bn: 'হলুদ', color: '#FFD93D', example: '🌼 Flower' },
  { name_en: 'Orange', name_bn: 'কমলা', color: '#FF8C42', example: '🍊 Orange' },
  { name_en: 'Purple', name_bn: 'বেগুনি', color: '#9B59B6', example: '🍇 Grapes' },
  { name_en: 'Pink', name_bn: 'গোলাপি', color: '#FF69B4', example: '🌸 Flower' },
]

export default function ColorsSection() {
  const [colors, setColors] = useState(STATIC_COLORS)

  useEffect(() => {
    api.colors.getAll()
      .then(data => { if (data.length) setColors(data) })
      .catch(() => {})
  }, [])

  return (
    <ColorFlashCard items={colors} title="Colors (রং)" />
  )
}
