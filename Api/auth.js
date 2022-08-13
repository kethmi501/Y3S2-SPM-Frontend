import axios from 'axios'

export const authUser = async (displayName, email, photoURL) => {
  await axios.post('/api/auth', {
    displayName, email, photoURL,
  }).then(res => {
    return res.data
  }).catch(err => {
    return err
  })

}
