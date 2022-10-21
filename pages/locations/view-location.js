import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewLocations from '../../widgets/location/ViewLocations'
import { TabMenuLocations } from '../../const/tabMenuLocation'
import Background from '../../public/img/lottie/29582-looping-idle-location-animation.json'
import { Player } from '@lottiefiles/react-lottie-player'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'

const ViewLocation = () => {
  return (
    <BasicPageWrapper>
      <div className={`relative`}>
        <Player
          autoplay
          loop
          src={Background}
          style={{
            width: '100vh',
            objectFit: 'fill',
            opacity: '30%',
          }}
        >

        </Player>
        <div className=' w-full  absolute top-0 h-full'>
          <div className='py-6'>
            <TabGroup tabs={TabMenuLocations} current='All Locations' />
          </div>
          <ViewLocations />
        </div>

      </div>
    </BasicPageWrapper>
  )
}

export default ViewLocation
