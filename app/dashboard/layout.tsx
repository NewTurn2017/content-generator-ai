'use client'

import React, { useState } from 'react'
import SideNavbar from './_components/SideNavbar'
import Header from './_components/Header'
import { TotalUsageContext } from '../(context)/TotalUsageContext'
import { Toaster } from '@/components/ui/sonner'
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext'

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [totalUsage, setTotalUsage] = useState<Number>(0)
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>()
  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      <UpdateCreditUsageContext.Provider
        value={{ updateCreditUsage, setUpdateCreditUsage }}
      >
        <div className='font-mango bg-slate-100 h-screen'>
          <div className='md:w-64 hidden md:block fixed'>
            <SideNavbar />
          </div>

          <div className='md:ml-64'>
            <Toaster />

            <Header />
            {children}
          </div>
        </div>
      </UpdateCreditUsageContext.Provider>
    </TotalUsageContext.Provider>
  )
}

export default DashboardLayout
