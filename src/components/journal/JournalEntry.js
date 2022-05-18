import React from 'react'

export const JournalEntry = () => {
  return (
        <div className='journal__entry pointer'>
            <div className='journal__entry-picture'
                style={{
                    backgroundSize:'cover',
                    backgroundImage:'url(https://www.mactualidad.com/wp-content/uploads/2014/07/smooth-ivy.jpg)'
                }}
            >

            </div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Un nuevo día
                </p>
                <p className='journal__entry-content'>
                    askadjkladjkladsjklasdkl
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>Lunes</span>
                <h4>17</h4>
            </div>
        </div>
  )
}
