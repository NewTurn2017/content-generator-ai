import React from 'react'
import { UserTemplates } from '@/utils/schema'
import Link from 'next/link'
import Image from 'next/image'

interface TemplateCardProps {
  icon: string
  name: string
  desc: string
  category: string
  userEmail: string
  slug: string
}
const TemplateCard = ({
  icon,
  name,
  desc,
  category,
  userEmail,
  slug,
}: TemplateCardProps) => {
  return (
    <Link href={`/dashboard/content/${slug}`}>
      <div className='border rounded-lg p-4 hover:shadow-md transition-shadow relative'>
        <div className='flex gap-4 items-center mb-2'>
          <Image
            src={icon || ''}
            alt={name}
            width={48}
            height={48}
            className='mb-2'
          />
          <h3 className='text-lg font-semibold mb-1'>{name}</h3>
        </div>
        <p className='text-sm text-gray-600 mb-2'>{desc}</p>
        <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded absolute bottom-2 right-2'>
          {category}
        </span>
        <p className='text-xs text-gray-500 mt-2'>만든이: {userEmail}</p>
      </div>
    </Link>
  )
}

export default TemplateCard
