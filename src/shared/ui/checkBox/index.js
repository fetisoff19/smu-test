import React, { useState } from 'react'

export const CheckBox = ({ data }) => {
  const [checked, setChecked] = useState(data || false)

  const handleOnChange = () => {
    setChecked((state) => !state)
  }
  return (
    <input type="checkbox"
           defaultChecked={checked}
           onChange={() => handleOnChange}
    />
  )
}
