import React from 'react'
import Select from './Select.css'
import { useState } from "react"

function Select({value, onChange}) {

  return (
    <div>
        <label for="game-selector">Choose a TCG:</label>
        <br></br>
        <select value={value} onChange={onChange} name='games' id='game-selector' className='select'>
            <option value="">--Please choose a card game--</option>
            <option value="pokemon">Pokémon</option>
            <option value="one-piece">One Piece</option>
            <option value="dragon-ball-fusion">Dragon Ball Fusion</option>
            <option value="digimon">Digimon</option>
            <option value="magic">Magic The Gathering</option>
            <option value="gundam">Gundam</option>
            <option value="star-wars-unlimited">Star Wars Unlimited</option>
            <option value="riftbound">Riftbound</option>
        </select>
    </div>
  )
}

export default Select