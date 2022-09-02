import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewMyPostsWidget from '../../widgets/add-tree/ViewMyPosts'
import {TabMenu} from '../../const/tabMenu'

const ViewMyPosts = () => {

  return (
    <div className='bg-gray-100 h-screen'>
      <div className=" bg-blue-100 shadow-md rounded-br-lg rounded-bl-lg">
        <TabGroup tabs={TabMenu} current="My Posts" />
      </div>
      <ViewMyPostsWidget />
    </div>
  )
}

export default ViewMyPosts
