import React, { useState } from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import AddTree from '../../widgets/add-tree/AddTree'
import { TabMenu } from '../../const/tabMenu'

const AddTrees = () => {
  return (
    <div className="h-screem">
      <div className="py-6">
        <TabGroup tabs={TabMenu} current="Create Post" />
      </div>
      <div className='h-full flex justify-center items-center'>
        <AddTree />
      </div>
    </div>
  )
}

export default AddTrees
