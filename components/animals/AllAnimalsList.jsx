import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getAnimalsData } from '../../Api/animal'

const AllAnimalsList = () => {
    const [animalsList, setAnimalsList] = useState([])
    const router = useRouter()


    useEffect(() => {
        if (router.pathname){
            getAnimalsData().then(res => {
                setAnimalsList(res)
            })
        }
    }, [])


    return (
        <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {animalsList.length > 0 && animalsList.map((animal) => (
                    <li key={animal._id}
                        onClick={() => router.push({
                            pathname: '/animals/singleanimalentity',
                            query: { id: animal._id }
                        })}
                        className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-green-500 overflow-hidden">
                            <img src={animal.imageArray[0].url} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                            <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {animal.nameInput}</span>
                            </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-center text-gray-900 truncate pointer-events-none">{animal.nameInput}</p>
                        <p className="mt-2 block text-sm font-medium text-center text-gray-900 truncate pointer-events-none">{animal.nameInput}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllAnimalsList
