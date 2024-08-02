'use client'

import {
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  SettingsIcon,
  ZapIcon,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'

const SideNavbar = () => {
  const pathname = usePathname()

  const MenuList = [
    {
      name: '컨텐츠 제작 AI 테스트',
      icon: LayoutGridIcon,
      href: '/dashboard',
    },
    {
      name: '히스토리',
      icon: FileTextIcon,
      href: '/dashboard/history',
    },
    {
      name: '구독 업그레이드',
      icon: ZapIcon,
      href: '/dashboard/billing',
    },
    {
      name: '설정',
      icon: SettingsIcon,
      href: '/dashboard/settings',
    },
  ]
  return (
    <div className='h-screen p-5 shadow-sm border bg-white relative'>
      <div className='flex justify-center gap-4'>
        <Image src={'/logo.svg'} alt='logo' width={80} height={80} />
        <h2 className='text-2xl font-bold'>AI 테스트</h2>
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
      <div className='absolute bottom-10 left-0 w-full'>
        <UsageTrack />
      </div>
    </div>
  )
}

export default SideNavbar
