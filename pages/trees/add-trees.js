import React, { useState } from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import AddTree from '../../widgets/add-tree/AddTree'
import { TabMenu } from '../../const/tabMenu'
import { Player } from '@lottiefiles/react-lottie-player'
import Background from '../../public/img/lottie/83106-save-trees-protect-the-environment.json'

const AddTrees = () => {
  return (
    <div className="h-screen relative">
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
      <div className="absolute w-full top-0">
        <div className="py-6">
          <TabGroup tabs={TabMenu} current="Create Post" />
        </div>
        <div className="h-full flex justify-center items-center">
          <AddTree />
        </div>
      </div>
    </div>
  )
}

export default AddTrees
