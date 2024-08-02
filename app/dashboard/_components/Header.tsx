'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import SideNavbar from './SideNavbar'

const Header = () => {
  const { user } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      <div className='md:hidden'>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className='p-2 hover:bg-gray-100 rounded-lg'>
              <MenuIcon size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
            <SheetHeader>
              <SheetTitle>메뉴</SheetTitle>
            </SheetHeader>
            <div className='mt-4'>
              <SideNavbar onClose={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className='flex gap-2 items-center'>
        <span className='text-blue-500'>{user?.fullName}</span> 님 반갑습니다.
        <UserButton />
      </div>
    </div>
  )
}

export default Header
