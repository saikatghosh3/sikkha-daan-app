import ColorFlashCard from './ColorFlashCard'

export default function ColorsSection() {
  const colors = [
    {
      nameEn: 'Red',
      nameBn: 'লাল',
      color: '#FF4D4D',
      example: '🍎 Apple'
    },
    {
      nameEn: 'Blue',
      nameBn: 'নীল',
      color: '#4D9DFF',
      example: '🌊 Sky'
    },
    {
      nameEn: 'Green',
      nameBn: 'সবুজ',
      color: '#4CAF50',
      example: '🌿 Grass'
    },
    {
      nameEn: 'Yellow',
      nameBn: 'হলুদ',
      color: '#FFD93D',
      example: '🌼 Flower'
    },
    {
      nameEn: 'Orange',
      nameBn: 'কমলা',
      color: '#FF8C42',
      example: '🍊 Orange'
    },
    {
      nameEn: 'Purple',
      nameBn: 'বেগুনি',
      color: '#9B59B6',
      example: '🍇 Grapes'
    },
      {
    nameEn: 'Pink',
    nameBn: 'গোলাপি',
    color: '#FF69B4',
    example: '🌸 Flower'
  }

  ]

  return (
    <ColorFlashCard
      items={colors}
      title="Colors (রং)"
    />
  )
}