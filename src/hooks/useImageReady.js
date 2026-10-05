import { useEffect, useState } from 'react'

const requested = new Set()
const ready = new Set()

/** Starts fetching an image once, so the browser cache is warm before it shows. */
export function preloadImage(src) {
  if (!src || requested.has(src)) return
  requested.add(src)
  const img = new Image()
  img.src = src
}

/**
 * Reports whether an image has finished decoding, so a card can hold its faded
 * state until the pixels are actually available. The read happens during render
 * rather than inside an effect, which removes the one-frame flash where a card
 * mounts at `opacity: 0` for an image the browser has already cached.
 */
export default function useImageReady(src) {
  const [, bump] = useState(0)

  useEffect(() => {
    if (!src) return undefined
    preloadImage(src)
    if (ready.has(src)) return undefined

    const img = new Image()
    const done = () => {
      ready.add(src)
      bump(n => n + 1)
    }
    img.onload = done
    img.onerror = done
    img.src = src
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return !src || ready.has(src)
}
