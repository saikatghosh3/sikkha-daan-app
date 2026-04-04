import FlashCard from './FlashCard'

// Import Bangla Number Images
import bn0 from '../assets/numbers/khalijhuri.png'
import bn1 from '../assets/numbers/ekkolom.png'
import bn2 from '../assets/numbers/duibol.png'
import bn3 from '../assets/numbers/tinapple.png'
import bn4 from '../assets/numbers/charaam.png'
import bn5 from '../assets/numbers/pachtara.png'
import bn6 from '../assets/numbers/choiful.png'
import bn7 from '../assets/numbers/sathprojapoti.png'
import bn8 from '../assets/numbers/atpencil.png'
import bn9 from '../assets/numbers/noikola.png'
import bn10 from '../assets/numbers/doshchocolate.png'

// Import English Number Images
import en0 from '../assets/numbers/zero.png'
import en1 from '../assets/numbers/one.png'
import en2 from '../assets/numbers/two.png'
import en3 from '../assets/numbers/three.png'
import en4 from '../assets/numbers/four.png'
import en5 from '../assets/numbers/five.png'
import en6 from '../assets/numbers/six.png'
import en7 from '../assets/numbers/seven.png'
import en8 from '../assets/numbers/eight.png'
import en9 from '../assets/numbers/nine.png'
import en10 from '../assets/numbers/ten.png'

export default function NumbersSection() {

  const banglaNumbers = [
    { character: '০', name: 'শূন্য', image: bn0, description: 'খালি ঝুড়ি' },
    { character: '১', name: 'এক', image: bn1, description: 'একটি কলম' },
    { character: '২', name: 'দুই', image: bn2, description: 'দুটি বল' },
    { character: '৩', name: 'তিন', image: bn3, description: 'তিনটি আপেল' },
    { character: '৪', name: 'চার', image: bn4, description: 'চারটি আম' },
    { character: '৫', name: 'পাঁচ', image: bn5, description: 'পাচটি তারা' },
    { character: '৬', name: 'ছয়', image: bn6, description: 'ছয়টি ফুল' },
    { character: '৭', name: 'সাত', image: bn7, description: 'সাতটি প্রজাপতি' },
    { character: '৮', name: 'আট', image: bn8, description: 'আটটি পেন্সিল' },
    { character: '৯', name: 'নয়', image: bn9, description: 'নয়টি কলা' },
    { character: '১০', name: 'দশ', image: bn10, description: 'দশটি চকলেট' },
  ]

  const englishNumbers = [
    { character: '0', name: 'Zero', image: en0, description: 'Zero Baskets' },
    { character: '1', name: 'One', image: en1, description: 'One Pen' },
    { character: '2', name: 'Two', image: en2, description: 'Two Balls' },
    { character: '3', name: 'Three', image: en3, description: 'Three Apples' },
    { character: '4', name: 'Four', image: en4, description: 'Four Mangoes' },
    { character: '5', name: 'Five', image: en5, description: 'Five Stars' },
    { character: '6', name: 'Six', image: en6, description: 'Six Flowers' },
    { character: '7', name: 'Seven', image: en7, description: 'Seven Butterflies' },
    { character: '8', name: 'Eight', image: en8, description: 'Eight Pencils' },
    { character: '9', name: 'Nine', image: en9, description: 'Nine Bananas' },
    { character: '10', name: 'Ten', image: en10, description: 'Ten Candies' },
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