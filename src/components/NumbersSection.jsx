import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

const STATIC_BANGLA = [
  { character: '০', name: 'শূন্য', image: '/img/numbers/khalijhuri.png', description: 'খালি ঝুড়ি' },
  { character: '১', name: 'এক', image: '/img/numbers/ekkolom.png', description: 'একটি কলম' },
  { character: '২', name: 'দুই', image: '/img/numbers/duibol.png', description: 'দুটি বল' },
  { character: '৩', name: 'তিন', image: '/img/numbers/tinapple.png', description: 'তিনটি আপেল' },
  { character: '৪', name: 'চার', image: '/img/numbers/charaam.png', description: 'চারটি আম' },
  { character: '৫', name: 'পাঁচ', image: '/img/numbers/pachtara.png', description: 'পাঁচটি তারা' },
  { character: '৬', name: 'ছয়', image: '/img/numbers/choiful.png', description: 'ছয়টি ফুল' },
  { character: '৭', name: 'সাত', image: '/img/numbers/sathprojapoti.png', description: 'সাতটি প্রজাপতি' },
  { character: '৮', name: 'আট', image: '/img/numbers/atpencil.png', description: 'আটটি পেন্সিল' },
  { character: '৯', name: 'নয়', image: '/img/numbers/noikola.png', description: 'নয়টি কলা' },
  { character: '১০', name: 'দশ', image: '/img/numbers/doshchocolate.png', description: 'দশটি চকলেট' },
  { character: '১১', name: 'এগারো', image: null, description: 'এগারোটি' },
  { character: '১২', name: 'বারো', image: null, description: 'বারোটি' },
  { character: '১৩', name: 'তেরো', image: null, description: 'তেরোটি' },
  { character: '১৪', name: 'চৌদ্দ', image: null, description: 'চৌদ্দটি' },
  { character: '১৫', name: 'পনেরো', image: null, description: 'পনেরোটি' },
  { character: '১৬', name: 'ষোলো', image: null, description: 'ষোলোটি' },
  { character: '১৭', name: 'সতেরো', image: null, description: 'সতেরোটি' },
  { character: '১৮', name: 'আঠারো', image: null, description: 'আঠারোটি' },
  { character: '১৯', name: 'উনিশ', image: null, description: 'উনিশটি' },
  { character: '২০', name: 'কুড়ি', image: null, description: 'কুড়িটি' },
]

const STATIC_ENGLISH = [
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
  { character: '11', name: 'Eleven', image: null, description: 'Eleven Items' },
  { character: '12', name: 'Twelve', image: null, description: 'Twelve Items' },
  { character: '13', name: 'Thirteen', image: null, description: 'Thirteen Items' },
  { character: '14', name: 'Fourteen', image: null, description: 'Fourteen Items' },
  { character: '15', name: 'Fifteen', image: null, description: 'Fifteen Items' },
  { character: '16', name: 'Sixteen', image: null, description: 'Sixteen Items' },
  { character: '17', name: 'Seventeen', image: null, description: 'Seventeen Items' },
  { character: '18', name: 'Eighteen', image: null, description: 'Eighteen Items' },
  { character: '19', name: 'Nineteen', image: null, description: 'Nineteen Items' },
  { character: '20', name: 'Twenty', image: null, description: 'Twenty Items' },
]

export default function NumbersSection() {
  const [bangla, setBangla] = useState(STATIC_BANGLA)
  const [english, setEnglish] = useState(STATIC_ENGLISH)

  useEffect(() => {
    Promise.all([api.numbers.getBangla(), api.numbers.getEnglish()])
      .then(([b, e]) => { if (b.length) setBangla(b); if (e.length) setEnglish(e) })
      .catch(() => {})
  }, [])

  return (
    <>
      <FlashCard
        items={bangla}
        title="বাংলা সংখ্যা"
        categoryColor="#FF6B6B"
      />
      <FlashCard
        items={english}
        title="English Numbers"
        categoryColor="#4ECDC4"
      />
    </>
  )
}
