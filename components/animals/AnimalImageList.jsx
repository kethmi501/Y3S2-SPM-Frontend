import React from 'react'
import Image from 'next/image'
import CarouselWrapper from '../layouts/CarouselWrapper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'


const AnimalImageList = ({ imageArray }) => {
  return (
    <CarouselWrapper>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {imageArray && imageArray.map((file, idx) => (
          <SwiperSlide key={idx} className='flex gap-x-4 relative z-10'>
            <div className='relative'>
              <div
                className='relative z-10 group w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-blue-500 overflow-hidden'>
                <Image src={file.url} alt='image' width={600} height={600}
                       className='relative z-10 w-full h-full object-cover pointer-events-none group-hover:opacity-75' />
              </div>
            </div>
          </SwiperSlide>
        ))
        }
      </Swiper>
    </CarouselWrapper>
  )
}

export default AnimalImageList
