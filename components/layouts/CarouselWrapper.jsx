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
            <div
                className={`block absolute left-[4rem] lg:left-[10rem] z-10`}
            >
                <div
                    onClick={() => {
                        scroll(-100)
                    }}
                    className={
                        'absolute h-[2.5rem] w-[2.5rem] grid place-items-center left-[1rem] top-[3rem] lg:top-[5rem] bg-black bg-opacity-70 rounded-full cursor-pointer'
                    }
                >
                    <HiChevronLeft
                        className={'text-white w-[2.5rem] h-[2.5rem]'}
                    />
                </div>
            </div>
            {children}
            <div
                className={`block absolute right-[4rem] lg:right-[10rem] z-10`}
            >
                <div
                    onClick={() => {
                        scroll(100)
                    }}
                    className={
                        'absolute h-[2.5rem] w-[2.5rem] place-items-center right-[1rem] top-[3rem] lg:top-[5rem] bg-black bg-opacity-70 rounded-full cursor-pointer'
                    }
                >
                    <HiChevronRight
                        className={'text-white w-[2.5rem] h-[2.5rem]'}
                    />
                </div>
            </div>
        </div>
    )
}

export default CarouselWrapper