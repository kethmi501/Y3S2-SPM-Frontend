import React, { useState } from 'react'
import Image from 'next/image'

const AddAnimal = () => {
    const [nameInput, setNameInput] = useState("");
    const [scientificNameInput, setScientificNameInput] = useState("")
    const [tagInput, setTagInput] = useState([])
    const [typing, setTyping] = useState("")

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && typing !== '') {
            setTagInput([...tagInput, e.target.value])
            setTyping('')
        }
    }

    return (
        <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
            <div className='flex flex-col lg:flex-row w-full gap-5 md:gap-4'>
                <Image src={'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=600'} width={500} height={540} className='rows-span-2 md:cols-span-1 object-cover rounded-lg shadow-lg' />

                <div className='pt-2 md:pt-8 w-full'>
                    <div className='flex flex-col gap-4 items-center'>
                        <input onChange={(e) => { setNameInput(e.target.value) }} type="text" value={nameInput} name="animal-name" id="animal-name" className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300' placeholder='Name' />
                        <input onChange={(e) => { setScientificNameInput(e.target.value) }} type="text" name="animal-scientific-name" value={scientificNameInput} id="animal-scientific-name" className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300' placeholder='Scientific Name' />
                        <div className='flex flex-col gap-2 w-full'>
                            <label htmlFor="tags" className='text-base font-semibold text-gray-800 capitalize'>Tags to search:</label>
                            <input tabIndex={0} onChange={(e) => { setTyping(e.target.value) }} value={typing} onKeyDown={handleKeyDown} type="text" name="tags" id="tags" className='px-4 py-2 w-full text-sm border-b-2 focus:outline-none focus:border-green-300' />
                            <div className='flex flex-row flex-wrap gap-1.5 items-center'>
                                {tagInput.map((tag, index) => {
                                    return (
                                        <div key={index} className="px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl">{tag}</div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-10 md:py-20 flex flex-col gap-3'>
                <label htmlFor="description" className='text-base font-semibold text-gray-800 capitalize'>Description:</label>
                <textarea className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300'/>
            </div>
        </div>
    )
}

export default AddAnimal