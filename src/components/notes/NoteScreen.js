import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NoteAppBar } from './NoteAppBar'

export const NoteScreen = () => {

  const {active:note} = useSelector(state=>state.notes)
  const [formValues,handleInputChage,reset] = useForm(note);
  const {title,body,date,url} = formValues;
  const activeId =  useRef(note.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if(note.id !== activeId.current){
      reset(note);
      activeId.current = note.id;
    }
  }, [note,reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id,{...formValues}));

  }, [formValues,dispatch])
  const handelDelete = ()=>{

  }
  return (
    <div className='notes__main-content'>
        <NoteAppBar date={date}/>
        <div className='notes__content'>
            <input type="text" 
                   placeholder='Título'
                   className='notes__title-input'
                   value={title}
                   onChange={handleInputChage}
                   name='title'
            />
            <textarea placeholder='escribe algo...'
                      className='notes__textarea'
                      value={body}
                      name='body'
                      onChange={handleInputChage}
            >
            </textarea>
            {
              (note.url)
                &&
                  (
                    <div className='notes__image'>
                    <img src={url} 
                       alt="imagen"
                    />  
                    </div>
                  )
            }
        </div>
        <button className='btn btn-danger'
                onClick={handleDelete}
        >
            Borrar
        </button>
    </div>
  )
}
