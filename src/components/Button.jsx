import React from 'react'

const Button = ({onClick, text}) => {
  return (
    <button type="button" onClick={onClick}text>{text}</button>
  )
}

export default Button