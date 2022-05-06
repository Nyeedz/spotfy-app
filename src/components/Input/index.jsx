import { useState } from 'react'
import './input.scss'

const Input = () => {
  const [inputValue, setInputValue] = useState('')

  const onChange = (event) => {
    console.log(event)

    setInputValue(event.target.value)
  }

  return (
    <form className="c-form">
      <div>
        <label htmlFor="music-search" />
        <input
          onChange={onChange}
          type="text"
          id="music-search"
          name="music-search"
          value={inputValue}
        />
      </div>
    </form>
  )
}

export default Input
