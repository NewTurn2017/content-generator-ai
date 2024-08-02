'use client'

import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  selectedTemplate: TEMPLATE | undefined
  userFormInput: (formData: any) => void
  loading: boolean
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: Props) => {
  const [formData, setFormData] = useState<any>({})

  if (!selectedTemplate) {
    return <div>템플릿을 찾을 수 없습니다</div>
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    userFormInput(formData)
  }

  const handleInputChange = (name: string, value: string | string[]) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className='p-5 shadow-md border rounded-lg bg-white'>
      <Image
        src={selectedTemplate?.icon}
        alt={selectedTemplate?.name}
        width={50}
        height={50}
      />
      <h2 className='text-2xl font-bold mb-2 text-primary'>
        {selectedTemplate?.name}
      </h2>
      <p className='text-sm text-gray-500'>{selectedTemplate?.desc}</p>
      <form className='mt-6' onSubmit={handleSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
            <label className='font-bold'>{item.label}</label>
            {item.field === 'input' && (
              <Input
                name={item.name}
                required={item?.required}
                onChange={(e) => handleInputChange(item.name, e.target.value)}
              />
            )}
            {item.field === 'textarea' && (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={(e) => handleInputChange(item.name, e.target.value)}
              />
            )}
            {item.field === 'select' && (
              <Select
                onValueChange={(value) => handleInputChange(item.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder='선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  {item.options?.map((option, optionIndex) => (
                    <SelectItem key={optionIndex} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {item.field === 'multiSelect' && (
              <div className='flex flex-wrap gap-2'>
                {item.options?.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className='flex items-center space-x-2'
                  >
                    <Checkbox
                      id={`${item.name}-${optionIndex}`}
                      onCheckedChange={(checked) => {
                        const currentValues = formData[item.name] || []
                        if (checked) {
                          handleInputChange(item.name, [
                            ...currentValues,
                            option,
                          ])
                        } else {
                          handleInputChange(
                            item.name,
                            currentValues.filter((v: string) => v !== option)
                          )
                        }
                      }}
                    />
                    <label htmlFor={`${item.name}-${optionIndex}`}>
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button className='w-full py-6' type='submit' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          컨텐츠 생성
        </Button>
      </form>
    </div>
  )
}

export default FormSection
