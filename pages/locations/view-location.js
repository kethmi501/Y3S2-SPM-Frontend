import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import ViewLocations from '../../widgets/location/ViewLocations'
import {TabMenuLocations} from '../../const/tabMenuLocation'

const ViewLocation = () => {
  return (
    <div className="h-screem">
      <div className="py-6">
        <TabGroup tabs={TabMenuLocations} current="All Locations" />
      </div>
      <ViewLocations />
    </div>
  )
}

export default ViewLocation
