import React from 'react'
import Select from '../Select/Select'
import { useState, useEffect } from "react"

function Input({value, onChange}) {

  return (
    <div>
      <input value={value} 
        onChange={onChange} 
        type='text' 
        placeholder='Search the name of the card...'
        className='input'
        ></input>
    </div>

  )
}

export default Input