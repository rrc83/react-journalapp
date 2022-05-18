import React from 'react'

export const NoteAppBar = () => {
  return (
    <div className='notes__appbar'>
        <span>18 de Mayo de 2022</span>
        <div>
            <button className='btn'> Imagen </button>
            <button className='btn'> Borrar </button>
        </div>
    </div>
  )
}
