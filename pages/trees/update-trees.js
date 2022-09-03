import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import { TabMenu } from '../../const/tabMenu'
import UpdateTree from '../../widgets/UpdateTree'

const UpdateTrees = () => {
  return (
    <div className='bg-gray-100 h-screen'>
    <div className=" bg-blue-100 shadow-md rounded-br-lg rounded-bl-lg">
      <TabGroup tabs={TabMenu} current="My Posts" />
    </div>
    <UpdateTree />
  </div>
  )
}

export default UpdateTrees