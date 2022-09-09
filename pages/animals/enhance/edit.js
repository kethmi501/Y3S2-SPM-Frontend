import React from 'react'
import EditEnhancementCard from '../../../components/EnhancementCards/Form/EditEnhancementCard'
import { useRouter } from 'next/router'

const Edit = () => {
  const router = useRouter()

  const {entityId , id} = router.query

  return (
    <div>
      <EditEnhancementCard entityId={entityId}  id={id}/>
    </div>
  )
}

export default Edit
