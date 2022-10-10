import axios from 'axios'

export const addLocation = async (district, location, image, address) => {
  const res = await axios
    .post(
      '/api/location/addlocation',
      {
        district,
        location,
        image,
        address,
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

export const retrieveLocation = async () => {
  const data = await axios
    .get('/api/location/retrieveall', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const addLike = async (postId) => {
  const data = await axios
    .put(
      '/api/locaton/likePost',
      { postId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .catch((err) => {
      return err
    })
  return data.data
}

export const retrieveUserPosts = async () => {
  const data = await axios
    .get('/api/location/retrieveuserposts', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const deletePost = async (postId) => {
  const data = await axios
    .delete('/api/location/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        postId,
      },
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const getOneUpdate = async (postId) => {
  const data = await axios
    .post(
      '/api/location/retrieveOneUpdate',
      {
        postId: postId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .catch((err) => {
      return err
    })
  return data.data
}

export const searchLocations = async (keyword) => {
  const data = await axios
    .post('/api/location/search', {
      keyword,
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const updatelocation = async (postId, image) => {
  const data = await axios
    .put(
      '/api/location/updatelocation',
      { postId, image },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    .catch((err) => {
      return err
    })
  return data
}
