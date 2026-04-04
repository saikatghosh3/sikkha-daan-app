import FlashCard from './FlashCard'
import apple from '../assets/apple.png'
import Ball from '../assets/Ball.png'
import cat from '../assets/cat.png'
import dog from '../assets/dog.png'
import elephant from '../assets/elephant.png'
import fish from '../assets/fish.png'
import giraffe from '../assets/giraffe.png'
import hamester from '../assets/hamester.png'
import iguana from '../assets/iguana.png'
import jar from '../assets/jar.png'
import koala from '../assets/koala.png'
import lion from '../assets/lion.png'
import mouse from '../assets/mouse.png'
import nest from '../assets/nest.png'
import octopus from '../assets/octopus.png'
import penguin from '../assets/penguin.png'
import quetzal from '../assets/quetzal.png'
import rabbit from '../assets/rabbit.png'
import snake from '../assets/snake.png'
import train from '../assets/train.png'
import umbrella from '../assets/umbrella.png'
import violen from '../assets/violen.png'
import whale from '../assets/whale.png'
import xylophone from '../assets/xylophone.png'
import yoyo from '../assets/yoyo.png'
import zebra from '../assets/zebra.png'
export default function EnglishSection() {

  const englishItems = [
    { character: 'A', image: apple },
    { character: 'B', image: Ball },
    { character: 'C', image: cat },
    { character: 'D', image: dog },
    { character: 'E', image: elephant },
    { character: 'F', image: fish },
    { character: 'G', image: giraffe },
    { character: 'H', image: hamester },
    { character: 'I', image: iguana },
    { character: 'J', image: jar },
    { character: 'K', image: koala },
    { character: 'L', image: lion },
    { character: 'M', image: mouse },
    { character: 'N', image: nest },
    { character: 'O', image: octopus },
    { character: 'P', image: penguin },
    { character: 'Q', image: quetzal },
    { character: 'R', image: rabbit },
    { character: 'S', image: snake },
    { character: 'T', image: train },
    { character: 'U', image: umbrella },
    { character: 'V', image: violen },
    { character: 'W', image: whale },
    { character: 'X', image: xylophone },
    { character: 'Y', image: yoyo },
    { character: 'Z', image: zebra },
  ]

  return (
    <FlashCard
      items={englishItems}
      title="English Alphabet"
      categoryColor="#FFB347"
    />
  )
}