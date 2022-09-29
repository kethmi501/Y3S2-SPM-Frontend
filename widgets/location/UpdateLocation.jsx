import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getOneUpdate } from '../../Api/location/location'

const UpdateLocation = () => {
  
  const routers = useRouter()
  const { locationId } = routers.query
  

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(true)
  const [image, setImage] = useState(true)

  useEffect(() => {
    async function getOneLocation() {
      let response = await getOneUpdate(locationId)
      setLoading(false)
      setData(response)
    }
    getOneLocation()
  }, [locationId])

  useEffect(() => {
    // if (data) {
    //   const newUrl = data.image.map((url, idx) => {
    //     return {
    //       id: idx,
    //       url: url,
    //     }
    //   })
    //   setImage(newUrl)
    // }
    console.log(data)
  }, [data])

  const router = useRouter()
  const { postId } = router.query
  return <div>UpdateLocation</div>
}

export default UpdateLocation
