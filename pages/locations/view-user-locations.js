import React from 'react'
import TabGroup from '../../components/treeTabs/TabGroup'
import UserLocations from '../../widgets/location/UserLocations'
import {TabMenuLocations} from '../../const/tabMenuLocation'

const ViewUserLocations = () => {
  return (
    <div className="h-screem">
      <div className="py-6">
        <TabGroup tabs={TabMenuLocations} current="My Locations" />
      </div>
      <UserLocations />
    </div>
  )
}

export default ViewUserLocations
