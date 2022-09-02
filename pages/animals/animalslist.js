import React from 'react'
import AllAnimalsList from '../../components/animals/AllAnimalsList'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'

const animalslist = () => {
  return (
    <BasicPageWrapper>
        <AllAnimalsList/>
    </BasicPageWrapper>
  )
}

export default animalslist