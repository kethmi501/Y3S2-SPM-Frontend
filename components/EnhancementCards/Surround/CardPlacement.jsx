import React from 'react'
import EnhancementCardWrapper from '../../layouts/EnhancementCardWrapper'
import VisualCard from '../Card/VisualCard'


const CardPlacement = ({ cardDetailArray , onScrollSetFn}) => {
  return (
    <EnhancementCardWrapper onScrollSetFn={onScrollSetFn}>
      {cardDetailArray.map((item, index) => {
        return (
          <VisualCard key={item._id} index={index} padding={index} />
        )
      })}
    </EnhancementCardWrapper>
  )
}

export default CardPlacement
