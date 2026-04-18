import FlashCard from './FlashCard'



export default function BanglaSection() {

 const sorborno = [
    { character: 'অ', name: 'অজগর', image: '/img/bangla/ajogor.png', description: 'অজগর (Python)' },
    { character: 'আ', name: 'আম', image: '/img/bangla/aam.png', description: 'আম (Mango)' },
    { character: 'ই', name: 'ইলিশ', image: '/img/bangla/elish.png', description: 'ইলিশ (Hilsa Fish)' },
    { character: 'ঈ', name: 'ঈগল', image: '/img/bangla/egol.png', description: 'ঈগল (Eagle)' },
    { character: 'উ', name: 'উট', image: '/img/bangla/oot.png', description: 'উট (Camel)' },
    { character: 'ঊ', name: 'ঊষা', image: '/img/bangla/usha.png', description: 'ঊষা (Dawn)' },
    { character: 'ঋ', name: 'ঋষি', image: '/img/bangla/rishi.png', description: 'ঋষি (Sage)' },
    { character: 'এ', name: 'একতারা', image: '/img/bangla/ektara.png', description: 'একতারা (Ektara)' },
    { character: 'ঐ', name: 'ঐরাবত', image: '/img/bangla/oirabot.png', description: 'ঐরাবত (Elephant)' },
    { character: 'ও', name: 'ওল', image: '/img/bangla/oll.png', description: 'ওল (Taro)' },
    { character: 'ঔ', name: 'ঔষধ', image: '/img/bangla/ousodh.png', description: 'ঔষধ (Medicine)' },
  ]

  const banjonborno = [
{ character: 'ক', name: 'কাক', image: '/img/bangla/kak.png', description: 'কাক (Crow)' },
    { character: 'খ', name: 'খরগোশ', image: '/img/bangla/khorgosh.png', description: 'খরগোশ (Rabbit)' },
    { character: 'গ', name: 'গরু', image: '/img/bangla/goru.png', description: 'গরু (Cow)' },
    { character: 'ঘ', name: 'ঘোড়া', image: '/img/bangla/ghora.png', description: 'ঘোড়া (Horse)' },
    { character: 'ঙ', name: 'ব্যাঙ', image: '/img/bangla/bang.png', description: 'ব্যাঙ (Frog)' },

    { character: 'চ', name: 'চাঁদ', image: '/img/bangla/chad.png', description: 'চাঁদ (Moon)' },
    { character: 'ছ', name: 'ছাতা', image: '/img/bangla/chata.png', description: 'ছাতা (Umbrella)' },
    { character: 'জ', name: 'জাহাজ', image: '/img/bangla/jahaz.png', description: 'জাহাজ (Ship)' },
    { character: 'ঝ', name: 'ঝিনুক', image: '/img/bangla/jhinuk.png', description: 'ঝিনুক (Shell)' },
    { character: 'ঞ', name: 'পাঞ্জা', image: '/img/bangla/panja.png', description: 'পাঞ্জা (Paw)' },

       { character: 'ট', name: 'টমেটো', image: '/img/bangla/tomato.png', description: 'টমেটো (Tomato)' },
    { character: 'ঠ', name: 'ঠেলা', image: '/img/bangla/thelagari.png', description: 'ঠেলা (Push cart)' },
    { character: 'ড', name: 'ডাল', image: '/img/bangla/dal.png', description: 'ডাল (Branch)' },
    { character: 'ঢ', name: 'ঢাক', image: '/img/bangla/dhak.png', description: 'ঢাক (Drum)' },
    { character: 'ণ', name: 'বাণ', image: '/img/bangla/baan.png', description: 'বাণ (Arrow)' },

    { character: 'ত', name: 'তাল', image: '/img/bangla/tal.png', description: 'তাল (Palm fruit)' },
    { character: 'থ', name: 'থালা', image: '/img/bangla/thala.png', description: 'থালা (Plate)' },
    { character: 'দ', name: 'দরজা', image: '/img/bangla/doroja.png', description: 'দরজা (Door)' },
    { character: 'ধ', name: 'ধান', image: '/img/bangla/dhan.png', description: 'ধান (Paddy)' },
    { character: 'ন', name: 'নদী', image: '/img/bangla/nodi.png', description: 'নদী (River)' },

    { character: 'প', name: 'পাখি', image: '/img/bangla/pakhi.png', description: 'পাখি (Bird)' },
    { character: 'ফ', name: 'ফুল', image: '/img/bangla/ful.png', description: 'ফুল (Flower)' },
    { character: 'ব', name: 'বই', image: '/img/bangla/boi.png', description: 'বই (Book)' },
    { character: 'ভ', name: 'ভালুক', image: '/img/bangla/vhaluk.png', description: 'ভালুক (Bear)' },
    { character: 'ম', name: 'মাছ', image: '/img/bangla/mas.png', description: 'মাছ (Fish)' },

    { character: 'য', name: 'যান', image: '/img/bangla/jan.png', description: 'যান (Vehicle)' },
    { character: 'র', name: 'রথ', image: '/img/bangla/roth.png', description: 'রথ (Chariot)' },
    { character: 'ল', name: 'লেবু', image: '/img/bangla/labu.png', description: 'লেবু (Lemon)' },

    { character: 'শ', name: 'শাপলা', image: '/img/bangla/shapla.png', description: 'শাপলা (Water Lily)' },
    { character: 'ষ', name: 'ষাঁড়', image: '/img/bangla/shar.png', description: 'ষাঁড় (Bull)' },
    { character: 'স', name: 'সাপ', image: '/img/bangla/shap.png', description: 'সাপ (Snake)' },
    { character: 'হ', name: 'হাতি', image: '/img/bangla/hati.png', description: 'হাতি (Elephant)' },

    { character: 'ড়', name: 'ঘড়ি', image: '/img/bangla/ghori.png', description: 'ঘড়ি (Clock)' },
    { character: 'ঢ়', name: 'আঢ়ি', image: '/img/bangla/ari.png', description: 'আঢ়ি (Measure)' },
    { character: 'য়', name: 'ময়ূর', image: '/img/bangla/moiur.png', description: 'ময়ূর (Peacock)' },

    { character: 'ৎ', name: 'উৎপাদন', image: '/img/bangla/utpadon.png', description: 'উৎপাদন (Production)' },
    { character: 'ং', name: 'বাংলা', image: '/img/bangla/bangla.png', description: 'বাংলা (Bengali language)' },
    { character: 'ঃ', name: 'দুঃখ', image: '/img/bangla/dukkho.png', description: 'দুঃখ (Sorrow)' },
    { character: 'ঁ', name: 'চাঁদ', image: '/img/bangla/chad.png', description: 'চাঁদ (Moon)' },
  ]

  return (
    <>
      <FlashCard
        items={sorborno}
        title="স্বরবর্ণ (Bangla Vowels)"
        categoryColor="#FF6B6B"
      />

      <FlashCard
        items={banjonborno}
        title="ব্যঞ্জনবর্ণ (Bangla Consonants)"
        categoryColor="#4ECDC4"
      />
    </>
  )
}