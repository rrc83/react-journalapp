import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
        <NoteAppBar />
        <div className='notes__content'>
            <input type="text" 
                   placeholder='Título'
                   className='notes__title-input'
            />
            <textarea placeholder='escribe algo...'
                      className='notes__textarea'
            >
            </textarea>
            <div className='notes__image'>
                <img src="https://www.softzone.es/app/uploads-softzone.es/2018/07/Fondo-pantalla-macOS.jpg" 
                     alt="imagen"
                />
            </div>
        </div>
    </div>
  )
}
