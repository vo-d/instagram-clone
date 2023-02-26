import React from 'react'
import Image from 'next/image'
import {MagnifyingGlassIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, Bars3Icon} from '@heroicons/react/24/outline'
import {HomeIcon} from '@heroicons/react/24/solid'
import {useSession, signOut, signIn} from 'next-auth/react'

function Header() {

  const {data: session} = useSession();
  

  return (
    <div className='shadow-sm border'>
      <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>
        {/* Left */}
        <div className='relative hidden lg:inline-grid w-24 cursor-pointer'>
          <Image src="https://links.papareact.com/ocw" fill style={{objectFit:"contain"}}></Image>
        </div>

        <div className='relative lg:hidden w-10 flex-shrink-0 cursor-pointer'>
          <Image src="https://links.papareact.com/jjm" fill style={{objectFit:"contain"}}></Image>
        </div>
        {/* Middle -search input field*/}
        <div className='max-w-xs'>
          <div className='relative mt-1 p-3 rounded-md'>
            <div className='absolute inset-y-0 pl-3 flex items-center pointer-events-none'>
              <MagnifyingGlassIcon className='h-5 w-5 text-gray-500'></MagnifyingGlassIcon>
            </div>
            <input type="text" placeholder='Search' className='bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 
            focus:ring-black focus:border-black rounded-md'/>
          </div>
          
        </div>

        {/* Right */}
        <div className='flex items-center justify-end space-x-4'>
          <HomeIcon className='navBtn'></HomeIcon>
          <Bars3Icon className='h-10 w-10 md:hidden cursor-pointer'></Bars3Icon>

          {session ? (
            <>
              <div className='relative navBtn'>
              <PaperAirplaneIcon className='navBtn -rotate-45'></PaperAirplaneIcon>
              <div className='absolute -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center 
              justify-center animate-pulse text-white'>3</div>
              </div>
            
              <PlusCircleIcon className='navBtn'></PlusCircleIcon>
              <HeartIcon className='navBtn'></HeartIcon>
              <img src={session.user.image} onClick={signOut} alt="profile pic" className='h-10 rounded-full cursor-pointer w-10' />
            </>) : (
            <>
              <button onClick={signIn}>Sign In</button>
            </>
          )}
          
        </div>



      </div> 
    </div>
  )
}

export default Header