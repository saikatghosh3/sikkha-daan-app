export function renderShapeSvg(svgType, color) {
  const props = { viewBox: '0 0 120 120', width: '100%', height: '100%' }

  switch (svgType) {
    case 'circle':
      return <svg {...props}><circle cx="60" cy="60" r="50" fill={color} /></svg>
    case 'square':
      return <svg {...props}><rect x="10" y="10" width="100" height="100" fill={color} /></svg>
    case 'triangle':
      return <svg {...props}><polygon points="60,15 110,110 10,110" fill={color} /></svg>
    case 'rectangle':
      return <svg viewBox="0 0 140 100" width="100%" height="100%"><rect x="10" y="15" width="120" height="70" fill={color} /></svg>
    case 'oval':
      return <svg {...props}><ellipse cx="60" cy="60" rx="55" ry="35" fill={color} /></svg>
    case 'rhombus':
      return <svg {...props}><polygon points="60,10 110,60 60,110 10,60" fill={color} /></svg>
    case 'pentagon':
      return <svg {...props}><polygon points="60,10 110,45 90,105 30,105 10,45" fill={color} /></svg>
    case 'hexagon':
      return <svg {...props}><polygon points="60,10 105,35 105,85 60,110 15,85 15,35" fill={color} /></svg>
    case 'star':
      return <svg {...props}><polygon points="60,10 75,45 110,45 85,70 95,105 60,85 25,105 35,70 10,45 45,45" fill={color} /></svg>
    case 'heart':
      return <svg viewBox="0 0 24 24" width="100%" height="100%"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={color} /></svg>
    case 'parallelogram':
      return <svg {...props}><polygon points="35,35 115,35 85,85 5,85" fill={color} /></svg>
    case 'trapezium':
      return <svg viewBox="0 0 140 100" width="100%" height="100%"><polygon points="40,20 100,20 130,80 10,80" fill={color} /></svg>
    default:
      return <svg {...props}><circle cx="60" cy="60" r="50" fill={color} /></svg>
  }
}
