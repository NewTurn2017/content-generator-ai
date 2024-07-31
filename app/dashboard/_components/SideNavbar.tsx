'use client'

import {
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  SettingsIcon,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNavbar = () => {
  const pathname = usePathname()

  const MenuList = [
    {
      name: '홈',
      icon: LayoutGridIcon,
      href: '/dashboard',
    },
    {
      name: '기록',
      icon: FileTextIcon,
      href: '/dashboard/history',
    },
    {
      name: '청구',
      icon: DollarSignIcon,
      href: '/dashboard/billing',
    },
    {
      name: '설정',
      icon: SettingsIcon,
      href: '/dashboard/setting',
    },
  ]
  return (
    <div className='h-screen p-5 shadow-sm border '>
      <div className='flex justify-center'>
        <Image src={'/logo.svg'} alt='logo' width={80} height={80} />
      </div>
      <hr className='my-8' />
      <div className='mt-3'>
        {MenuList.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg ${
              pathname === item.href
                ? 'bg-black text-white'
                : 'hover:bg-neutral-600 hover:text-white'
            }`}
          >
            <item.icon
              className={`h-5 w-5 mr-3 ${
                pathname === item.href
                  ? 'text-white'
                  : 'text-gray-500 group-hover:text-white'
              }`}
            />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNavbar
