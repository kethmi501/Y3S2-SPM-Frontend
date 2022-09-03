import React from 'react'
import AllAnimalsList from '../../components/animals/AllAnimalsList'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'
import AnimalHeader from '../../components/animals/AnimalHeader'

const animalslist = () => {
  return (
    <BasicPageWrapper>
      <AnimalHeader />
      <AllAnimalsList />
    </BasicPageWrapper>
  )
}

export default animalslist
