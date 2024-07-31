import { SearchIcon, ZapIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between'>
      <div className='flex gap-2 items-center p-2 border rounded-md max-w-md'>
        <SearchIcon />
        <input type='text' placeholder='검색...' className='outline-none' />
      </div>
      <div>
        <h2 className='bg-primary p-2 rounded-full text-xs text-white flex items-center justify-center'>
          <ZapIcon className='size-4 mr-2' />
          업그레이드
        </h2>
      </div>
    </div>
  )
}

export default Header
