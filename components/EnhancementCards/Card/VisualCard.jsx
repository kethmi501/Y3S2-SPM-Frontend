import React from 'react'
import EnhancementCardWrapper from '../../layouts/EnhancementCardWrapper'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const entity = {
  name: 'Zip Tote Basket',
  price: '$220',
  rating: 3.9,
  href: '#',
  description:
    'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
  imageSrc: 'https://images.unsplash.com/photo-1516728918023-0fd81a3a149c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  imageAlt: 'Back angled view with bag open and handles to the side.',
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
}


const VisualCard = ({index}) => {


  return (
    <div>
      <div className="flex w-full transform text-left text-base transition md:my-8  md:px-4 ">
        <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
          >
            <span className="sr-only">Close</span>
          </button>

          <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span-4 lg:col-span-5">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100">
                <img src={entity.imageSrc} alt={entity.imageAlt} className="object-cover object-center" />
              </div>
            </div>
            <div className="sm:col-span-8 lg:col-span-7">
              <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{entity.name}</h2>

              <section aria-labelledby="information-heading" className="mt-3">
                <h3 id="information-heading" className="sr-only">
                  Product information
                </h3>

                <p className="text-2xl text-gray-900">{entity.price}</p>

                {/* Reviews */}
                <div className="mt-3">
                  <h4 className="sr-only">Reviews</h4>
                  <div className="flex items-center">
                    <div className="flex items-center">
                    </div>
                    <p className="sr-only">{entity.rating} out of 5 stars</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="sr-only">Description</h4>

                  <p className="text-sm text-gray-700">{entity.description}</p>
                </div>
              </section>

              <section aria-labelledby="options-heading" className="mt-6">
                <h3 id="options-heading" className="sr-only">
                  Product options
                </h3>

                <div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 py-3 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                      Add to bag
                    </button>
                  </div>

                  <p className="absolute top-4 left-4 text-center sm:static sm:mt-6">
                    <a href={entity.href} className="font-medium text-green-600 hover:text-green-500">
                      View full details
                    </a>
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
