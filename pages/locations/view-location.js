import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewLocations from '../../widgets/location/ViewLocations'
import { TabMenuLocations } from '../../const/tabMenuLocation'
import Background from '../../public/img/lottie/29582-looping-idle-location-animation.json'
import { Player } from '@lottiefiles/react-lottie-player'

const ViewLocation = () => {
  return (
    <div className="h-screen relative">
      <Player
        autoplay
        loop
        src={Background}
        style={{
          width: '100vh',
          objectFit: 'fill',
          opacity: '30%',
        }}
      ></Player>
      <div className="absolute w-full top-0  h-full">
        <div className="py-6">
          <TabGroup tabs={TabMenuLocations} current="All Locations" />
        </div>
        <ViewLocations />
      </div>
    </div>
  )
}

export default ViewLocation
