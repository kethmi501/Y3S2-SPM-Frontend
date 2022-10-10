import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import { TabMenu } from '../../const/tabMenu'
import ViewTree from '../../widgets/add-tree/ViewTree'
import Backgrond from '../../public/img/lottie/102347-a-tree-life-cycle.json'

const Tree = () => {
  return (
    <div className="h-screen relative">
      <Player
        autoplay
        loop
        src={Backgrond}
        style={{
          width: '30%',
          objectFit: 'fill',
          opacity: '20%',
        }}
      ></Player>

      <div className="absolute w-full top-0">
        <div className="py-6">
          <TabGroup tabs={TabMenu} current="" />
        </div>
        <div className="px-28">
          <ViewTree />
        </div>
      </div>
    </div>
  )
}

export default Tree
