
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import {types} from '../types/types';

export const startNewNote = ()=>{

    return async ( dispatch , getState) =>{

        const {uid} = getState().auth;
        const newNote = {
            title:'',
            body:'',
            date:new Date().getTime()
        }
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(activeNote(doc.id,newNote));
    }

}

export const startLoadingNotes = (uid)=>{

    return async ( dispatch) =>{

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }

}

export const activeNote = (id,note)=>({
    type: types.notesActive,
        payload:{
        id,
        ...note
    }
});

export const setNotes = (note)=>({
    type: types.notesLoad,
    payload: note
})

export const startSaveNote= (note)=>{
    return async ( dispatch , getState) =>{
        const {uid} = getState().auth;        
        
        if ( !note?.url){
            delete note.url;
        }

        const newNote = {
            ...note
        };
               
        await db.doc(`${uid}/journal/notes/${newNote.id}`).update(newNote);
        dispatch(refreshNote(newNote.id,newNote));
        
        Swal.fire('Nota guardada','La nota se ha guardado correctamente','success');
    }
}

export const refreshNote = (id,note)=>({
    type:types.notesUpdated,
    payload:{
        id,
        note
    }
})

export const startUploading = (file)=>{
    return async (dispatch,getState)=>{
        const {active:activeNote} = getState().notes

        Swal.fire({
            title:'Subiendo...',
            text: 'Se esta procesando su petición...',
            allowEscapeKey: false,
            allowOutsideClick:false,
            didOpen: ()=>{
                Swal.showLoading()
            }
        });
        const fileUrl = await fileUpload(file);
        const note = {
            ...activeNote
        };
        note.url = fileUrl;
        dispatch(startSaveNote(note));
        Swal.close();

    }
}