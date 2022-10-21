import React, { useEffect, useState } from 'react'
import BasicPageWrapper from '../components/layouts/BasicPageWrapper'
import { getTrophies } from '../Api/trophies'
import { useLocalStorage } from '@mantine/hooks'

const Index = () => {
  const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
  ]

  const [trophies, setTrophies] = useState([])
  useEffect(() => {
    getTrophies()
      .then(res => {
        setTrophies(res)
      })
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBhMTkzMWE5NzQ1ZWViNzIzMDVkZDQiLCJpYXQiOjE2NjYyNTkwNjUsImV4cCI6MTY2Njg2Mzg2NX0.Q4smHqAnmwyr0_ZdVzqrtK-3R5CiBQtgAxSde2Kpf_4');
  },[])

  return (
    <BasicPageWrapper>
      <div className='px-4 sm:px-6 lg:px-8'>
        <div className='sm:flex sm:items-center'>
          <div className='sm:flex-auto'>
            <h1 className='text-xl font-semibold text-gray-900'>Leaderboard</h1>
            <p className='mt-2 text-sm text-gray-700'>
              A list of District Trophies
            </p>
          </div>

        </div>
        <div className='mt-8 flex flex-col'>
          <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
              <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-300'>
                  <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'>
                      Place
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      District
                    </th>
                    <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'>
                      Trophy count
                    </th>

                  </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200 bg-white'>
                  {trophies.map((district, index) => (
                    <tr key={index}>
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {index + 1}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{district.district}</td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>{district.trophyCount}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasicPageWrapper>
  )
}

export default Index
