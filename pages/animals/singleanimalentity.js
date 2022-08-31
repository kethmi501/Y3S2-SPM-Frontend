import React, { useState } from 'react'
import AnimalEntity from '../../components/animals/AnimalEntity'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'
import CardPlacement from '../../components/EnhancementCards/Surround/CardPlacement'

const singleanimalentity = () => {
  const mockData = [
    {
      _id: '5f762f56-315f-4b58-b5c0-bb9f3a4b7043',
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: "5e2e4937-387d-4b04-9efa-0810c1ef9cff",
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: "c45a0ee4-b39e-4d86-8e15-3d7414d0e0f8",
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: "5fdee8fc-6a71-4789-ac2d-3b1f4e7a91ea",
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
    {
      _id: "9ff17ba2-c251-4ad1-9975-da8b6531235e",
      topic: 'Animal Fact 1',
      description: 'Animal Desc 1',
    },
  ]

  const [enhancementCards, setEnhancementCards] = useState([...mockData])

  return (
    <BasicPageWrapper>
      <AnimalEntity />
      <CardPlacement  cardDetailArray={enhancementCards} onScrollSetFn={setEnhancementCards}/>
    </BasicPageWrapper>
  )
}

export default singleanimalentity
