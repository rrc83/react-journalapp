import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const {uid} = useSelector( state => state.ui);
  const {name} = useSelector( state => state.auth);

  const handleLogout = ()=>{
    dispatch(startLogout(uid));
  }

  const handleAddNew = ()=>{
    dispatch(startNewNote());
  }
  return (
    <aside className='journal__sidebar'>
        <div className='journal__sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='far fa-moon'></i>
                <span> {name}</span>
            </h3>
            <button className='btn ' 
                    onClick={handleLogout}> Logout</button>
        </div>

        <div className='journal__new-entry ' 
             onClick={handleAddNew}
        >
            <i className='far fa-calendar-plus fa-5x'/>
            <p className='mt-5'>Nueva entrada</p>
        </div>
        <JournalEntries />
    </aside>
  )
}
