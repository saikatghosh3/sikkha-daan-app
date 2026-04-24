import ShapeFlashCard from './ShapeFlashCard'

export default function ShapesSection() {
  const shapes = [
    {
      nameEn: 'Circle',
      nameBn: 'বৃত্ত',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <circle cx="60" cy="60" r="50" fill="#FF6B6B" />
        </svg>
      )
    },
    {
      nameEn: 'Square',
      nameBn: 'বর্গ',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <rect x="10" y="10" width="100" height="100" fill="#4ECDC4" />
        </svg>
      )
    },
    {
      nameEn: 'Triangle',
      nameBn: 'ত্রিভুজ',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="60,15 110,110 10,110" fill="#FFD93D" />
        </svg>
      )
    },
    {
      nameEn: 'Rectangle',
      nameBn: 'আয়তক্ষেত্র',
      svg: (
        <svg viewBox="0 0 140 100" width="100%" height="100%">
          <rect x="10" y="15" width="120" height="70" fill="#6C5CE7" />
        </svg>
      )
    },
    {
      nameEn: 'Oval',
      nameBn: 'ডিম্বাকৃতি',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <ellipse cx="60" cy="60" rx="55" ry="35" fill="#A8E6CF" />
        </svg>
      )
    },
    {
      nameEn: 'Rhombus',
      nameBn: 'রম্বস',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="60,10 110,60 60,110 10,60" fill="#FDCB6E" />
        </svg>
      )
    },
    {
      nameEn: 'Pentagon',
      nameBn: 'পঞ্চভুজ',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="60,10 110,45 90,105 30,105 10,45" fill="#FAB1A0" />
        </svg>
      )
    },
    {
      nameEn: 'Hexagon',
      nameBn: 'ষষ্ঠভুজ',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="60,10 105,35 105,85 60,110 15,85 15,35" fill="#74B9FF" />
        </svg>
      )
    },
    {
      nameEn: 'Star',
      nameBn: 'তারা',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="60,10 75,45 110,45 85,70 95,105 60,85 25,105 35,70 10,45 45,45" fill="#F1C40F" />
        </svg>
      )
    },
    {
      nameEn: 'Heart',
      nameBn: 'হৃদয়',
      svg: (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF7675" />
        </svg>
      )
    },
    {
      nameEn: 'Parallelogram',
      nameBn: 'সামান্তরিক',
      svg: (
        <svg viewBox="0 0 120 120" width="100%" height="100%">
          <polygon points="35,35 115,35 85,85 5,85" fill="#55E6C1" />
        </svg>
      )
    },
    {
      nameEn: 'Trapezium',
      nameBn: 'ট্রাপিজিয়াম',
      svg: (
        <svg viewBox="0 0 140 100" width="100%" height="100%">
          <polygon points="40,20 100,20 130,80 10,80" fill="#D6A2E8" />
        </svg>
      )
    }
  ];

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