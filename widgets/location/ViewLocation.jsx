import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOneUpdate } from '../../Api/location/location'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const ViewLocation = () => {
  const router = useRouter()
  const { locationId } = router.query
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [center, setCenter] = useState({
    lat: 6.78872669340523,
    lng: 79.92479682496953,
  })
  const [map, setMap] = React.useState(null)

  useEffect(() => {
    if (locationId) {
      async function getOneLocation() {
        let response = await getOneUpdate(locationId)
        setLoading(false)
        setData(response)
      }
      getOneLocation()
    }
  }, [locationId])

  useEffect(() => {
    if (data) {
      setCenter(data.location)
    }
  }, [data])

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

  return (
    <div>
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
      <div className="h-28 bg-green-50 flex items-center justify-center">
        {data && (
          <div className="relative w-full flex justify-center">
            <p className="text-xl font-bold absolute bottom-0">{data.district}</p>
            <p className="text-xl font-bold animate-pulse absolute text-green-600 z-10">
              {data.address}
            </p>
            <p className="text-xl font-bold absolute">{data.address}</p>
          </div>
        )}
      </div>
      <div className="flex md:space-x-10 md:flex-row flex-col ">
        {data &&
          data.images.map((img) => (
            <div>
              <div class="mb-4">
                <img
                  src={img}
                  class="max-w-[350px] h-auto rounded-full"
                  alt=""
                />
              </div>
            </div>
          ))}
      </div>
      <div>
        {data && (
          <div className="text-red-500 flex justify-center">
            {data.likes.length > 0 && data.likes.length == 1
              ? 'One person like this location'
              : data.likes.length + 'users likes this location'}
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewLocation
