import React, { useEffect, useState } from 'react'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { addEnhancementCard, editEnhancementCard, getEnhancementCard } from '../../../Api/enhancements'
import { uploadFile } from '../../../Api/files'
import { CgSpinner } from 'react-icons/cg'
import { v4 as uuidv4 } from 'uuid'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { toast } from 'react-toastify'

import 'swiper/css'
import 'swiper/css/pagination'
import { useRouter } from 'next/router'


const EditEnhancementCard = ({ id, entityId }) => {
  const router = useRouter()

  const [imageArray, setImageArray] = useState([])
  const [loading, setLoading] = useState(false)

  const [topic, setTopic] = useState('')
  const [desc, setDesc] = useState('')


  useEffect(() => {
    if (id) {
      fetchEnhancementCard()
    }
  }, [id])


  const fetchEnhancementCard = async () => {
    if (id) {
      getEnhancementCard(id)
        .then((res) => {
          setTopic(res.enhancementCard.topic)
          setDesc(res.enhancementCard.description)
          setImageArray(res.enhancementCard.imageArray)
        })
    }
  }

  const handleAddEnhancementCard = () => {
    editEnhancementCard(id, 'animal', entityId, topic, desc, imageArray)
      .then(async (res) => {
        await router.push({
          pathname: '/animals/singleanimalentity',
          query: { id: entityId },
        })

      }).catch(() => {
      toast.error('Error editing enhancement card. Please try again later.')
    })
  }


  const handleImageUpload = (imageFileArray) => {
    setLoading(true)

    if (imageFileArray.length > 4) {
      toast.info('You can only upload 4 images at a time')
      setLoading(false)
      return
    }

    for (let i = 0; i < imageFileArray.length; i++) {
      uploadFile(imageFileArray[i], 'enhancement')
        .then((fileUrl) => {
          if (imageArray.length + i < 8) {
            setImageArray((prevState) => [...prevState, {
              id: uuidv4(),
              url: fileUrl,
            }])
            if (i === imageFileArray.length - 1) {
              setLoading(false)
              toast.success(`Image${imageFileArray.length > 1 ? 's' : ''} uploaded successfully`)
            }
          } else {
            toast.info('You can only upload 8 images')
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
          toast.error('Error uploading image. Please try again.')
          setLoading(false)
        })

    }
  }


  const handleDeleteImage = (imageId) => {
    setImageArray((prevState) => {
      return prevState.filter((image) => image.id !== imageId)
    })
  }

  return (
    <div>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='md:col-span-1'>
          <div className='px-4 sm:px-0'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Edit Enhancement Card
            </h3>
            <p className='mt-1 text-sm text-gray-600'>
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>
        </div>
        <div className='mt-5 md:col-span-2 md:mt-0'>
          <div>
            <div className='shadow sm:overflow-hidden sm:rounded-md'>
              <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-3'>
                    <label htmlFor='enhancement-id' className='block text-sm font-medium text-gray-700'>
                      Enhancement Card Name
                    </label>
                    <input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      type='text'
                      name='enhancement-id'
                      id='enhancement-id'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                      placeholder='eg: Do you know ...'
                    />
                  </div>
                </div>

                <div className={`grid grid-cols-3 gap-6`}>
                  <div className='col-span-3'>
                    <label htmlFor='about' className='block text-sm font-medium text-gray-700'>
                      Write about it
                    </label>
                    <div className='mt-1'>
                      <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        id='about'
                        name='about'
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                        placeholder='... that the lion is the only cat that can roar?'
                      />
                    </div>
                    <p className='mt-2 text-sm text-gray-500'>
                      Brief description of the enhancement.
                    </p></div>
                </div>

                {imageArray.length < 8 && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>Pictures to Show</label>
                    <Dropzone onDrop={handleImageUpload} accept={IMAGE_MIME_TYPE}
                              disabled={loading} multiple={true}
                              className='mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
                      <div className='space-y-1 text-center'>
                        {loading ? (
                          <div>
                            <CgSpinner className={`h-20 w-20 opacity-70 animate-spin`} />
                          </div>
                        ) : (
                          <div>
                            <svg
                              className='mx-auto h-12 w-12 text-gray-400'
                              stroke='currentColor'
                              fill='none'
                              viewBox='0 0 48 48'
                              aria-hidden='true'
                            >
                              <path
                                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                strokeWidth={2}
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>
                            <div className='flex text-sm text-gray-600'>
                              <label
                                htmlFor='file-upload'
                                className='relative cursor-pointer rounded-md  font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500'
                              >
                                <span>Upload a file</span>
                                <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                              </label>
                              <p className='pl-1'>or drag and drop</p>
                            </div>
                            <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
                          </div>
                        )}
                      </div>
                    </Dropzone>
                  </div>
                )}
                <div className={``}>
                  <Swiper
                    centeredSlides={true}
                    spaceBetween={30}
                    pagination={{
                      clickable: true,
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className='mySwiper '
                    draggable={true}
                  >
                    {imageArray.map((image) => (
                      <SwiperSlide key={image.id}>
                        <div className={`mb-10`}>
                          <img src={image.url} alt='image' height={200} className={`max-h-40`} />
                          <div className={`  w-full p-2`}>
                            <button
                              type='button'
                              className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                              onClick={() => handleDeleteImage(image.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 text-right sm:px-6'>
                <button
                  disabled={loading}
                  onClick={handleAddEnhancementCard}
                  type='button'
                  className={`inline-flex justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
                >
                  {loading ? (
                    <div className={`flex flex-row items-center justify-items-center space-y-4`}>
                      <CgSpinner className={`h-4 w-4 opacity-70 animate-spin mr-2`} />
                      Save Changes
                    </div>
                  ) : (
                    'Save Changes')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditEnhancementCard
