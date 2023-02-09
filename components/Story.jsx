import React from 'react'

function Story(props) {
  return (
    <div>
        <img src={props.img} alt="" className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer
        hover:scale-110 transform duration-200'/>
        <p className='text-xs w-14 truncate '>{props.username}</p>
    </div>
  )
}

export default Story