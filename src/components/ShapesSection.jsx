import { useState, useEffect } from 'react'
import { api } from '../api/client'
import ShapeFlashCard from './ShapeFlashCard'
import { renderShapeSvg } from '../utils/shapeSvg'

export default function ShapesSection() {
  const [shapes, setShapes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.shapes.getAll()
      .then((data) => {
        const enhanced = data.map(s => ({
          ...s,
          svg: renderShapeSvg(s.svg_type, s.color),
        }))
        setShapes(enhanced)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <section>
      <ShapeFlashCard
        items={shapes}
        title="Shapes (আকৃতি)"
        categoryColor="#FF9F1C"
      />
    </section>
  )
}
