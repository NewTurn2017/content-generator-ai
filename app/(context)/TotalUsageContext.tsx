import { createContext } from 'react'

export const TotalUsageContext = createContext<{
  totalUsage: Number
  setTotalUsage: React.Dispatch<React.SetStateAction<Number>>
}>({
  totalUsage: 0,
  setTotalUsage: () => {},
})
