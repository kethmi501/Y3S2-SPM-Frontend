import React, { useRef } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const CarouselWrapper = ({ children }) => {
    const innerRef = useRef(null)

    const scroll = (scrollOffset) => {
        innerRef.current.scrollLeft += scrollOffset
    }

    return (
        <div
            className={
                'overflow-x-hidden overflow-y-hidden scroll-smooth flex flex-row gap-3 scrollbar-hide'
            }
            ref={innerRef}
        >
            {children}
        </div>
    )
}

export default CarouselWrapper
