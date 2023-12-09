import React, { useState } from 'react'

import { HiMenuAlt4 } from 'react-icons/hi'
import { IoCloseOutline } from 'react-icons/io5'

import logo from '../assets/images/logo.png'

interface NavbarItemProps {
  title: string
  classProps?: string
}

const NavbarItem = ({ title, classProps }: NavbarItemProps) => (
  <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>
)

function Navbar() {
  const navItems = ['Market', 'Exchange', 'Tutorial', 'Wallet']
  const [isOpened, setToggleMenu] = useState(false)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none justify-between items-center">
        {navItems.map((item, index) => (
          <NavbarItem key={item + index} title={item} />
        ))}
        <li>
          <button
            className="bg-green-600 ml-3 px-7 py-2 font-semibold rounded-xl
          hover:bg-green-400 hover:text-gray-800">
            Login
          </button>
        </li>
      </ul>
      <div className="flex relative">
        {isOpened ? (
          <IoCloseOutline
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {isOpened && (
          <ul
            className="fixed top-0 -right-2 z-10 w-3/4 h-screen p-3 md:hidden list-none 
          flex flex-col items-end rounded-md text-white 
          blue-glassmorphism animate-slide-in">
            <li className="text-xl w-full my-2">
              <IoCloseOutline onClick={() => setToggleMenu(false)} className="cursor-pointer" />
            </li>
            {navItems.map((item, index) => (
              <NavbarItem key={item + index} title={item} classProps="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
