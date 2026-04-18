import FlashCard from './FlashCard'

export default function NumbersSection() {

  const banglaNumbers = [
    { character: '०', name: 'শূন্য', image: '/img/numbers/khalijhuri.png', description: 'খালি ঝুড়ি' },
    { character: '१', name: 'এক', image: '/img/numbers/ekkolom.png', description: 'একটি কলম' },
    { character: '२', name: 'দুই', image: '/img/numbers/duibol.png', description: 'দুটি বল' },
    { character: '३', name: 'তিন', image: '/img/numbers/tinapple.png', description: 'তিনটি আপেল' },
    { character: '४', name: 'চার', image: '/img/numbers/charaam.png', description: 'চারটি আম' },
    { character: '५', name: 'পাঁচ', image: '/img/numbers/pachtara.png', description: 'পাচটি তারা' },
    { character: '६', name: 'ছয়', image: '/img/numbers/choiful.png', description: 'ছয়টি ফুল' },
    { character: '७', name: 'সাত', image: '/img/numbers/sathprojapoti.png', description: 'সাতটি প্রজাপতি' },
    { character: '८', name: 'আট', image: '/img/numbers/atpencil.png', description: 'আটটি পেন্সিল' },
    { character: '९', name: 'নয়', image: '/img/numbers/noikola.png', description: 'নয়টি কলা' },
    { character: '१०', name: 'দশ', image: '/img/numbers/doshchocolate.png', description: 'দশটি চকলেট' },
  ]

  const englishNumbers = [
    { character: '0', name: 'Zero', image: '/img/numbers/zero.png', description: 'Zero Baskets' },
    { character: '1', name: 'One', image: '/img/numbers/one.png', description: 'One Pen' },
    { character: '2', name: 'Two', image: '/img/numbers/two.png', description: 'Two Balls' },
    { character: '3', name: 'Three', image: '/img/numbers/three.png', description: 'Three Apples' },
    { character: '4', name: 'Four', image: '/img/numbers/four.png', description: 'Four Mangoes' },
    { character: '5', name: 'Five', image: '/img/numbers/five.png', description: 'Five Stars' },
    { character: '6', name: 'Six', image: '/img/numbers/six.png', description: 'Six Flowers' },
    { character: '7', name: 'Seven', image: '/img/numbers/seven.png', description: 'Seven Butterflies' },
    { character: '8', name: 'Eight', image: '/img/numbers/eight.png', description: 'Eight Pencils' },
    { character: '9', name: 'Nine', image: '/img/numbers/nine.png', description: 'Nine Bananas' },
    { character: '10', name: 'Ten', image: '/img/numbers/ten.png', description: 'Ten Candies' },
  ]

  return (
    <>
      <FlashCard
        items={banglaNumbers}
        title="বাংলা সংখ্যা"
        categoryColor="#FF6B6B"
      />

      <FlashCard
        items={englishNumbers}
        title="English Numbers"
        categoryColor="#4ECDC4"
      />
    </>
  )
}