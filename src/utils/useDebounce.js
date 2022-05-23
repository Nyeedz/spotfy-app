import { fn, number } from 'prop-types'
import { useRef } from 'react'

export const useDebounce = (fn, delay) => {
  const timeoutRef = useRef(null)

  const debouncedFn = (...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}

useDebounce.prototype = {
  fn: fn,
  delay: number
}
