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
