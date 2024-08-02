'use client'

import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { HISTORY } from '@/utils/types'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useContext, useEffect, useState } from 'react'

export const TOKEN_LIMIT = 100000

const UsageTrack = () => {
  const { user } = useUser()
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
  const [remainingCredits, setRemainingCredits] = useState<number>(TOKEN_LIMIT)
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  )

  useEffect(() => {
    user && getData()
  }, [updateCreditUsage && user])

  useEffect(() => {
    setRemainingCredits(Math.max(TOKEN_LIMIT - (totalUsage as number), 0))
  }, [totalUsage])

  const getTotalUsage = (result: HISTORY[]) => {
    let total: number = 0
    result.forEach((element) => {
      total = total + Number(element.aiResponse?.length)
    })
    setTotalUsage(total)
  }

  const getData = async () => {
    const result = await db
      .select()
      .from(AIOutput)
      .where(
        eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress ?? '')
      )
    getTotalUsage(result as HISTORY[])
  }

  useEffect(() => {
    user && getData()
  }, [user])

  return (
    <div className='m-5'>
      <div className='bg-primary text-white rounded-lg p-3'>
        <h2>크레딧</h2>
        <div className='h-2 bg-slate-500 w-full mt-3 rounded-full'>
          <div
            className='h-2 bg-white rounded-full'
            style={{ width: `${(remainingCredits / TOKEN_LIMIT) * 100}%` }}
          />
        </div>
        <h2 className='text-sm my-2'>{remainingCredits} 크레딧 남음</h2>
      </div>
    </div>
  )
}

export default UsageTrack
