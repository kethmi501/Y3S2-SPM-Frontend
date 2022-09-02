import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GiUpgrade } from 'react-icons/gi'
import { TiExport } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { HiArrowSmUp, HiArrowSmDown } from 'react-icons/hi'
import AnimalImageList from './AnimalImageList'
import { deleteAnimal } from '../../Api/animal'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const AnimalEntity = ({ animalData }) => {
  const router = useRouter()

  const animalDataArr = [
    { id: '0fd9083e-b404-42ab-801c-4d60a9ae1665', category: 'Kingdom', value: animalData.kingdomOfAnimal },
    { id: '65319bd5-35a9-4f5d-a6c3-7a0386f6ed7a', category: 'Phylum', value: animalData.phylumOfAnimal },
    { id: 'bc26380a-25f4-48f7-b527-21e1e4c143b5', category: 'Class', value: animalData.classOfAnimal },
    { id: '147de217-1b17-4515-b60d-aaa3789a94d9', category: 'Order', value: animalData.orderOfAnimal },
    { id: '001e8bff-3910-4ecc-a7a0-d740f2fbd1b2', category: 'Family', value: animalData.familyOfAnimal },
    { id: 'abe7dcba-08c1-4c4e-a992-651531a1b45a', category: 'Genus', value: animalData.genusOfAnimal },
    { id: 'fc091748-b026-4724-86a2-4862d3d9b7f8', category: 'Species', value: animalData.speciesOfAnimal },
  ]

  const [tags, setTags] = useState([])

  useEffect(() => {
    if (animalData) {
      if (animalData.tagInput) {
        setTags(animalData.tagInput.map((tag, index) => {
          return {
            id: index,
            name: tag.name,
            hidden: tag.hidden,
          }
        }))
      }
    }
  }, [animalData.tagInput])


  const deleteAnimalHandler = () => {
    deleteAnimal(animalData._id).then(() => {
      router.push('/animals/animalslist')
    })
  }


  return (
    <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-4'>
        <Image priority={true}
               src={'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600'}
               width={400} height={540} className='rows-span-2 md:cols-span-1 object-cover rounded-lg shadow-lg' />
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-0.5 items-center'>
              <h1 className='text-4xl font-bold text-gray-800 uppercase'>{animalData.nameInput}</h1>
              <h3 className='text-lg font-bold text-gray-500 capitalize'>{animalData.scientificNameInput}</h3>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <button type='button'
                      className='inline-flex gap-2 items-center px-4 py-2 bg-green-400 hover:bg-green-300 border border-green-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-green-400'>
                <GiUpgrade className='text-gray-800' />
                Enhance
              </button>
              <button type='button'
                      className='inline-flex gap-2 items-center px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-blue-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'>
                <TiExport className='text-gray-800' />
                Export Report
              </button>
            </div>
          </div>
          <div className='px-3 py-6 border-2 border-gray-900 bg-green-50'>
            {animalData.descriptionInput}
          </div>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300 bg-gray-50'>
                    <thead>
                    <tr className='bg-gray-50'>
                      <th scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                        Measurements
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                        Adult Male Animal
                      </th>
                      <th scope='col' className='px-3 py-3.5 text-center text-sm font-semibold text-gray-900'>
                        Adult Female Animal
                      </th>
                    </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                    <tr>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        Average Weight
                      </td>
                      <td
                        className='whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500'>{animalData.avgMaleHeightInput}</td>
                      <td
                        className='whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500'>{animalData.avgMaleWeightInput}</td>
                    </tr>
                    <tr>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        Average Height
                      </td>
                      <td
                        className='whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500'>{animalData.avgFemaleHeightInput}</td>
                      <td
                        className='whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500'>{animalData.avgFemaleWeightInput}</td>
                    </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 lg:mt-4 flex flex-col lg:flex-row-reverse gap-4'>
        <div className='lg:w-1/2'>
          <h3 className='text-2xl font-bold text-gray-800 capitalize'>Categories</h3>
          <div className='mt-5 grid grid-cols-1 outline-none rounded-lg bg-white md:grid-cols-2 gap-1.5 lg:gap-3'>
            {animalDataArr.map((data, idx) => (
              <div key={idx}
                   className=' flex flex-row items-center gap-5 lg:gap-2 px-4 py-5 sm:p-6 border border-gray-200 hover:border-green-400 hover:shadow-lg'>
                <div className='text-xl lg:text-lg font-semibold text-blue-600'>{data.category}</div>
                <div className='flex items-baseline text-sm lg:text-xs font-semibold text-gray-600'>
                  {data.value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='lg:w-1/2'>
          <div className='my-6 flex flex-row flex-wrap gap-1.5 items-center'>
            {tags.map((tag) => {
              return <div key={tag.id}
                          className={`px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl capitalize hover:shadow-lg ${tag.hidden && 'hidden'}`}>{tag.name}</div>
            })}
          </div>
          <div className='flex justify-start gap-3'>
            <button
              onClick={() => {
                return router.push({
                  pathname: '/animals/editsingleanimal',
                  query: {
                    id: animalData._id,
                  },
                })
              }}
              type='button'
              className='inline-flex gap-2 items-center px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-blue-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'>
              <AiOutlineEdit className='text-gray-800' />
              Edit Content
            </button>
            <button
              onClick={deleteAnimalHandler}
              type='button'
              className='inline-flex gap-2 items-center px-4 py-2 bg-red-400 hover:bg-red-300 border border-red-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-red-400'>
              <RiDeleteBin5Fill className='text-gray-800' />
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className='my-8'>
        <AnimalImageList />
      </div>
    </div>
  )
}

export default AnimalEntity
