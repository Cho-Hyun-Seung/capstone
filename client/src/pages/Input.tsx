import React, { useState } from 'react'

const Input = () => {
  const [textValue, setTextValue] = useState([])

  const onChange = (e: any) => {
    setTextValue(e.target.value)
  }

  return (
    <div>
      <input type='text' value={textValue} onChange={onChange} />
      <br />
      <p>{textValue}</p>
    </div>
  )
}

export default Input
