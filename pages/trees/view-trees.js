import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewTreesWidget from '../../widgets/add-tree/ViewTrees'
import {TabMenu} from '../../const/tabMenu'

const ViewTrees = () => {

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-blue-100 rounded-br-lg rounded-bl-lg shadow-lg">
        <TabGroup tabs={TabMenu} current="All Posts" />
      </div>
      <ViewTreesWidget />
    </div>
  )
}

export default ViewTrees
