import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AllAnimalsList = () => {
    const [files, setFiles] = useState([])

    const getAnimalsData = async () => {
        await axios.get('http://localhost:8000/api/animal/fetchAnimalList').then((result) => {
            console.log(result.data.animalsList)
            setFiles(result.data.animalsList)
        }).catch((err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        getAnimalsData();
    }, [])


    return (
        <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {files.length > 0 && files.map((file) => (
                    <li key={file._id} className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-green-500 overflow-hidden">
                            <img src={'https://images.pexels.com/photos/572861/pexels-photo-572861.jpeg?cs=srgb&dl=pexels-richard-verbeek-572861.jpg&fm=jpg'} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                            <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {file.nameInput}</span>
                            </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-center text-gray-900 truncate pointer-events-none">{file.nameInput}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AllAnimalsList