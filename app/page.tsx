import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-slate-500 to-slate-800 text-white'>
      <main className='text-center  animate-pulse flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold mb-4'>
          AI 프롬프트 테스트 & LLM 비교
        </h1>
        <p className='text-xl mb-8'>다양한 AI 모델을 테스트하고 비교해보세요</p>
        <p className='text-xl mb-8'>메인 개발을 위한 테스트 페이지입니다.</p>
        <Image
          src='/landing.webp'
          alt='AI Illustration'
          width={300}
          height={300}
          className='mb-8 rounded-xl'
        />
        <div className='flex items-center justify-center space-x-4'>
          <ArrowRightCircle className='w-10 h-10' />
          <Link
            href='/dashboard'
            className='bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-6 text-2xl rounded'
          >
            시작하기
          </Link>
          <ArrowLeftCircle className='w-10 h-10' />
        </div>
      </main>
      <footer className='mt-8 text-sm text-gray-500'>
        © 2024 AI 테스트 플랫폼
      </footer>
    </div>
  )
}
