import { useState, useEffect } from 'react'
import Favor from './favor'
import FavorActive from './favor-active'


export default function FavStoreBtn3({ onClick = () => {}, width, fav }) {
  return (
    <span
      onClick={onClick}
      onKeyDown={(e) => {
        e.preventDefault()
      }}
      role="button"
      tabIndex="0"
    >
      {fav ? <FavorActive width={width} /> : <Favor width={width} />}
    </span>
  )
}
