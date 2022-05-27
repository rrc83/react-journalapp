import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NoteAppBar = ({date}) => {
const fecha = new Date(date);
const options = {year: 'numeric', month: 'long', day: 'numeric' };
const {active:note} = useSelector(state=>state.notes)
const dispatch = useDispatch();

const handleNoteSave = ()=>{
  dispatch(startSaveNote(note));
}
const handlePictureClick = ()=>{
  document.querySelector("#fileSelector").click();
}
const handleFileChange = (e)=>{
  const file = e.target.files[0];
  if(file){
    dispatch(startUploading(file));
  }
}
  return (
    <div className='notes__appbar'>
        <span>{fecha.toLocaleDateString('es-ES', options)}</span>
        <input type='file'
               style={{display:'none'}}
               name='file'
               onChange={handleFileChange}
               id="fileSelector"
        />
        <div>
            <button className='btn' onClick={handlePictureClick} type='file'> Imagen </button>
            <button className='btn' onClick={handleNoteSave}> Save </button>
        </div>
    </div>
  )
}
