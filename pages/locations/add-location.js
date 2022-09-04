import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import AddLocationWidget from '../../widgets/location/AddLocation'
import {TabMenuLocations} from '../../const/tabMenuLocation'

const AddLocation = () => {
  return (
    <div className="h-screem">
      <div className="py-6">
        <TabGroup tabs={TabMenuLocations} current="Add Location" />
      </div>
      <div className="px-28">
        <AddLocationWidget />
      </div>
    </div>
  )
}

export default AddLocation
