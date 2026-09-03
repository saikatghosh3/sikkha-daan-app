import { useState, useEffect } from 'react'
import { api } from '../api/client'
import FlashCard from './FlashCard'

const UPPERCASE_ITEMS = [
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

const LOWERCASE_ITEMS = [
  { character: 'a', name: 'apple', image: '/img/apple.png', description: 'apple' },
  { character: 'b', name: 'ball', image: '/img/Ball.png', description: 'ball' },
  { character: 'c', name: 'cat', image: '/img/cat.png', description: 'cat' },
  { character: 'd', name: 'dog', image: '/img/dog.png', description: 'dog' },
  { character: 'e', name: 'elephant', image: '/img/elephant.png', description: 'elephant' },
  { character: 'f', name: 'fish', image: '/img/fish.png', description: 'fish' },
  { character: 'g', name: 'giraffe', image: '/img/giraffe.png', description: 'giraffe' },
  { character: 'h', name: 'house', image: '/img/house.png', description: 'house' },
  { character: 'i', name: 'ice cream', image: '/img/icecream.png', description: 'ice cream' },
  { character: 'j', name: 'jar', image: '/img/jar.png', description: 'jar' },
  { character: 'k', name: 'king', image: '/img/king.png', description: 'king' },
  { character: 'l', name: 'lion', image: '/img/lion.png', description: 'lion' },
  { character: 'm', name: 'mouse', image: '/img/mouse.png', description: 'mouse' },
  { character: 'n', name: 'nest', image: '/img/nest.png', description: 'nest' },
  { character: 'o', name: 'octopus', image: '/img/octopus.png', description: 'octopus' },
  { character: 'p', name: 'penguin', image: '/img/penguin.png', description: 'penguin' },
  { character: 'q', name: 'queen', image: '/img/queen.png', description: 'queen' },
  { character: 'r', name: 'rabbit', image: '/img/rabbit.png', description: 'rabbit' },
  { character: 's', name: 'snake', image: '/img/snake.png', description: 'snake' },
  { character: 't', name: 'train', image: '/img/train.png', description: 'train' },
  { character: 'u', name: 'umbrella', image: '/img/umbrella.png', description: 'umbrella' },
  { character: 'v', name: 'violin', image: '/img/violen.png', description: 'violin' },
  { character: 'w', name: 'whale', image: '/img/whale.png', description: 'whale' },
  { character: 'x', name: 'xylophone', image: '/img/xylophone.png', description: 'xylophone' },
  { character: 'y', name: 'yoyo', image: '/img/yoyo.png', description: 'yoyo' },
  { character: 'z', name: 'zebra', image: '/img/zebra.png', description: 'zebra' },
]

export default function EnglishSection() {
  const [uppercaseItems, setUppercaseItems] = useState(UPPERCASE_ITEMS)

  useEffect(() => {
    api.english.getAll()
      .then(data => { if (data.length) setUppercaseItems(data) })
      .catch(() => {})
  }, [])

  return (
    <div>
      <FlashCard
        items={uppercaseItems}
        title="Capital Letters (A-Z)"
        categoryColor="#FFB347"
      />
      <FlashCard
        items={LOWERCASE_ITEMS}
        title="Small Letters (a-z)"
        categoryColor="#FFB347"
      />
    </div>
  )
}
