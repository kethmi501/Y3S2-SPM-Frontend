import React from 'react'
import { useRouter } from 'next/router'

const AnimalHeader = () => {
  const router = useRouter()

  return (
    <div className='md:flex md:items-center md:justify-between p-20 pb-0'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          Animal List
        </h2>
      </div>
      <div className='mt-4 flex md:mt-0 md:ml-4'>
        <button
          onClick={() => router.push('/animals/addsingleanimal')}
          type='button'
          className='ml-3 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        >
          Add new
        </button>
      </div>
    </div>
  )
}

export default AnimalHeader
