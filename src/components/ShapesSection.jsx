import { useState, useEffect } from 'react'
import { api } from '../api/client'
import ShapeFlashCard from './ShapeFlashCard'
import { renderShapeSvg } from '../utils/shapeSvg'

const STATIC_SHAPES = [
  { name_en: 'Circle', name_bn: 'বৃত্ত', svg_type: 'circle', color: '#FF6B6B', svg: null },
  { name_en: 'Square', name_bn: 'বর্গ', svg_type: 'square', color: '#4ECDC4', svg: null },
  { name_en: 'Triangle', name_bn: 'ত্রিভুজ', svg_type: 'triangle', color: '#FFD93D', svg: null },
  { name_en: 'Rectangle', name_bn: 'আয়তক্ষেত্র', svg_type: 'rectangle', color: '#6C5CE7', svg: null },
  { name_en: 'Oval', name_bn: 'ডিম্বাকৃতি', svg_type: 'oval', color: '#A8E6CF', svg: null },
  { name_en: 'Rhombus', name_bn: 'রম্বস', svg_type: 'rhombus', color: '#FDCB6E', svg: null },
  { name_en: 'Pentagon', name_bn: 'পঞ্চভুজ', svg_type: 'pentagon', color: '#FAB1A0', svg: null },
  { name_en: 'Hexagon', name_bn: 'ষষ্ঠভুজ', svg_type: 'hexagon', color: '#74B9FF', svg: null },
  { name_en: 'Star', name_bn: 'তারা', svg_type: 'star', color: '#F1C40F', svg: null },
  { name_en: 'Heart', name_bn: 'হৃদয়', svg_type: 'heart', color: '#FF7675', svg: null },
  { name_en: 'Parallelogram', name_bn: 'সামান্তরিক', svg_type: 'parallelogram', color: '#55E6C1', svg: null },
  { name_en: 'Trapezium', name_bn: 'ট্রাপিজিয়াম', svg_type: 'trapezium', color: '#D6A2E8', svg: null },
]

export default function ShapesSection() {
  const [shapes, setShapes] = useState(() =>
    STATIC_SHAPES.map(s => ({ ...s, svg: renderShapeSvg(s.svg_type, s.color) }))
  )

  useEffect(() => {
    api.shapes.getAll()
      .then((data) => {
        if (data.length) {
          const enhanced = data.map(s => ({
            ...s,
            svg: renderShapeSvg(s.svg_type, s.color),
          }))
          setShapes(enhanced)
        }
      })
      .catch(() => {})
  }, [])

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
