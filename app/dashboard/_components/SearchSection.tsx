import { Search } from 'lucide-react'
import React from 'react'

const SearchSection = ({
  onSearchInput,
}: {
  onSearchInput: (value: string) => void
}) => {
  return (
    <div className='p-10 bg-gradient-to-br from-neutral-400 via-neutral-500 to-gray-500 flex flex-col justify-center items-center text-white'>
      <h2 className='text-3xl font-bold'>AI 글쓰기 도구 검색</h2>
      <p>오늘 무엇을 만들어 볼까요?</p>
      <div className='w-full flex justify-center items-center'>
        <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]'>
          <Search className='text-primary' />
          <input
            type='text'
            placeholder='AI 도구를 검색하세요'
            onChange={(e) => onSearchInput(e.target.value)}
            className='bg-transparent w-full outline-none text-black'
          />
        </div>
      </div>
    </div>
  )
}

export default SearchSection
