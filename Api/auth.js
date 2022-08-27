import axios from 'axios'

export const authUser = async (displayName, email, photoURL) => {
  const res = await axios.post('/api/auth', {
    displayName,
    email,
    photoURL,
  })

  return res.data
}

export const checkUser = async () => {
  const res = await axios.get('/api/test',{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  })

  return res.data
}
