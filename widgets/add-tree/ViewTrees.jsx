import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Loader } from '@mantine/core'
import { retrieveTrees } from '../../Api/tree'
import TreeCard from './treeCard/TreeCard'
import TabGroup from '../../components/treeTabs/TabGroup'

const ViewTrees = () => {
  const tabs = [
    {
      name: 'All Posts',
      href: '/trees/view-trees',
    },
    {
      name: 'My Posts',
      href: '/trees/view-my-posts',
    },
  ]

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()

  useEffect(() => {
    async function getTrees() {
      let response = await retrieveTrees()
      setData(response)
      setLoading(false)
    }
    getTrees()
  }, [])

  return (
    <div className="relative">

      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white/70">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <div className="grid grid-cols-3 auto-rows-max gap-2 p-2">
        {data &&
          data.map((tree, idx) => (
            <div key={idx}>
              <TreeCard
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
