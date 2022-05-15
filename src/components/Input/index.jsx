import { func } from 'prop-types'
import { useState } from 'react'
import './input'

const Input = ({ onChangeValue }) => {
  const [inputValue, setInputValue] = useState('')

  const onChange = (event) => {
    const value = event.target.value

    setInputValue(value)
    onChangeValue(value)
  }

  return (
    <div className="floating-input">
      <label className="floating-input__label" htmlFor="search">
        Busque por artistas, álbuns ou músicas
      </label>
      <input
        onChange={onChange}
        type="text"
        id="search"
        name="search"
        value={inputValue}
        className="floating-input__field"
        placeholder="Comece a escrever..."
        required
      />
    </div>
  )
}

Input.prototype = {
  onChangeValue: func
}

export default Input
