import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import AddLocationWidget from '../../widgets/location/AddLocation'
import { TabMenuLocations } from '../../const/tabMenuLocation'
import Background from '../../public/img/lottie/86513-location-forked.json'
import { Player } from '@lottiefiles/react-lottie-player'

const AddLocation = () => {
  return (
    <div className="h-screen relative">
      <Player
        autoplay
        loop
        src={Background}
        style={{
          width: '100vh',
          objectFit: 'fill',
        }}
      ></Player>

      <div className="absolute w-full top-0">
        <div className="py-6">
          <TabGroup tabs={TabMenuLocations} current="Add Location" />
        </div>
        <div className="px-28">
          <AddLocationWidget />
        </div>
      </div>
    </div>
  )
}

export default AddLocation
