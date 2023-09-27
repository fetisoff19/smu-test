import React from 'react'

export const Button = ({ text, title, onClick, className, reference, type }) => {
  return (
    <button
      onClick={onClick}
      className={className || ''}
      title={title}
      ref={reference}
      type={type}
    >
      {text}
    </button>
  )
}
