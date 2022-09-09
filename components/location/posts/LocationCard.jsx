import React from 'react'

const LocationCard = ({ location, src }) => {
  return (
    <div className='p-2'>
      <a
        href='#'
        className='flex flex-col items-center bg-gray-600 rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 h-full w-[400px]'
      >
        <img
          className='w-full h-36 rounded-t-lg md:h-56 md:w-60 md:rounded-none md:rounded-l-lg object-none object-center'
          src={src}
          alt=''
        />
        <div className='flex flex-col  p-4 leading-normal h-full'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'></h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'></p>
          <div className='flex space-x-2 text'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6 text-orange-300'
            >
              <path
                fillRule='evenodd'
                d='M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z'
                clipRule='evenodd'
              />
            </svg>
            {location &&
              <span className='text-gray-400'>{location}</span>
            }
          </div>
        </div>
      </a>
    </div>
  )
}

export default LocationCard
