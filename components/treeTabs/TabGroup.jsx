import React from 'react'

const TabGroup = ({ tabs, current, href }) => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 dark:border-gray-700 py-2">
      <ul className="flex flex-wrap -mb-px">
        {tabs &&
          tabs.map((tab) => (
            <li key={tab.name} className="mr-2">
              <a
                href={tab.href}
                className={`inline-block p-4 rounded-t-lg hover:text-gray-600 ${
                  tab.name === current
                    ? 'text-blue-500 border-b-2 border-blue-500'
                    : ''
                }`}
                aria-current="page"
              >
                {tab.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default TabGroup
