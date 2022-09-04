import React, { useEffect, useState } from 'react'
import AnimalEntity from '../../components/animals/AnimalEntity'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'
import CardPlacement from '../../components/EnhancementCards/Surround/CardPlacement'
import { useRouter } from 'next/router'
import { getAnimal } from '../../Api/animal'
import { useDidUpdate } from '@mantine/hooks'

const singleanimalentity = () => {
  const mockData = [
    {
      _id: '5f762f56-315f-4b58-b5c0-bb9f3a4b7043',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: '5e2e4937-387d-4b04-9efa-0810c1ef9cff',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: 'c45a0ee4-b39e-4d86-8e15-3d7414d0e0f8',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: '5fdee8fc-6a71-4789-ac2d-3b1f4e7a91ea',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: '9ff17ba2-c251-4ad1-9975-da8b6531235e',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
  ]
  const router = useRouter()
  const { id } = router.query
  // let animalId = '630f23044a4e88b022ce303e'

  const [enhancementCardIds, setEnhancementCardIds] = useState([])
  const [enhancementCards, setEnhancementCards] = useState([...mockData])

  const [animalData, setAnimalData] = useState({})
  useEffect(() => {
    //make this work with dynamic routing
    if (id) {
      getAnimal(id).then((res) => {
        // setEnhancementCards(res.data.message)
        setAnimalData(res.animal)
      })
    }
  }, [id])

  useDidUpdate(() => {
    setEnhancementCardIds(animalData.enhancementCardIds)
  }, [animalData])


  useDidUpdate(() => {
    // setEnhancementCards(animalData.enhancementCards)
    //TODO enhancement cards

    console.log(enhancementCardIds)
  }, [enhancementCardIds])

  return (
    <BasicPageWrapper>
      <AnimalEntity animalData={animalData}/>
      <CardPlacement cardDetailArray={enhancementCards} />
    </BasicPageWrapper>
  )
}

export default singleanimalentity
