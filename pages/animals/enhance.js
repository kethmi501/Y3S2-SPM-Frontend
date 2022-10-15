import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AddEnhancementCard from '../../components/EnhancementCards/Form/AddEnhancementCard'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'

const Enhance = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <BasicPageWrapper>
      {id &&
        <div className={`px-20 pt-10`}>
          <AddEnhancementCard id={id} />
        </div>}
    </BasicPageWrapper>
  )
}

export default Enhance
