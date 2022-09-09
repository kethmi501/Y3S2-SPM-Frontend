import React, { useEffect, useState } from 'react'
import EnhancementCardWrapper from '../../layouts/EnhancementCardWrapper'
import ReportModal from './ReportModal'
import { reportCard } from '../../../Api/enhancements'
import { router } from 'next/client'


const VisualCard = ({ data }) => {
  const [entity, setEntity] = useState({})
  const [openReportModal, setOpenReportModal] = useState(false)

  useEffect(() => {
    if (data) {
      setEntity({
        name: data.topic,
        description: data.description,
        imageSrc: data.imageArray[0].url,
        imageAlt: data.imageArray[0].id,
      })
    }

  }, [data])

  const handleReport = () => {
    setOpenReportModal(false)

    reportCard(data._id)
  }

  return (
    <div>
      <div className='flex w-full transform text-left text-base transition md:my-8  md:px-4 '>
        <div
          className='relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
          <button
            type='button'
            className='absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
          >
            <span className='sr-only'>Close</span>
          </button>

          <div className='grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8'>
            <div className='sm:col-span-4 lg:col-span-5'>
              <div className='aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100'>
                <img src={entity.imageSrc} alt={entity.imageAlt} className='object-cover object-center' />
              </div>
            </div>
            <div className='sm:col-span-8 lg:col-span-7 grid grid-cols-1 content-between h-full'>


              <section aria-labelledby='information-heading' className='mt-3'>
                <h2 className='text-2xl font-bold text-gray-900 sm:pr-12 '>{entity.name}</h2>
                <h3 id='information-heading' className='sr-only'>
                  Enhancement Card INFORMATION
                </h3>


                <div className='mt-6'>
                  <h4 className='sr-only'>Description</h4>

                  <p className='text-sm text-gray-700'>{entity.description}</p>
                </div>
              </section>

              <section aria-labelledby='options-heading' className='mt-6'>

                <div>
                  <div className='mt-6'>
                    <button
                      onClick={() => {
                        router.push({
                          pathname: '/animals/enhance/edit',
                          query:
                            {
                              id: data._id,
                              entityID: data.entityID,
                            },
                        })
                      }}
                      type='button'
                      className='flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                    >
                      ✨ Enhance this Enhancement
                    </button>
                  </div>

                  <p className='absolute top-4 left-4 text-center sm:static sm:mt-6'
                  >
                    <p className='font-medium text-red-600 hover:text-red-500 cursor-pointer'
                       onClick={() => setOpenReportModal(true)}>
                      ⚠️ Report This enhancement ️
                    </p>
                    <ReportModal handleReport={handleReport} isOpen={openReportModal} setIsOpen={setOpenReportModal} />

                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualCard
