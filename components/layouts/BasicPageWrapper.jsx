import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { HiMenuAlt2, HiSearch, HiX } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { FaDog } from 'react-icons/fa'
import { GiTrophyCup } from 'react-icons/gi'
import { BsTreeFill } from 'react-icons/bs'
import { ImLocation } from 'react-icons/im'

const navigationX = [
  { name: 'Leaderboard', href: '/', icon: GiTrophyCup, current: false },
  { name: 'Animals', href: '/animals', icon: FaDog, current: false },
  { name: 'Trees  ', href: '/trees', icon: BsTreeFill, current: false },
  { name: 'Locations', href: '/locations', icon: ImLocation, current: false },
]
const userNavigation = [
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const BasicPageWrapper = ({ children }) => {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const searchHandler = async (event) => {
    if (event.key === 'Enter') {
      if (searchValue.trim() !== '') {
        await router.push({
          pathname: '/search',
          query: { search: searchValue },
        })
      }
    } else {
      setSearchValue(event.target.value)
    }
  }

  const [navigation, setNavigation] = useState(navigationX)
  useEffect(() => {
      if (router.pathname !== '/') {
        setNavigation(navigationX.map((item) => {
          return {
            ...item,
            current: item.href.includes(router.pathname) ,
          }
        }))
      } else {
        setNavigation(navigationX.map((item, idx) => {
            if (idx === 0) {
              return {
                ...item,
                current: true,
              }
            } else {
              return {
                ...item,
                current: false,
              }
            }
          },
        ))
      }
    }
    ,
    [router.pathname],
  )

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 flex z-40 md:hidden' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-blue-700'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <HiX className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex items-center px-4'>
                <img
                  className='h-8 w-auto'
                  src='https://firebasestorage.googleapis.com/v0/b/y3s2-spm.appspot.com/o/Colorful%20Vibrant%20Tree%20Logo%20Template.png?alt=media&token=a011e776-322c-4fc5-b804-cf66f3fe2ec8'
                  alt='Workflow'
                />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer',
                      )}
                    >
                      <item.icon className='mr-4 flex-shrink-0 h-6 w-6 text-blue-300' aria-hidden='true' />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0'>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className='flex flex-col flex-grow pt-5 bg-blue-700 overflow-y-auto'>
          <div className='flex items-center flex-shrink-0 px-4'>
            <img
              className='h-8 w-auto'
              src='https://firebasestorage.googleapis.com/v0/b/y3s2-spm.appspot.com/o/Colorful%20Vibrant%20Tree%20Logo%20Template.png?alt=media&token=a011e776-322c-4fc5-b804-cf66f3fe2ec8'
              alt='Workflow'
            />
          </div>
          <div className='mt-5 flex-1 flex flex-col'>
            <nav className='flex-1 px-2 pb-4 space-y-1'>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={classNames(
                    item.current ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md cursor-pointer',
                  )}
                >
                  <item.icon className='mr-3 flex-shrink-0 h-6 w-6 text-blue-300' aria-hidden='true' />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className='md:pl-64 flex flex-col flex-1'>
        <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 md:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <HiMenuAlt2 className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 px-4 flex justify-between'>
            <div className='flex-1 flex'>
              <div className='w-full flex md:ml-0'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                    <HiSearch className='h-5 w-5' aria-hidden='true' />
                  </div>
                  <input
                    onKeyDown={searchHandler}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    id='search-field'
                    className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
                    placeholder='Search'
                    type='search'
                    name='search'
                  />
                </div>
              </div>
            </div>
            <div className='ml-4 flex items-center md:ml-6'>
              {/* Profile dropdown */}
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button
                    className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    {userNavigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <a
                            onClick={() => router.push(item.href)}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700',
                            )}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main>
          <div className='py-6'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default BasicPageWrapper