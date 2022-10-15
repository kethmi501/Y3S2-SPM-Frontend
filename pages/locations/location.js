import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import { TabMenuLocations } from '../../const/tabMenuLocation'
import ViewLocation from '../../widgets/location/ViewLocation'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'

const location = () => {
  return (
    <BasicPageWrapper >
      {/* <Player
        autoplay
        loop
        src={Background}
        style={{
          width: '100vh',
          objectFit: 'fill',
          opacity: '30%',
        }}
      ></Player> */}

      <div className="absolute w-full top-0">
        <div className="py-6">
          <TabGroup tabs={TabMenuLocations} current="" />
        </div>
        <div className="px-28">
          <ViewLocation />
        </div>
      </div>
    </BasicPageWrapper>
  )
}

export default location
