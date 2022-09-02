import React, { useEffect, useRef, useState } from 'react'
import { useScroll } from 'framer-motion'

const EnhancementCardWrapper = ({ children }) => {
  const [percentageScroll, setPercentageScroll] = useState(0)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setPercentageScroll((scrollYProgress.current * 100).toFixed(0),
      )
    })
  }, [])

  const carouselRef = useRef(null)
  const { scrollY, scrollYProgress } = useScroll({
    container: carouselRef,
  })

  return (
    <div className={`bg-white`}>
      <div className={`py-5 mx-5`}>
        <div className={`bg-white flex w-full rounded-full relative border-2 border-green-200 `}>
          <div
            className={`absolute bg-gradient-to-r from-blue-500 via-green-400 to-green-500  rounded-full z-10 ${percentageScroll == 0 && 'bg-white'}`}
            style={{
              width: `${percentageScroll}%`,
            }}>
            <p className={`w-full flex ${percentageScroll > 10 ? 'justify-center' : 'pl-3'}`}>
              {percentageScroll.toString()}%
            </p>
          </div>
          <div className={`absolute bg-green-400 rounded-full z-0 ${percentageScroll == 100 && 'hidden'} `} style={{
            width: `${+percentageScroll + +percentageScroll * 0.02 >= 100 ? 100 : +percentageScroll + +percentageScroll * 0.02}%`,
          }}>
            <p className={`invisible`}>
              .
            </p>
          </div>
          <p className={`flex w-full invisible `}>
            .
          </p>
        </div>
      </div>
      <div ref={carouselRef} className={`bg-white h-[80vh] overflow-auto `}>
        {children}
      </div>
    </div>
  )
}

export default EnhancementCardWrapper
