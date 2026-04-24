import confetti from 'canvas-confetti';
import { useRef } from 'react';

export default function Navigation({ activeSection, setActiveSection }) {

  const toggleRef = useRef(false);

  const fireConfetti = () => {
    toggleRef.current = !toggleRef.current;

    confetti({
      particleCount: 100,
      spread: 80,
      startVelocity: 30,
      origin: {
        x: toggleRef.current ? 0.1 : 0.9, 
        y: 0.6
      }
    });
  };

  // 👇 common handler
  const handleClick = (section) => {
    setActiveSection(section);
    fireConfetti();
  };

  return (
    <nav className="navigation">
      <button
        className={`nav-button ${activeSection === 'bangla' ? 'active' : ''}`}
        onClick={() => handleClick('bangla')}
      >
        Bangla বাংলা
      </button>

      <button
        className={`nav-button ${activeSection === 'numbers' ? 'active' : ''}`}
        onClick={() => handleClick('numbers')}
      >
        Numbers ১২৩
      </button>

      <button
        className={`nav-button ${activeSection === 'english' ? 'active' : ''}`}
        onClick={() => handleClick('english')}
      >
        English ABC
      </button>

      <button
        className={`nav-button ${activeSection === 'rhymes' ? 'active' : ''}`}
        onClick={() => handleClick('rhymes')}
      >
        Rhymes
      </button>

      <button
        className={`nav-button ${activeSection === 'multiplication' ? 'active' : ''}`}
        onClick={() => handleClick('multiplication')}
      >
        নামতা
      </button>

      <button
        className={`nav-button ${activeSection === 'match' ? 'active' : ''}`}
        onClick={() => handleClick('match')}
      >
        Match Game
      </button>
      <button
  className={`nav-button ${activeSection === 'shapes' ? 'active' : ''}`}
  onClick={(e) => handleClick('shapes', 'confetti', e.currentTarget)}
   >
     Shapes 
   </button>
   <button
  className={`nav-button ${activeSection === 'colors' ? 'active' : ''}`}
  onClick={() => handleClick('colors')}
>
  Colors 
</button>
    </nav>
  );
}


// another effect 
// import confetti from 'canvas-confetti';

// export default function Navigation({ activeSection, setActiveSection }) {

//   const createBalloon = (originEl) => {
//     const rect = originEl.getBoundingClientRect();
//     const centerX = rect.left + rect.width / 2;
//     const count = Math.random() < 0.5 ? 5 : 7;
//     const colors = ['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#FF9FF3','#54A0FF','#5F27CD','#1DD1A1'];

//     for (let i = 0; i < count; i++) {
//       const wrap = document.createElement('div');
//       wrap.className = 'balloon-wrap';
//       const offsetX = (Math.random() - 0.5) * 160;
//       wrap.style.left = (centerX + offsetX) + 'px';
//       wrap.style.animationDuration = (3.2 + Math.random() * 0.8) + 's';
//       wrap.style.animationDelay = (i * 0.12) + 's';
//       const color = colors[Math.floor(Math.random() * colors.length)];
//       wrap.innerHTML = `
//         <div class="balloon-body" style="background:${color};">
//           <div class="balloon-shine"></div>
//         </div>
//         <div class="balloon-knot" style="background:${color};"></div>
//         <div class="balloon-string"></div>
//       `;
//       document.body.appendChild(wrap);
//       setTimeout(() => wrap.remove(), 4500);
//     }
//   };

//   const createBaji = (originEl) => {
//     const rect = originEl.getBoundingClientRect();
//     const cx = rect.left + rect.width / 2;
//     const allColors = ['#FF6B6B','#FF9F43','#FECA57','#48DBFB','#FF9FF3','#54A0FF','#1DD1A1'];

//     for (let b = 0; b < 3; b++) {
//       const bx = cx + (b - 1) * 55 + (Math.random() - 0.5) * 20;
//       setTimeout(() => {
//         const stick = document.createElement('div');
//         stick.className = 'baji-wrap';
//         stick.style.left = bx + 'px';
//         stick.innerHTML = `<div class="baji-stick"></div>`;
//         document.body.appendChild(stick);

//         setTimeout(() => {
//           stick.remove();
//           const burstY = window.innerHeight - 240 - Math.random() * 60;
//           const burst = document.createElement('div');
//           burst.className = 'baji-burst';
//           burst.style.left = bx + 'px';
//           burst.style.top = burstY + 'px';
//           const burstColor = allColors[Math.floor(Math.random() * allColors.length)];

//           for (let s = 0; s < 14; s++) {
//             const angle = (s / 14) * 2 * Math.PI;
//             const dist = 45 + Math.random() * 35;
//             const sp = document.createElement('div');
//             sp.className = 'baji-spark';
//             sp.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
//             sp.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
//             sp.style.setProperty('--delay', (Math.random() * 0.05) + 's');
//             sp.style.background = Math.random() > 0.4 ? burstColor : allColors[Math.floor(Math.random() * allColors.length)];
//             sp.style.width = sp.style.height = (5 + Math.random() * 5) + 'px';
//             burst.appendChild(sp);
//           }
//           document.body.appendChild(burst);
//           setTimeout(() => burst.remove(), 900);
//         }, 520);
//       }, b * 180);
//     }
//   };

//   const fireConfetti = () => {
//     confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
//   };

//   const handleClick = (section, effect, el) => {
//     setActiveSection(section);
//     if (effect === 'balloon') createBalloon(el);
//     else if (effect === 'baji') createBaji(el);
//     else if (effect === 'confetti') fireConfetti();
//   };

//   return (
//     <nav className="navigation">
//       <button className={`nav-button ${activeSection === 'bangla' ? 'active' : ''}`}
//         onClick={e => handleClick('bangla', 'balloon', e.currentTarget)}>
//         Bangla বাংলা
//       </button>
//       <button className={`nav-button ${activeSection === 'numbers' ? 'active' : ''}`}
//         onClick={e => handleClick('numbers', 'baji', e.currentTarget)}>
//         Numbers ১২৩
//       </button>
//       <button className={`nav-button ${activeSection === 'english' ? 'active' : ''}`}
//         onClick={e => handleClick('english', 'baji', e.currentTarget)}>
//         English ABC
//       </button>
//       <button className={`nav-button ${activeSection === 'rhymes' ? 'active' : ''}`}
//         onClick={e => handleClick('rhymes', 'baji', e.currentTarget)}>
//         Rhymes
//       </button>
//       <button className={`nav-button ${activeSection === 'multiplication' ? 'active' : ''}`}
//         onClick={e => handleClick('multiplication', 'baji', e.currentTarget)}>
//         নামতা
//       </button>
//       <button className={`nav-button ${activeSection === 'match' ? 'active' : ''}`}
//         onClick={e => handleClick('match', 'baji', e.currentTarget)}>
//         Match Game
//       </button>
//     </nav>
//   );
// }