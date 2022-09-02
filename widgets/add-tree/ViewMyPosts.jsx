import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, Loader } from '@mantine/core'
import { retrieveUserPosts, deletePost } from '../../Api/tree'
import TreeCard from './treeCard/TreeCard'

const ViewMyPosts = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [opened, setOpened] = useState(false)
  const [postId, setPostId] = useState()
  const [refresh, setRefresh] = useState(false)

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

  useEffect(() => {
    async function getTrees() {
      let response = await retrieveUserPosts()
      setData(response)
      setLoading(false)
    }
    getTrees()
  }, [refresh])

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
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
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
      <div className="grid grid-cols-3 gap-2 p-2">
        {data &&
          data.map((tree, idx) => (
            <div key={idx} className="relative">
              <TreeCard
                url={tree.image[0]}
                name={tree.name}
                description={tree.description}
                tags={tree.tags}
              />
              <div className="flex space-x-2 absolute top-0">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setOpened(true)
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
    </div>
  )
}

export default ViewMyPosts
