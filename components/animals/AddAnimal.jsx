import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ImCancelCircle } from 'react-icons/im'
import { HiSaveAs } from 'react-icons/hi'
import SpecificInfoAnimal from './SpecificInfoAnimal'
import { toast } from 'react-toastify'
import axios from 'axios'
import { addAnimal } from '../../Api/animal'
import { useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { uploadFile } from '../../Api/files'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'

const AddAnimal = () => {
  const router = useRouter()

  const [imageArray, setImageArray] = useState([])
  const [imageObjArray, setImageObjArray] = useState([])
  const [nameInput, setNameInput] = useState('')
  const [scientificNameInput, setScientificNameInput] = useState('')
  const [tagInput, setTagInput] = useState([])
  const [typing, setTyping] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')


  const [avgMaleWeightInput, setAvgMaleWeightInput] = useState('')
  const [avgFemaleWeightInput, setAvgFemaleWeightInput] = useState('')
  const [avgMaleHeightInput, setAvgMaleHeightInput] = useState('')
  const [avgFemaleHeightInput, setAvgFemaleHeightInput] = useState('')
  const [kingdomOfAnimal, setKingdomOfAnimal] = useState('')
  const [phylumOfAnimal, setPhylumOfAnimal] = useState('')
  const [classOfAnimal, setClassOfAnimal] = useState('')
  const [orderOfAnimal, setOrderOfAnimal] = useState('')
  const [familyOfAnimal, setFamilyOfAnimal] = useState('')
  const [genusOfAnimal, setGenusOfAnimal] = useState('')
  const [speciesOfAnimal, setSpeciesOfAnimal] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && typing.trim() !== '') {
      setTagInput([...tagInput, {
        name: e.target.value.toString().trim(),
        hidden: false,
      }])
      setTyping('')
    }
  }

  const handleSubmitAnimal = async () => {
    if (nameInput === '' || scientificNameInput === '' || tagInput.length === 0 || descriptionInput === '' || avgMaleWeightInput === '' || avgFemaleWeightInput === '' || avgMaleHeightInput === '' || avgFemaleHeightInput === '' || kingdomOfAnimal === '' || phylumOfAnimal === '' || classOfAnimal === '' || orderOfAnimal === '' || familyOfAnimal === '' || genusOfAnimal === '' || speciesOfAnimal === '') {
      toast.error('Please fill all fields')
      return
    }


    handleImageUpload()
      .then((imageArray) => {

        addAnimal({
          nameInput,
          scientificNameInput,
          tagInput,
          descriptionInput,
          avgMaleWeightInput,
          avgFemaleWeightInput,
          avgMaleHeightInput,
          avgFemaleHeightInput,
          kingdomOfAnimal,
          phylumOfAnimal,
          classOfAnimal,
          orderOfAnimal,
          familyOfAnimal,
          genusOfAnimal,
          speciesOfAnimal,
          imageArray : imageArray.map((image , index) => {
            return {
              url : image,
              index : index
            }
          }),
        }).then(message => {
          toast.success(message)
          router.push('/animals/')
        }).catch(err => {
          toast.error(err)
        })
      })

  }


  const handleImageUpload = async () => {
    const imageUrlArray = []

    if (imageArray.length > 0) {
      for (let i = 0; i < imageArray.length; i++) {
        await uploadFile(imageArray[i] , 'animals')
          .then((res) => {
            imageUrlArray.push(res)
          })
      }
    }

    return imageUrlArray
  }

  const handleImageSelection = async (e) => {
    setImageArray(() => {
      return [...imageArray, ...e]
    })

    setImageObjArray(() => {
      return [...imageObjArray, ...e.map((file) => URL.createObjectURL(file))]
    })

}

const handleImageRemoval = (e) => {
  setImageArray(() => {
    return imageArray.filter((file) => file !== e)
  })

  setImageObjArray(() => {
    return imageObjArray.filter((file) => file !== e)
  })
}


return (
  <div className='px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-10 lg:py-20 bg-white'>
    <div className='flex flex-col lg:flex-row w-full gap-5 lg:gap-4'>
      <div className={`max-w-min`}>
        <Dropzone onDrop={handleImageSelection} accept={IMAGE_MIME_TYPE}>
          <div className='w-80 h-80 rounded-lg bg-gray-100 flex items-center justify-center'>
            Select an image to show
          </div>
        </Dropzone>
        <div className={`grid grid-cols-4 m-2 gap-1`}>
          {imageObjArray.map((file, index) => {
            return (
              <div onClick={() => {
                handleImageRemoval(file)
              }} key={file} className={`hover:scale-110 `}>
                <img src={file} alt={index.toString()} />
              </div>
            )
          })}
        </div>
      </div>
      <div className='pt-2 md:pt-8 w-full'>
        <div className='flex flex-col gap-4 items-center'>
          <input onChange={(e) => {
            setNameInput(e.target.value)
          }} type='text' value={nameInput} name='animal-name' id='animal-name'
                 className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300'
                 placeholder='Name' />
          <input onChange={(e) => {
            setScientificNameInput(e.target.value)
          }} type='text' name='animal-scientific-name' value={scientificNameInput} id='animal-scientific-name'
                 className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300'
                 placeholder='Scientific Name' />
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor='tags' className='text-base font-bold text-gray-800 capitalize'>Tags to search:</label>
            <input tabIndex={0} onChange={(e) => {
              setTyping(e.target.value)
            }} value={typing} onKeyDown={handleKeyDown} type='text' name='tags' id='tags'
                   className='px-4 py-2 w-full text-sm border-b-2 focus:outline-none focus:border-green-300' />
            <div className='flex flex-row flex-wrap gap-1.5 items-center'>
              {tagInput.map((tag, index) => {
                return (
                  <div key={index}
                       className='px-5 py-0.5 border border-blue-300 shadow-inner rounded-2xl'>{tag.name}</div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='pt-10 pb-5 md:pt-20 md:pb-10 flex flex-col gap-3'>
      <label htmlFor='description' className='text-base font-bold text-gray-800 capitalize'>Description:</label>
      <textarea onChange={(e) => {
        setDescriptionInput(e.target.value)
      }} value={descriptionInput} rows={5}
                className='px-4 py-2 w-full text-sm border-2 border-gray-300 rounded-xl shadow-md focus:outline-none focus:border-green-300' />
    </div>
    <div className='py-6 md:py-12 flex flex-col gap-3'>
      <SpecificInfoAnimal
        avgMaleWeightInput={avgMaleWeightInput} setAvgMaleWeightInput={setAvgMaleWeightInput}
        avgFemaleWeightInput={avgFemaleWeightInput} setAvgFemaleWeightInput={setAvgFemaleWeightInput}
        avgMaleHeightInput={avgMaleHeightInput} setAvgMaleHeightInput={setAvgMaleHeightInput}
        avgFemaleHeightInput={avgFemaleHeightInput} setAvgFemaleHeightInput={setAvgFemaleHeightInput}
        kingdomOfAnimal={kingdomOfAnimal} setKingdomOfAnimal={setKingdomOfAnimal}
        phylumOfAnimal={phylumOfAnimal} setPhylumOfAnimal={setPhylumOfAnimal}
        classOfAnimal={classOfAnimal} setClassOfAnimal={setClassOfAnimal}
        orderOfAnimal={orderOfAnimal} setOrderOfAnimal={setOrderOfAnimal}
        familyOfAnimal={familyOfAnimal} setFamilyOfAnimal={setFamilyOfAnimal}
        genusOfAnimal={genusOfAnimal} setGenusOfAnimal={setGenusOfAnimal}
        speciesOfAnimal={speciesOfAnimal} setSpeciesOfAnimal={setSpeciesOfAnimal}
      />
    </div>
    <div className='flex justify-end gap-3'>
      <button type='button'
              className='inline-flex gap-2 items-center px-4 py-2 bg-red-400 hover:bg-red-300 border border-red-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-red-400'>
        <ImCancelCircle className='text-gray-800' />
        Cancel
      </button>
      <button
        onClick={handleSubmitAnimal}
        type='button'
        className='inline-flex gap-2 items-center px-4 py-2 bg-green-400 hover:bg-green-300 border border-green-400 font-semibold text-gray-800 capitalize rounded-lg shadow-md focus:ring-2 focus:ring-offset-1 focus:ring-green-400'>
        <HiSaveAs className='text-gray-800' />
        Submit
      </button>
    </div>
  </div>
)
}

export default AddAnimal
