import Image from 'next/image'
import React from 'react'

const LocationCard = ({ locations, src, onClick }) => {
  const select = (id) => {
    if (onClick) {
      onClick(id)
    }
  }
  return (
    <div className="flex justify-center w-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl duration-500">
      <div className="flex flex-row rounded-2xl bg-gray-50 shadow-lg h-72 w-full">
        <div
          className="w-full relative"
          onClick={() => {
            select(locations._id)
          }}
        >
          <Image src={src} alt={locations.location} layout="fill" />
        </div>
        <div className="p-6 flex flex-col justify-start w-full">
          <h5 className="text-gray-900 text-xl font-medium mb-2">
            {locations.district}
          </h5>
          <p className="text-gray-700 text-base mb-4">{locations.address}</p>
          <p className="text-gray-600 text-xs">
            Last updated {locations.updatedAt}
          </p>
        </div>
      </div>
    </div>
  )
}

export default LocationCard
