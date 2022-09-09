import axios from 'axios'

export const addEnhancementCard = async (entityType, entityID, topic, description, imageArray) => {
  const res = await axios
    .post(
      '/api/enhancementCards/addCard',
      {
        entityType,
        entityID,
        topic,
        description,
        imageArray,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
    .catch((err) => {
      console.log(err)
    })

  return res.data
}

export const getEnhancementCard = async (enhancementCardId) => {
  const res = await axios
    .get('/api/enhancementCards/viewCard', {
      params: {
        enhancementCardId,
      },
    })

  return res.data
}


export const reportCard = async (enhancementCardId) => {
  const res = await axios
    .delete('/api/enhancementCards/reportCard',
      {
        data: {
          enhancementCardId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })


  return res.data
}

export const editEnhancementCard = async (enhancementID, entityType, entityID, topic, description, imageArray) => {
  const res = await axios
    .put('/api/enhancementCards/editCard',
      {
        enhancementCardId: enhancementID,
        entityType,
        entityID,
        topic,
        description,
        imageArray,
      }
      ,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

  return res.data
}
