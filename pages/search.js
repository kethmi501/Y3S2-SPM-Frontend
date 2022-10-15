import React, { useEffect, useState } from 'react'
import BasicPageWrapper from '../components/layouts/BasicPageWrapper'
import { useRouter } from 'next/router'
import { searchEntities } from '../Api/search'
import { FaDog } from 'react-icons/fa'
import { BsTreeFill } from 'react-icons/bs'
import { ImLocation } from 'react-icons/im'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Search = () => {
  const router = useRouter()
  const { search } = router.query

  const [animalResults, setAnimalResults] = useState([])
  const [treeResults, setTreeResults] = useState([])
  const [LocationResults, setLocationResults] = useState([])

  useEffect(() => {
    if (search.trim() !== '') {
      setAnimalResults([])
      setTreeResults([])
      setLocationResults([])

      searchEntities(search)
        .then((res) => {
          setAnimalResults(res.animalResults)
          setTreeResults(res.treeResults)
          setLocationResults(res.LocationResults)
        })
    }

  }, [router.query])


  return (
    <BasicPageWrapper>
      <div className='md:flex md:items-center md:justify-between p-20 pb-0'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Search Results
          </h2>
        </div>
      </div>
      <div className=' p-20 pb-0'>
        <ul role='list' className='m-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {animalResults.map((singleAnimal) => (
            <li
              onClick={() => router.push({
                pathname: '/animals/singleanimalentity',
                query: { id: singleAnimal._id },
              })}
              key={singleAnimal._id} className='cursor-pointer col-span-1 flex shadow-sm rounded-md hover:shadow-md'>
              <div
                className={classNames(
                  'bg-blue-400',
                  'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
                )}
              >
                <FaDog className={`h-4 w-4`} />
              </div>
              <div
                className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
                <div className='flex-1 px-4 py-2 text-sm truncate'>
                  <a
                    className='text-gray-900 font-medium hover:text-gray-600'>
                    {singleAnimal.nameInput}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr className={`${animalResults.length === 0 ? 'hidden' : 'my-5'} `} />

        <ul role='list' className='m-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {treeResults.map((singleTree) => (
            <li
              onClick={() => router.push({
                pathname: '/trees/tree',
                query: { postId: singleTree._id },
              })}
              key={singleTree._id} className='col-span-1 flex shadow-sm rounded-md'>
              <div
                className={classNames(
                  'bg-sky-400',
                  'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
                )}
              >
                <BsTreeFill className={`h-4 w-4`} />
              </div>
              <div
                className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
                <div className='flex-1 px-4 py-2 text-sm truncate'>
                  <a className='text-gray-900 font-medium hover:text-gray-600'>
                    {singleTree.name}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr className={`${treeResults.length === 0 ? 'hidden' : 'my-5'}`} />

        <ul role='list' className='m-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {LocationResults.map((singleLocation) => (
            <li
              onClick={() => router.push({
                pathname: '/locations/location',
                query: { locationId: singleLocation._id },
              })}
              key={singleLocation._id} className='col-span-1 flex shadow-sm rounded-md'>
              <div
                className={classNames(
                  'bg-indigo-400',
                  'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md',
                )}
              >
                <ImLocation className={`h-4 w-4`} />
              </div>
              <div
                className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
                <div className='flex-1 px-4 py-2 text-sm truncate'>
                  <a className='text-gray-900 font-medium hover:text-gray-600'>
                    {singleLocation.address}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr className={`${LocationResults.length === 0 ? 'hidden' : 'my-5'}`} />
      </div>

    </BasicPageWrapper>

  )
}

export default Search