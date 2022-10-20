import { Loader, Modal } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { retrieveUserPosts, deletePost } from '../../Api/location/location'
import LocationCard from '../../components/location/posts/LocationCard'
import Router from 'next/router'

const UserLocations = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [postId, setPostId] = useState()
  const [opened, setOpened] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    async function getPosts() {
      let response = await retrieveUserPosts()
      if (response) {
        setData(response.result)
        setLoading(false)
      }
    }
    getPosts()
  }, [])

  const routeToUpdate = (id) => {
    Router.push({
      pathname: '/locations/update-location',
      query: { locationId: id },
    })
  }
  const deletePostHandler = async () => {
    setLoading(true)
    const response = await deletePost(postId)
    if (response.deletedCount > 0) {
      toast.success('Successfuly Deleted')
    }
    setOpened(false)
    setLoading(false)
    setRefresh(!refresh)
  }

  return (
    <div className="relative">
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Are sure want to delete?"
      >
        <div>
          <button
            onClick={() => deletePostHandler()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Yes
          </button>
        </div>
      </Modal>
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white/70">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <div className="grid grid-row lg:grid-cols-2 px-5">
        {data &&
          data.map((location, idx) => (
            <div key={idx} className="relative">
              <LocationCard locations={location} src={location.images[0]} />
              <div className="flex space-x-2 absolute top-2 left-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    routeToUpdate(location._id)
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setOpened(true)
                    setPostId(location._id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default UserLocations
