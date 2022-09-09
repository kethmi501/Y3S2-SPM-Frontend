import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Dialog } from '@headlessui/react'


const ReportModal = ({ isOpen, setIsOpen, handleReport }) => {


  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className=' fixed inset-0 bg-black bg-opacity-25' />

          <div className='fixed inset-0 overflow-y-auto'>
            <motion.div className='flex min-h-full items-center justify-center p-4 text-center'
                        animate={{
                          opacity: [0, 1],
                          y: [100, 0],
                        }}

                        exit={{
                          opacity: [1, 0],
                        }}
            >

              <Dialog.Panel
                className='relative z-50 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Are you sure that you need to report this card?
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    This already has 10 reports, are you sure that you need to report this card?
                  </p>
                </div>

                <div className='mt-4 flex w-full justify-between'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
                    onClick={() => setIsOpen(false)}
                  >
                    OK. I changed my mind
                  </button>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                    onClick={handleReport}
                  >
                    Got it, Report this card
                  </button>
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ReportModal
