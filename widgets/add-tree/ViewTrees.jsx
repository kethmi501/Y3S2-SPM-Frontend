import React, { useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { retrieveTrees, searchTrees } from '../../Api/tree'
import TreeCard from './treeCard/TreeCard'
import Search from '../../components/AddTree/search/Search'
import Router from 'next/router'

const ViewTrees = () => {
  const routeToUpdate = (postId) => {
    Router.push({
      pathname: '/trees/tree',
      query: { postId: postId },
    })
  }

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [search, setSearch] = useState()

  useEffect(() => {
    async function getTrees() {
      let response = await retrieveTrees()
      setData(response)
      setLoading(false)
    }
    getTrees()
  }, [])

  useEffect(() => {
    async function getTrees() {
      setLoading(true)
      let response = await searchTrees(search)
      setData(response)
      setLoading(false)
    }
    if (search) {
      getTrees()
    }
  }, [search])

  return (
    <div className="relative h-full">
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white/70">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <div className="px-10 py-5 hover:px-7 duration-200 hover:duration-200">
        <Search setSearch={setSearch} />
      </div>
      <div className="grid grid-cols-3 auto-rows-max gap-2 p-2">
        {data &&
          data.map((tree, idx) => (
            <div key={idx}>
              <TreeCard
                id={tree._id}
                onClick={routeToUpdate}
                url={tree.image[0]}
                name={tree.name}
                description={tree.description}
                tags={tree.tags}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ViewTrees
