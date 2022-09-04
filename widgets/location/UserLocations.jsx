import React, { useEffect, useState } from 'react'
import { retrieveUserPosts } from '../../Api/location/location'
import LocationCard from '../../components/location/posts/LocationCard'

const UserLocations = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [postId , setPostId] = useState()
  const [opened , setOpened] = useState(false)

  useEffect(() => {
    async function getPosts() {
      let response = await retrieveUserPosts()
      setData(response.result)
      setLoading(false)
    }
    getPosts()
  }, [])

  const routeToUpdate = (id) => {}


  return (
    <div className="grid grid-cols-3">
      {data &&
        data.map((location, idx) => (
          <div key={idx} className="relative">
            <LocationCard
              location={location.district}
              src={location.images[0]}
            />
            <div className="flex space-x-2 absolute top-2 left-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  routeToUpdate(tree._id)
                }}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setOpened(true)
                  setPostId(tree._id)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default UserLocations
