import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewTreesWidget from '../../widgets/add-tree/ViewTrees'
import { TabMenu } from '../../const/tabMenu'
import { Player } from '@lottiefiles/react-lottie-player'
import Background from '../../public/img/lottie/70488-string-of-pearls-loader-or-animation.json'
import BasicPageWrapper from '../../components/layouts/BasicPageWrapper'

const ViewTrees = () => {
  return (
    <BasicPageWrapper>
      <div className='h-screen relative'>
        <div className='absolute right-1'>
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
        </div>
        <div className='absolute w-full top-0'>
          <div className='bg-blue-100 rounded-br-lg rounded-bl-lg shadow-lg'>
            <TabGroup tabs={TabMenu} current='All Posts' />
          </div>
          <ViewTreesWidget />
        </div>
      </div>
    </BasicPageWrapper>
  )
}

export default ViewTrees
