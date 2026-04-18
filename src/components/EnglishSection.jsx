import FlashCard from './FlashCard'

export default function EnglishSection() {

  const englishItems = [
    { character: 'A', image: '/img/apple.png' },
    { character: 'B', image: '/img/Ball.png' },
    { character: 'C', image: '/img/cat.png' },
    { character: 'D', image: '/img/dog.png' },
    { character: 'E', image: '/img/elephant.png' },
    { character: 'F', image: '/img/fish.png' },
    { character: 'G', image: '/img/giraffe.png' },
    { character: 'H', image: '/img/hamester.png' },
    { character: 'I', image: '/img/iguana.png' },
    { character: 'J', image: '/img/jar.png' },
    { character: 'K', image: '/img/koala.png' },
    { character: 'L', image: '/img/lion.png' },
    { character: 'M', image: '/img/mouse.png' },
    { character: 'N', image: '/img/nest.png' },
    { character: 'O', image: '/img/octopus.png' },
    { character: 'P', image: '/img/penguin.png' },
    { character: 'Q', image: '/img/quetzal.png' },
    { character: 'R', image: '/img/rabbit.png' },
    { character: 'S', image: '/img/snake.png' },
    { character: 'T', image: '/img/train.png' },
    { character: 'U', image: '/img/umbrella.png' },
    { character: 'V', image: '/img/violen.png' },
    { character: 'W', image: '/img/whale.png' },
    { character: 'X', image: '/img/xylophone.png' },
    { character: 'Y', image: '/img/yoyo.png' },
    { character: 'Z', image: '/img/zebra.png' },
  ]

  return (
    <FlashCard
      items={englishItems}
      title="English Alphabet"
      categoryColor="#FFB347"
    />
  )
}