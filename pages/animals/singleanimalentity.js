import React, { useEffect, useState } from 'react'
import AnimalEntity from '../../components/animals/AnimalEntity'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'
import CardPlacement from '../../components/EnhancementCards/Surround/CardPlacement'
import { useRouter } from 'next/router'
import { getAnimal } from '../../Api/animal'
import { useDidUpdate } from '@mantine/hooks'
import { getEnhancementCard } from '../../Api/enhancements'

const singleanimalentity = () => {
  const router = useRouter()
  const { id } = router.query

  const [enhancementCardIds, setEnhancementCardIds] = useState([])
  const [enhancementCards, setEnhancementCards] = useState([])

  const [animalData, setAnimalData] = useState({})
  useEffect(() => {
    //make this work with dynamic routing
    if (id) {
      fetchAnimal(id)
    }
  }, [id])

  const fetchAnimal = (id) => {
    getAnimal(id).then((res) => {
      // setEnhancementCards(res.data.message)
      setAnimalData(res.animal)
    })
  }

  useEffect(() => {
    if (animalData && animalData.enhancementCardIds && animalData.enhancementCardIds.length > 0) {
      setEnhancementCardIds(animalData.enhancementCardIds)
    }
  }, [animalData])


  useEffect(() => {
    if (enhancementCardIds && enhancementCardIds.length > 0) {
      //get enhancement cards from enhancementCardIds
      fetchEnhancementCards()
    }
  }, [enhancementCardIds])


  const fetchEnhancementCards = async () => {
    //get enhancement cards from enhancementCardIds
    for (let i = 0; i < enhancementCardIds.length; i++) {
      await getEnhancementCard(enhancementCardIds[i]).then((res) => {
        setEnhancementCards((prev) => [...prev, res.enhancementCard])
      })
    }
  }


  return (
    <BasicPageWrapper>
      {animalData && <AnimalEntity animalData={animalData} />}
      {enhancementCards && enhancementCards.length > 0 && <CardPlacement cardDetailArray={enhancementCards} />}
    </BasicPageWrapper>
  )
}

export default singleanimalentity
