import React, { useEffect, useRef, useState } from 'react'
import { handleUpload } from '../../Api/location/fireBase'
import DropDown from '../../components/location/dropDown/DropDown'
import { districts } from '../../const/districts'
import { BsCheckLg } from 'react-icons/bs'
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api'
import Uploader from '../../components/AddTree/Uploader/Uploader'

import Geocode from 'react-geocode'
import { Loader, Progress } from '@mantine/core'
import { addLocation } from '../../Api/location/location'
import { toast } from 'react-toastify'
import AddLocationLot from '../../public/img/lottie/4199-location-search.json'
import { Player } from '@lottiefiles/react-lottie-player'

const AddLocation = () => {
  const [district, setDistricts] = useState()

  const setDistrict = (dis) => {
    setDistricts(dis)
  }

  const [map, setMap] = React.useState(null)
  const containerStyle = {
    width: '90%',
    height: '400px',
    borderRadius: '10px',
  }

  const libraries = ['places']
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API,
    libraries: libraries,
  })

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center)
    map.fitBounds(bounds)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const [checked, setChecked] = useState(false)
  const [address, setAddress] = useState('')
  const [center, setCenter] = useState({
    lat: 6.78872669340523,
    lng: 79.92479682496953,
  })

  const [file, setFile] = useState()
  const [percent, setPercent] = useState(0)
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState(false)

  Geocode.setApiKey(process.env.GOOGLE_MAPS_API)
  Geocode.setLocationType('ROOFTOP')
  Geocode.setLanguage('en')

  function convertToLatLng(e) {
    e.preventDefault()
    setTimeout(() => {
      Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location
          setCenter({
            lat: lat,
            lng: lng,
          })
          setChecked(true)
        },
        (error) => {
          console.error(error)
        }
      )
    }, 1000)
  }
  const complete = (array) => {
    const newUrl = array.map((url, idx) => {
      return {
        id: image.length + idx,
        url: url,
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
      setFile(newFiles)
      const upLoad = async () => {
        const res = await handleUpload(newFiles, setPercent, complete)
      }
      upLoad()
    }
  }

  const onSubmit = async () => {
    const onlyUrls = image.map((url) => {
      return url.url
    })

    if (image && district && center && address) {
      const postResponse = await addLocation(
        district,
        center,
        onlyUrls,
        address
      )
      if (postResponse.status === 200) {
        setLoading(false)
        toast.success('Successfuly ceated')
        console.log(postResponse)
      } else {
        setLoading(false)
        toast.error(postResponse.message)
      }
    } else {
      toast.warn('Recheck all fields.')
    }
  }

  return (
    <div className="p-5 relative">
      {loading && (
        <div className="absolute h-full w-full flex items-center justify-center bg-white">
          <Loader color="orange" size="xl" variant="bars" />
        </div>
      )}
      <div className="flex flex-row-reverse bg-gray-300/90 py-10 px-5 rounded-xl">
        <div className="w-1/2 flex flex-col justify-around">
          <DropDown
            items={districts}
            onClick={setDistrict}
            title="Select District"
          />
          <div>
            {isLoaded && (
              <div>
                <div className="p-3 bg-gray-400 rounded-xl">
                  <Autocomplete
                    className={`col-span-8`}
                    onPlaceChanged={(place) => {
                      setChecked(false)
                      setAddress(document.getElementById('address').value)
                    }}
                    fields={['geometry.location']}
                  >
                    <input
                      autoComplete={'none'}
                      onChange={(e) => {
                        setAddress(e.target.value)
                        setChecked(false)
                      }}
                      required={true}
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    />
                  </Autocomplete>
                  <div>
                    <button
                      className={`grid place-items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  w-full ${
                        checked
                          ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                          : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                      }`}
                      onClick={convertToLatLng}
                    >
                      {checked ? (
                        <span className={`grid grid-cols-3 place-items-center`}>
                          <BsCheckLg className="w-6 h-6" />
                          <span className="col-span-2 ml-2">
                            Checked and verified
                          </span>
                        </span>
                      ) : (
                        'Check'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full bg-gray-700">
            <Uploader setFiles={setFiles} />
          </div>
        </div>
        <div className="w-1/2">
          {isLoaded && (
            <div>
              {checked ? (
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
              ) : (
                <div className="p-1 bg-gray-200 m-2">
                  <Player
                    autoplay
                    loop
                    src={AddLocationLot}
                    style={{
                      width: '50%',
                    }}
                  ></Player>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          {loading && (
            <Progress color="grape" value={percent} striped animate />
          )}
        </div>
        <div className="w-full h-[150px] rounded-lg flex space-x-2 bg-gray-300/90">
          {image &&
            image.map((url) => (
              <img
                key={url.id}
                className="object-none object-center border-4 rounded-lg  hover:border-red-700 w-40 h-full cursor-pointer"
                src={url.url}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-row justify-end space-x-3 py-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
          onClick={onSubmit}
        >
          Submit
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddLocation
