import axios from 'axios'

export const addLocation = async (district, location, image) => {
  const res = await axios
    .post(
      '/api/location/addlocation',
      {
        district,
        location,
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .catch((err) => {
      console.log(err)
    })
  return res
}
