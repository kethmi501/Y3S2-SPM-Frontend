import React, { useEffect, useState } from 'react'
import { retrieveTrees } from '../../Api/tree'
import TabGroup from '../../components/treeTabs/TabGroup'
import { TabMenu } from '../../const/tabMenu'

const Report = () => {
  const [data, setData] = useState()
  const [print, setPrint] = useState(false)

  useEffect(() => {
    async function getTrees() {
      let response = await retrieveTrees()
      setData(response)
    }
    getTrees()
  }, [])

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-blue-100 rounded-br-lg rounded-bl-lg shadow-lg">
        <div className={`${print ? 'hidden' : 'block'}`}>
          <TabGroup tabs={TabMenu} current="Report" />
        </div>
      </div>
      <div className="space-y-5 py-10 px-8">
        {data &&
          data.map((tree) => (
            <div key={tree._id}>
              <div className="text-2xl font-semibold">
                <span>Tree Name : </span> <span>{tree.name}</span>
              </div>
              <div className="text-xl">
                <span>Scientific Name : </span>
                <span className="text-red-500">{tree.scientificname}</span>
              </div>
              <div className="text-xl">
                <span>Description : </span> <span>{tree.description}</span>
              </div>
            </div>
          ))}
        {data && (
          <div>
            <div className="text-lg font-semibold">
              <span>Trees Count in our Database : </span>
              <span> {data.length}</span>
            </div>
            <div className="text-lg font-semibold">
              <span>First Post date : </span>
              <span>{data[0].createdAt} </span>
            </div>
            <div className="text-lg font-semibold">
              <span>Last Post date : </span>
              <span>{data[data.length - 1].createdAt} </span>
            </div>
          </div>
        )}
      </div>
      <div className={`${print ? 'hidden' : 'block'} flex justify-center`}>
        <button
          className="bg-green-300 px-4 py-2 rounded-lg font-medium hover:bg-green-400 hover:text-white"
          onClick={() => {
            setPrint(true)
            setTimeout(() => {
              window.print()
              setPrint(false)
            }, 1000)
          }}
        >
          Print Report
        </button>
      </div>
    </div>
  )
}

export default Report
