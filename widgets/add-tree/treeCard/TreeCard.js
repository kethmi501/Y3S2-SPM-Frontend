import React from 'react'
import Image from 'next/image'

const TreeCard = ({ url, tags, name, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-xl">
      <img className="w-full h-56" src={url} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 grid grid-cols-4">
        {tags &&
          tags.map((tag ,idx) => (
            <div
              key={idx}
              className="bg-gray-200 w-fit rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </div>
          ))}
      </div>
    </div>
  )
}

export default TreeCard
