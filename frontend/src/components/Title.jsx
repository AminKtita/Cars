import React from 'react'

export const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-2'>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-red-700'></p>
        <p className='text-red-500 '>{text1} <span className='text-red-700 font-medium'>{text2}</span></p>        
    </div>
  )
}
