import { useState } from "react"

export default function RhymesStorySection() {

 const banglaRhymes = [
  {
    title: "আয় আয় চাঁদ মামা",
    text: "আয় আয় চাঁদ মামা টিপ দিয়ে যা,\nচাঁদের কপালে চাঁদ টিপ দিয়ে যা।\nমাছ কাটলে মুড়ো দেব,\nধান ভাঙলে কুঁড়ো দেব,\nকালোর হাতে কালো মানিক,\nটিপ দিয়ে যা।",
    image: "/img/rhymes/chand.jpg"
  },
  {
    title: "আয় বৃষ্টি ঝেঁপে",
    text: "আয় বৃষ্টি ঝেঁপে,\nধান দেব মেপে।\nলেবুর পাতায় করমচা,\nঐ বৃষ্টি ধরে যা।\nধানের মধ্যে পোকা,\nজামাই বলে খোকা।",
    image: "/img/rhymes/rain.jpg"
  },
  {
    title: "আতা গাছে তোতা পাখি",
    text: "আতা গাছে তোতা পাখি,\nডালিম গাছে মৌ।\nএত ডাকি তবু কথা,\nকও না কেন বউ?",
    image: "/img/rhymes/tota.jpg"
  },
  {
    title: "হাট্টিমা টিম টিম",
    text: "হাট্টিমা টিম টিম,\nতারা মাঠে পাড়ে ডিম।\nতাদের খাড়া দুটো শিং,\nতারা হাট্টিমা টিম টিম।",
    image: "/img/rhymes/hattima.jpg"
  },
  {
    title: "খোকন খোকন ডাক পাড়ি",
    text: "খোকন খোকন ডাক পাড়ি,\nখোকন মণির বাড়ি।\nআয়রে খোকন ঘরে আয়,\nদুধ মাখা ভাত কাকে খায়।",
    image: "/img/rhymes/khokon.jpg"
  },
  {
    title: "ভোর হলো দোর খোলো",
    text: "ভোর হলো দোর খোলো,\nখুকুমণি ওঠো রে।\nঐ ডাকে জুঁই শাখে,\nফুলখুকি ছোট রে।",
    image: "/img/rhymes/bhor.jpg"
  },
  {
    title: "তাই তাই তাই",
    text: "তাই তাই তাই,\nমামার বাড়ি যাই।\nমামার বাড়ি ভারি মজা,\nকিল চড় নাই।",
    image: "/img/rhymes/tai.jpg"
  }
]

const englishRhymes = [
  {
    title: "Twinkle Twinkle Little Star",
    text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.\nWhen the blazing sun is gone,\nWhen he nothing shines upon,\nThen you show your little light,\nTwinkle, twinkle, all the night.",
    image: "/img/rhymes/star.jpg"
  },
  {
    title: "Baa Baa Black Sheep",
    text: "Baa, baa, black sheep,\nHave you any wool?\nYes sir, yes sir,\nThree bags full.\nOne for the master,\nAnd one for the dame,\nAnd one for the little boy,\nWho lives down the lane.",
    image: "/img/rhymes/sheep.jpg"
  },
  {
    title: "Johny Johny Yes Papa",
    text: "Johny, Johny, Yes Papa?\nEating sugar, No Papa!\nTelling lies, No Papa!\nOpen your mouth, Ha! Ha! Ha!",
    image: "/img/rhymes/johny.jpg"
  },
  {
    title: "Humpty Dumpty",
    text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall.\nAll the king's horses and all the king's men,\nCouldn't put Humpty together again.",
    image: "/img/rhymes/humpty.jpg"
  },
  {
    title: "Incy Wincy Spider",
    text: "The incy wincy spider climbed up the waterspout.\nDown came the rain and washed the spider out.\nOut came the sun and dried up all the rain,\nAnd the incy wincy spider climbed up the spout again.",
    image: "/img/rhymes/spider.jpg"
  },
  {
    title: "Rain, Rain, Go Away",
    text: "Rain, rain, go away,\nCome again another day.\nLittle Johnny wants to play,\nRain, rain, go away.",
    image: "/img/rhymes/rain_go.jpg"
  },
  {
    title: "Jack and Jill",
    text: "Jack and Jill went up the hill,\nTo fetch a pail of water.\nJack fell down and broke his crown,\nAnd Jill came tumbling after.",
    image: "/img/rhymes/jack_jill.jpg"
  }
]

  return (
    <div>

      {/* 🇧🇩 BANGLA SECTION */}
      <RhymeStoryBlock
        title="বাংলা ছড়া 🎵"
        data={banglaRhymes}
        bgColor="rgba(0,0,0,0.55)"
      />

      {/* 🔥 GAP BETWEEN SECTIONS */}
      <div className="section-gap"></div>

      {/* 🇬🇧 ENGLISH SECTION */}
      <RhymeStoryBlock
        title="English Rhymes 🎶"
        data={englishRhymes}
        bgColor="rgba(0,0,0,0.65)"
      />

    </div>
  )
}

function RhymeStoryBlock({ title, data }) {

  const [index, setIndex] = useState(0)

  const current = data[index]

  const next = () => {
    setIndex((prev) => (prev + 1) % data.length)
  }

  const prev = () => {
    setIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  return (
    <div
      className="story-container"
      style={{
        backgroundImage: `url(${current.image})`
      }}
    >

      <div className="overlay"></div>

      <div className="story-content">

        <h2 className="section-title">{title}</h2>

        <h3 className="story-title">{current.title}</h3>

        <p className="story-text">{current.text}</p>

        <div className="story-controls">
          <button onClick={prev}>⬅ previous</button>
          <button onClick={next}>next ➡</button>
        </div>

      </div>

    </div>
  )
}