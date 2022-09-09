import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import AddEnhancementCard from '../../components/EnhancementCards/Form/AddEnhancementCard'

const Enhance = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      {id &&
        <div className={`px-20 pt-10`}>
          <AddEnhancementCard id={id} />
        </div>}
    </div>
  )
}

export default Enhance
