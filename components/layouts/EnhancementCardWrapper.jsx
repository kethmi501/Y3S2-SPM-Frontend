import React, { useEffect, useRef, useState } from 'react'
import { useScroll } from "framer-motion"

const EnhancementCardWrapper = ({children , onScrollSetFn}) => {
  const [percentageScroll, setPercentageScroll] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setPercentageScroll(scrollYProgress.current)
    })
  }, [])

  useEffect(() => {
    // onScrollSetFn(percentageScroll)
    console.log((percentageScroll*100).toFixed(0))
  }, [percentageScroll])


  const carouselRef = useRef(null)
  const { scrollY , scrollYProgress } = useScroll({
    container: carouselRef
  })

  return (
    <div>
      <p>{percentageScroll}</p>
      <div ref={carouselRef} className={`bg-white h-[40vh] overflow-auto `}>
        {children}
      </div>
    </div>
  )
}

export default EnhancementCardWrapper
