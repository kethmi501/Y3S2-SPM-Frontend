import React, { useEffect, useState } from 'react'
import { retrieveLocation } from '../../Api/location/location'
import TabGroup from '../../components/treeTabs/TabGroup'
import { TabMenuLocations } from '../../const/tabMenuLocation'

const Report = () => {
  const [data, setData] = useState()
  const [print, setPrint] = useState(false)
  const [popular, setPopular] = useState()

  useEffect(() => {
    async function getLocations() {
      let response = await retrieveLocation()
      setData(response.result)
    }
    getLocations()
  }, [])

  useEffect(() => {
    let id
    let likes = 0
    if (data) {
      data.forEach((element, index) => {
        if (element.likes.length > likes) {
          id = index
        }
      })
      setPopular(data[id])
    }
  }, [data])

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: `url(${popular?.images[0]})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'block',
      }}
    >
      <div className="bg-blue-100 rounded-br-lg rounded-bl-lg shadow-lg">
        <div className={`${print ? 'hidden' : 'block'}`}>
          <TabGroup tabs={TabMenuLocations} current="Report" />
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <div className="bg-gray-50 p-5 flex flex-col">
          <div className="space-y-5 py-10 px-8">
            {data &&
              data.map((location) => (
                <div key={location._id}>
                  <div className="text-2xl font-semibold">
                    <span>Location District : </span>{' '}
                    <span>{location.district}</span>
                  </div>
                  <div className="text-xl">
                    <span>Location Address : </span>
                    <span className="text-red-500">{location.address}</span>
                  </div>
                  <div className="text-xl">
                    <span>Likes : </span> <span>{location.likes.length}</span>
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
            <div className="bg-pink-50 p-3 rounded-xl">
              <div className="flex justify-center">
                <p className="text-xl font-bold">Most popular Location</p>
              </div>
              {popular && (
                <div className="flex justify-between">
                  <div>
                    <div className="text-2xl font-semibold">
                      <span>Location District : </span>
                      <span>{popular.district}</span>
                    </div>
                    <div className="text-xl">
                      <span>Location Address : </span>
                      <span className="text-red-500">{popular.address}</span>
                    </div>
                    <div className="text-xl">
                      <span>Likes : </span> <span>{popular.likes.length}</span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={popular.images[0]}
                      className="h-[150px] rounded-xl border-2 border-green-400"
                    />
                  </div>
                </div>
              )}
            </div>
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
      </div>
    </div>
  )
}

export default Report
