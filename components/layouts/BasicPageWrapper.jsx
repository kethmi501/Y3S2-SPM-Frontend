import React from 'react'

const BasicPageWrapper = ({ children }) => {
    return (
        <div className='px-4 sm:px-20 md:px-32 lg:px-40 bg-gray-100'>{children}</div>
    )
}

export default BasicPageWrapper