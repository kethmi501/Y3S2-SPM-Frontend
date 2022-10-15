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

export const retrieveTrees = async () => {
  const data = await axios
    .get('/api/gettrees', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const retrieveUserPosts = async () => {
  const data = await axios
    .get('/api/getuserposts', {
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
    .delete('/api/deleteTree', {
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
    .get('/api/getOneUpdate', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        postId
      }
    })
    .catch((err) => {
      return err
    })
  return data.data
}

export const updatePost = async (
  postId,
  name,
  image,
  tags,
  scientificname,
  description
) => {
  const data = await axios
    .put(
      '/api/updatepost',
      { postId, name, image, tags, scientificname, description },
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

export const searchTrees = async (keyword) => {
  console.log(keyword, 'key')
  const data = await axios
    .post('/api/searchtrees', {
      keyword: keyword,
    })
    .catch((err) => {
      return err
    })
  return data.data
}
