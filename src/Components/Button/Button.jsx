import React from 'react'
import './Button.css'

function Button({title, disable, onClick}) {
  return (
    <button className={`btn`}
    disabled={disable}
    onClick={onClick}
    >{title}
    </button>
  )
}

export default Button