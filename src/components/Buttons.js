import React from 'react'

const Buttons = ({name}) => {

  return (
    <div>
        <button className='px-3 py-2 m-3 bg-gray-200 rounded-lg'>{name}</button>
    </div>
  )
}

export default Buttons