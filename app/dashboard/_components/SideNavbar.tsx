'use client'

import {
  EditIcon,
  FileTextIcon,
  LayoutGridIcon,
  SettingsIcon,
} from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UsageTrack from './UsageTrack'

interface SideNavbarProps {
  onClose?: () => void
}

const SideNavbar: React.FC<SideNavbarProps> = ({ onClose }) => {
  const pathname = usePathname()

  const MenuList = [
    {
      name: '컨텐츠 제작 AI 테스트',
      icon: LayoutGridIcon,
      href: '/dashboard',
    },
    {
      name: 'AI 도구 수정',
      icon: EditIcon,
      href: '/dashboard/my-templates',
    },
    {
      name: '히스토리',
      icon: FileTextIcon,
      href: '/dashboard/history',
    },
    {
      name: '설정',
      icon: SettingsIcon,
      href: '/dashboard/settings',
    },
  ]

  return (
    <div className='flex flex-col h-screen p-2'>
      <div className='flex justify-center gap-4 mb-8 p-5'>
        <Image src={'/logo.svg'} alt='logo' width={80} height={80} />
        <h2 className='text-2xl font-bold'>AI 테스트</h2>
      </div>
      <div className='flex-grow mt-10'>
        {MenuList.map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className={`flex items-center p-3 mb-2 cursor-pointer rounded-lg ${
              pathname === item.href
                ? 'bg-black text-white'
                : 'hover:bg-neutral-600 hover:text-white'
            }`}
            onClick={onClose}
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
      <div className='mt-auto'>
        <UsageTrack />
      </div>
    </div>
  )
}

export default SideNavbar
