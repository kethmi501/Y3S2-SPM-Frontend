import React from 'react'
import EnhancementCardWrapper from '../../layouts/EnhancementCardWrapper'

const VisualCard = ({index}) => {
  return (
    <div>
      <div className={`mx-10 p-2 bg-red-200 relative z-50 ${index}`}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam asperiores est illum incidunt modi mollitia
          necessitatibus nobis nostrum praesentium similique? Asperiores facilis fuga illo non perspiciatis provident
          temporibus veritatis. Eius!
        </p>
        <div>
          <button>
            DELETE
          </button>
          <button>
            EDIT
          </button>
        </div>
      </div>
    </div>
  )
}

export default VisualCard
