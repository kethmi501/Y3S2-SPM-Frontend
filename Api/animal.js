import axios from 'axios'

export const addAnimal = async (animal)   => {
  console.log(animal)

  const res = await axios.post('/api/animal/addAnimal', animal,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

  return res.data.message

}

export const getAnimal = async (id) => {
  const res = await axios.get(`/api/animal/getAnimal` , {
    params: {
      id: id,
    }
  })

  return res.data
}
