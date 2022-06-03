import { useDebounce } from '@utils/useDebounce'
import { func } from 'prop-types'
import { memo, useState } from 'react'
import './input'

const Input = ({ onChangeValue }) => {
  const [inputValue, setInputValue] = useState('')
  const debouncedChange = useDebounce(onChangeValue, 700)

  const onChange = (event) => {
    const value = event.target.value

    setInputValue(value)
    debouncedChange(value)
  }

  return (
    <div className="input">
      <label className="input__label" htmlFor="search">
        Busque por artistas, álbuns ou músicas
      </label>
      <input
        onChange={onChange}
        type="text"
        id="search"
        name="search"
        value={inputValue}
        className="input__field"
        placeholder="Comece a escrever..."
        required
      />
    </div>
  )
}

export default memo(Input)

Input.prototype = {
  onChangeValue: func
}
