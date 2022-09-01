import axios from 'axios'

export const addTree = async (
  name,
  image,
  tags,
  scientificname,
  description
) => {
  const res = await axios
    .post(
      '/api/tree',
      {
        name,
        image,
        tags,
        scientificname,
        description,
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
