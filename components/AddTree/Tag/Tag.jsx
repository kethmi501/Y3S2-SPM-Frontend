import React from 'react'

const Tag = ({tag}) => {
const bgColor = ()=> {
    let value = Math.floor(Math.random() * 10);
    if (value == 1){
        return 'bg-red-200'
    }
    else if (value === 2){
        return 'bg-green-200'
    }  else if (value === 3){
        return 'bg-yellow-200'
    }  else if (value === 4){
        return 'bg-gray-200'
    }  else if (value === 5){
        return 'bg-blue-200'
    }  else if (value === 6){
        return 'bg-pink-200'
    }  else if (value === 7){
        return 'bg-green-200'
    }  else if (value === 8){
        return 'bg-purple-200'
    }  else if (value === 9){
        return 'bg-orange-200'
    }  else {
        return 'bg-red-200'
    }
}
  return (
    <div className={`${bgColor()} w-fit px-6 h-11 flex items-center justify-center rounded-2xl`}>{tag}</div>
  )
}

export default Tag