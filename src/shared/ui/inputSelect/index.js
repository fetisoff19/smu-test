import React, { useState } from 'react'

export const InputAndSelect = ({
  value, setValue, label, placeholder,
  type = 'text',
  className, required,
  minLength, maxLength,
  options, checked,
  step, min, max, size
}) => {
  const [check, setCheck] = useState(Boolean(checked))

  const handleChange = (e) => {
    if (type === 'checkbox') {
      setValue(!check)
      setCheck(!check)
    } else setValue(e.target.value)
  }

  return (
    <div className={className || ''}>
      {label && <label htmlFor={label}>
        {label}
      </label>}
      { !options
        ? <input
        onChange={handleChange}
        value={value}
        className={className}
        id={label}
        name={label}
        required={!!required}
        step={step}
        type={type}
        min={min}
        max={max}
        size={size}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        checked={check}

      />
        : <select name={label} id={label}
                  value={value}
                  onChange={handleChange}
                  className={className}>
            {options?.map(item =>
              <option
                key={item} value={item}>
                {item}
              </option>)}
          </select>

      }

    </div>
  )
}
