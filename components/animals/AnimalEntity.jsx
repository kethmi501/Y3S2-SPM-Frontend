import React from 'react'
import Image from 'next/image'
import { GiUpgrade } from 'react-icons/gi'
import { TiExport } from 'react-icons/ti'
import { AiOutlineEdit } from 'react-icons/ai'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const animalWeight = [
  { id: 1, maleWeight: "160kg", femaleWeight: "130kg" },
]

const animalHeight = [
  { id: 1, maleHeight: "1.2m", femaleHeight: "90cm" },
]


const AnimalEntity = () => {
  return (
    <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-4'>
        <Image src={'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600'} width={400} height={540} className='rows-span-2 md:cols-span-1 object-cover rounded-lg shadow-lg' />
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col gap-0.5 items-center'>
              <h1 className='text-4xl font-bold text-gray-800 uppercase'>Lion</h1>
              <h3 className='text-lg font-bold text-gray-500 capitalize'>Panthera leo</h3>
            </div>
            <div className='flex flex-col gap-2 items-start'>
              <button type='button' className='inline-flex gap-2 items-center px-4 py-2 bg-green-400 hover:bg-green-300 border border-green-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-green-400'>
                <GiUpgrade className='text-gray-800' />
                Enhance
              </button>
              <button type='button' className='inline-flex gap-2 items-center px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-blue-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'>
                <TiExport className='text-gray-800' />
                Export Report
              </button>
            </div>
          </div>
          <div className='px-3 py-6 border-2 border-gray-900 bg-green-50'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae quas fugiat excepturi facere ab ducimus nihil ratione, veritatis eius sint voluptatem, facilis magnam ipsum nesciunt minus odit iure saepe minima deleniti! Sequi saepe qui quos, ad magni ex nam quisquam iure quaerat facere veritatis aspernatur exercitationem ipsam porro soluta in.
          </div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 bg-gray-50">
                    <thead>
                      <tr className="bg-gray-50">
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Measurements
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Adult Male Animal
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                          Adult Female Animal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {animalWeight.map((data) => {
                        return <tr key={data.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Average Weight
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{data.maleWeight}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{data.femaleWeight}</td>
                        </tr>
                      })}
                      {animalHeight.map((data) => {
                        return <tr key={data.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            Average Height
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{data.maleHeight}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">{data.femaleHeight}</td>
                        </tr>
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='my-6 flex flex-row flex-wrap gap-1.5 items-center'>
        <div className="px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl">Meat</div>
        <div className="px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl">Meat</div>
        <div className="px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl">Four Legs</div>
      </div>
      <div className='flex justify-start gap-3'>
        <button type='button' className='inline-flex gap-2 items-center px-4 py-2 bg-blue-400 hover:bg-blue-300 border border-blue-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-blue-400'>
          <AiOutlineEdit className='text-gray-800' />
          Edit Content
        </button>
        <button type='button' className='inline-flex gap-2 items-center px-4 py-2 bg-red-400 hover:bg-red-300 border border-red-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-red-400'>
          <RiDeleteBin5Fill className='text-gray-800' />
          Delete
        </button>

      </div>
    </div>
  )
}

export default AnimalEntity