export default function Navigation({ activeSection, setActiveSection }) {
  return (
    <nav className="navigation">
      <button
        className={`nav-button ${activeSection === 'bangla' ? 'active' : ''}`}
        onClick={() => setActiveSection('bangla')}
      >
        Bangla বাংলা
      </button>
      <button
        className={`nav-button ${activeSection === 'numbers' ? 'active' : ''}`}
        onClick={() => setActiveSection('numbers')}
      >
        Numbers ১২৩
      </button>
      <button
        className={`nav-button ${activeSection === 'english' ? 'active' : ''}`}
        onClick={() => setActiveSection('english')}
      >
        English ABC
      </button>
      <button
  className={`nav-button ${activeSection === 'rhymes' ? 'active' : ''}`}
  onClick={() => setActiveSection('rhymes')}
>
  Rhymes 🎵
</button>
<button
  className={`nav-button ${activeSection === 'multiplication' ? 'active' : ''}`}
  onClick={() => setActiveSection('multiplication')}
>
  নামতা ✖️
</button>
    </nav>
  )
}
