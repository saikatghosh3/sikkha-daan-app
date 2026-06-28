import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

const STATIC_ITEMS = [
  { character: 'A', name: 'Apple', image: '/img/apple.png', description: 'Apple' },
  { character: 'B', name: 'Ball', image: '/img/Ball.png', description: 'Ball' },
  { character: 'C', name: 'Cat', image: '/img/cat.png', description: 'Cat' },
  { character: 'D', name: 'Dog', image: '/img/dog.png', description: 'Dog' },
  { character: 'E', name: 'Elephant', image: '/img/elephant.png', description: 'Elephant' },
  { character: 'F', name: 'Fish', image: '/img/fish.png', description: 'Fish' },
  { character: 'G', name: 'Giraffe', image: '/img/giraffe.png', description: 'Giraffe' },
  { character: 'H', name: 'House', image: '/img/house.png', description: 'House' },
  { character: 'I', name: 'Ice Cream', image: '/img/icecream.png', description: 'Ice Cream' },
  { character: 'J', name: 'Jar', image: '/img/jar.png', description: 'Jar' },
  { character: 'K', name: 'King', image: '/img/king.png', description: 'King' },
  { character: 'L', name: 'Lion', image: '/img/lion.png', description: 'Lion' },
  { character: 'M', name: 'Mouse', image: '/img/mouse.png', description: 'Mouse' },
  { character: 'N', name: 'Nest', image: '/img/nest.png', description: 'Nest' },
  { character: 'O', name: 'Octopus', image: '/img/octopus.png', description: 'Octopus' },
  { character: 'P', name: 'Penguin', image: '/img/penguin.png', description: 'Penguin' },
  { character: 'Q', name: 'Queen', image: '/img/queen.png', description: 'Queen' },
  { character: 'R', name: 'Rabbit', image: '/img/rabbit.png', description: 'Rabbit' },
  { character: 'S', name: 'Snake', image: '/img/snake.png', description: 'Snake' },
  { character: 'T', name: 'Train', image: '/img/train.png', description: 'Train' },
  { character: 'U', name: 'Umbrella', image: '/img/umbrella.png', description: 'Umbrella' },
  { character: 'V', name: 'Violin', image: '/img/violen.png', description: 'Violin' },
  { character: 'W', name: 'Whale', image: '/img/whale.png', description: 'Whale' },
  { character: 'X', name: 'Xylophone', image: '/img/xylophone.png', description: 'Xylophone' },
  { character: 'Y', name: 'Yoyo', image: '/img/yoyo.png', description: 'Yoyo' },
  { character: 'Z', name: 'Zebra', image: '/img/zebra.png', description: 'Zebra' },
]

export default function EnglishSection() {
  const [items, setItems] = useState(STATIC_ITEMS)

  useEffect(() => {
    api.english.getAll()
      .then(data => { if (data.length) setItems(data) })
      .catch(() => {})
  }, [])

  return (
    <FlashCard
      items={items}
      title="English Alphabet"
      categoryColor="#FFB347"
    />
  )
}
