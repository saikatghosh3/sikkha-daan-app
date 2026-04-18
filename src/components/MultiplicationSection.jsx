export default function MultiplicationSection() {

const toBanglaNumber = (number) => {
  const digits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
  return number
    .toString()
    .split('')
    .map(d => digits[d])
    .join('')
}

const generateTable = (num) => {
  let result = []

  for (let i = 1; i <= 10; i++) {
    result.push(
      `${toBanglaNumber(num)} × ${toBanglaNumber(i)} = ${toBanglaNumber(num * i)}`
    )
  }

  return result
}

const colors = [
  '#6C5CE7', 
  '#00CEC9', 
  '#FF7675', 
  '#FDCB6E', 
  '#55EFC4', 
  '#0984E3', 
  '#E17055', 
  '#00B894', 
  '#A29BFE', 
  '#D63031'  
]


  const tables = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="multiplication-container">
      <h2 className="multiplication-title">বাংলা নামতা (১ - ১০)</h2>

      <div className="multiplication-grid">
       {tables.map((num, index) => (
  <div
    key={num}
    className="table-card"
    style={{
      background: `linear-gradient(135deg, ${colors[index]}, ${colors[index]}cc)`
    }}
  >
    <h3 className="table-title">
      {toBanglaNumber(num)} এর নামতা
    </h3>

    <ul>
      {generateTable(num).map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
))}
      </div>
    </div>
  )
}