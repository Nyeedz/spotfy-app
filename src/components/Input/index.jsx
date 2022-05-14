import { useState } from 'react'
import './input'

export const Input = () => {
  const [inputValue, setInputValue] = useState('')

  const onChange = (event) => {
    console.log(event)

    setInputValue(event.target.value)
  }

  return (
    <input
      onChange={onChange}
      type="text"
      id="music-search"
      name="music-search"
      value={inputValue}
    />
  )
}
