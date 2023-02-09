import React from 'react'
import { BookmarkIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, FaceSmileIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

function Post({id, username, userImg, img, caption}) {
  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/* Header */}
        <div className='flex items-center p-5'>
          <img src={userImg} alt="" className='rounded-full h-12 w-12'/>
          <p className='flex-1'>{username}</p>
          <EllipsisHorizontalIcon className='h-5'></EllipsisHorizontalIcon>
        </div>
        {/* img */}
        <img src={img} alt="" className='object-cover w-full'/>

        {/* buttons */}
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex space-x-4'>
            <HeartIcon className='btn'/>
            <ChatBubbleOvalLeftEllipsisIcon className='btn'/>
            <PaperAirplaneIcon className='btn'/>
          </div>
          <BookmarkIcon className='btn'/>
        </div>
        
        {/* caption */}

        {/* comments */}

        {/* input box */}
    </div>
  )
}

export default Post