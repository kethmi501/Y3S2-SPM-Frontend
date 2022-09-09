import React from 'react'
import EnhancementCardWrapper from '../../layouts/EnhancementCardWrapper'
import VisualCard from '../Card/VisualCard'


const CardPlacement = ({ cardDetailArray }) => {
  return (
    <EnhancementCardWrapper >
      {cardDetailArray.map((item) => {
        return (
          <VisualCard key={item._id} data={item}/>
        )
      })}
    </EnhancementCardWrapper>
  )
}

export default CardPlacement
