import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { getOneUpdate } from '../../Api/tree'

const ViewTree = () => {
  const router = useRouter()
  const { postId } = router.query
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    async function getOneTree() {
      let response = await getOneUpdate(postId)
      setLoading(false)
      setData(response)
    }
    getOneTree()
  }, [postId])

  return (
    <div className="w-full">
      {data && (
        <div>
          <div>
            <div className="flex justify-center space-x-2">
              <div className="text-2xl font-medium text-gray-700">
                {data.name} -
              </div>
              <div className="text-2xl font-medium text-gray-700">
                {data.scientificname}
              </div>
            </div>

            <div>
              {data.image.map((img) => (
                <div
                  key={img}
                  className="w-72 rounded-2xl overflow-auto shadow-xl hover:shadow-2xl hover:scale-105 duration-500"
                >
                  <img src={img} className="w-full" />
                </div>
              ))}
            </div>

            <div className="py-10 text-lg font-medium text-gray-500">
              {data.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewTree
