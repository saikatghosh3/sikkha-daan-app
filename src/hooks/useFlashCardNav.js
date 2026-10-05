import { useCallback, useEffect, useRef, useState } from 'react'

// Long enough to absorb a duplicate DOM event from a single physical press
// (those arrive inside the same frame, 0-16ms, from double-tap-zoom, ghost
// clicks and key auto-repeat) but well under the ~200ms floor of a human
// double tap, so two deliberate presses always mean two steps. The zoom path
// itself is closed off in CSS via `touch-action: manipulation`.
export const NAV_LOCK_MS = 150

function clampIndex(value, total) {
  if (total <= 0) return 0
  if (!Number.isFinite(value) || value < 0) return 0
  return value >= total ? total - 1 : value
}

function stepFrom(value, delta, total) {
  const from = clampIndex(value, total)
  return (from + delta + total) % total
}

export default function useFlashCardNav(total, autoPlayMs = 0) {
  const count = Number.isFinite(total) && total > 0 ? Math.floor(total) : 0

  const [rawIndex, setRawIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Derived, not stored: a list that shrinks (new API payload, tab change) can
  // never leave the view pointing past the end without a cascading render.
  const index = clampIndex(rawIndex, count)

  const lastStepAtRef = useRef(0)
  const unlockTimerRef = useRef(null)

  useEffect(() => () => clearTimeout(unlockTimerRef.current), [])

  const releaseLock = useCallback(() => {
    lastStepAtRef.current = 0
    clearTimeout(unlockTimerRef.current)
    unlockTimerRef.current = null
    setIsNavigating(false)
  }, [])

  // One physical press may only ever produce one index change. A press that
  // lands inside the lock window is a duplicate of the step already being
  // animated (double-tap zoom, ghost click, key auto-repeat), not new intent.
  const acquireLock = useCallback(() => {
    const now = Date.now()
    if (now - lastStepAtRef.current < NAV_LOCK_MS) return false
    lastStepAtRef.current = now
    clearTimeout(unlockTimerRef.current)
    unlockTimerRef.current = setTimeout(() => {
      lastStepAtRef.current = 0
      unlockTimerRef.current = null
      setIsNavigating(false)
    }, NAV_LOCK_MS)
    setIsNavigating(true)
    return true
  }, [])

  // A one-shot timeout chain rather than an interval, so every step cancels the
  // pending tick. A manual press therefore restarts the countdown instead of
  // stacking a tick on top of it, which is what used to skip two items at once.
  useEffect(() => {
    if (!autoPlay || count < 2 || autoPlayMs <= 0) return undefined
    const timer = setTimeout(() => {
      setRawIndex(prev => stepFrom(prev, 1, count))
    }, autoPlayMs)
    return () => clearTimeout(timer)
  }, [autoPlay, count, autoPlayMs, rawIndex])

  const goNext = useCallback(() => {
    if (count < 2 || !acquireLock()) return
    setRawIndex(prev => stepFrom(prev, 1, count))
  }, [acquireLock, count])

  const goPrev = useCallback(() => {
    if (count < 2 || !acquireLock()) return
    setRawIndex(prev => stepFrom(prev, -1, count))
  }, [acquireLock, count])

  const goTo = useCallback((target) => {
    const next = clampIndex(target, count)
    if (next === index || !acquireLock()) return
    setRawIndex(next)
  }, [acquireLock, count, index])

  const reset = useCallback(() => {
    releaseLock()
    setRawIndex(0)
  }, [releaseLock])

  const stopAutoPlay = useCallback(() => {
    releaseLock()
    setAutoPlay(false)
  }, [releaseLock])

  const toggleAutoPlay = useCallback(() => {
    if (!autoPlay) {
      setAutoPlay(true)
      return
    }
    releaseLock()
    setAutoPlay(false)
  }, [autoPlay, releaseLock])

  // Only arrows are handled: they never activate a focused button, so this can
  // never double-fire alongside that button's own click.
  const handleKeyDown = useCallback((event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrev()
    }
  }, [goNext, goPrev])

  return {
    index,
    total: count,
    isNavigating,
    autoPlay,
    goNext,
    goPrev,
    goTo,
    reset,
    stopAutoPlay,
    toggleAutoPlay,
    handleKeyDown,
  }
}
