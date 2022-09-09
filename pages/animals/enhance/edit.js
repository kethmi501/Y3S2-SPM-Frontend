import React from 'react'
import EditEnhancementCard from '../../../components/EnhancementCards/Form/EditEnhancementCard'
import { useRouter } from 'next/router'

const Edit = () => {
  const router = useRouter()

  const {entityID , id} = router.query

  return (
    <div>
      <EditEnhancementCard entityId={entityID}  id={id}/>
    </div>
  )
}

export default Edit
