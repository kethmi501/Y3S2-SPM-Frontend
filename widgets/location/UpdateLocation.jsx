import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOneUpdate, updatelocation } from '../../Api/location/location'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { handleUpload } from '../../Api/location/fireBase'
import { Progress } from '@mantine/core'
import { toast } from 'react-toastify'

const UpdateLocation = () => {
  const routers = useRouter()
  const { locationId } = routers.query

  const [updateStatus, setUpdateStatus] = useState()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [image, setImage] = useState()
  const [map, setMap] = React.useState(null)
  const [center, setCenter] = useState({
    lat: 6.78872669340523,
    lng: 79.92479682496953,
  })
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    async function getOneLocation() {
      let response = await getOneUpdate(locationId)
      setLoading(false)
      setData(response)
    }
    getOneLocation()
  }, [locationId])

  useEffect(() => {
    if (data) {
      const newImg = data.images.map((img, idx) => {
        return {
          id: idx,
          name: img,
        }
      })
      setImage(newImg)
      setCenter(data.location)
    }
  }, [data])

  const removeImage = (id) => {
    const newUrl = image.filter((url) => url.id !== id)
    setImage(newUrl)
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
  }
  const libraries = ['places']
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    libraries: libraries,
  })

  const complete = (array) => {
    const newUrl = array.map((url, idx) => {
      return {
        id: image.length + idx,
        name: url,
      }
    })
    setImage([...image, ...newUrl])
    setLoading(false)
  }

  const setFiles = async (event) => {
    setLoading(true)
    if (event.target.files && event.target.files[0]) {
      const newFiles = []
      for (let j = 0; j < event.target.files.length; j++) {
        newFiles.push(event.target.files[j])
      }
      const upLoad = async () => {
        const res = await handleUpload(newFiles, setPercent, complete)
      }
      upLoad()
    }
  }

  const submitUpdate = async () => {
    setLoading(true)
    const onlyUrls = image.map((url) => {
      return url.name
    })

    const res = await updatelocation(locationId, onlyUrls)
    if (res.status === 200) {
      setLoading(false)
      toast.success('Successfuly ceated')
      routers.push('/locations/view-user-locations')
    } else {
      setLoading(false)
      toast.error(res.message)
    }0
  }

  useEffect(() => {
    console.log(updateStatus)
  }, [updateStatus])

  return (
    <div className='p-5 bg-gray-100 rounded-2xl'>
      <div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            <Marker animation={2} position={center} draggable={true} />
          </GoogleMap>
        )}
      </div>
      <div className="flex py-4 md:space-x-3 w-full overflow-auto md:flex-row flex-col">
        {image &&
          image.map((url) => (
            <img
              key={url.id}
              className="object-none object-center border-4 rounded-lg  hover:border-red-700 w-40 h-40 cursor-pointer"
              src={url.name}
              onClick={() => {
                removeImage(url.id)
              }}
            />
          ))}
      </div>
      <div>
        {loading && <Progress color="grape" value={percent} striped animate />}
        <input
          id="dropzone-file"
          type="file"
          className="py-2"
          multiple={true}
          onChange={(e) => {
            setFiles(e)
          }}
        />
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            submitUpdate()
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default UpdateLocation
