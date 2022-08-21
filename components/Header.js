import Image from "next/image"
import { SearchIcon, GlobeAltIcon, MenuIcon, UserCircleIcon } from "@heroicons/react/solid"

function Header() {
  return (
    // grid-cols-[minmax(0,_1fr)_auto_minmax(0,_1fr)]
    <header className="sticky top-0 z-50 grid grid-cols-3 
     bg-white shadow-md p-5 md:px-10">
     {/* left-logo */}
      <div className="relative flex items-center h-10 cursor-pointer">
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt="logo"
         />
      </div>

      {/* middle-search */}
      <div className="flex items-center md:border-2 rounded-full py-2 shadow-sm w-9/12 md:w-full m-auto">
        <input className="flex-grow bg-transparent pl-2 outline-none w-full" type="text" placeholder="search here" />
        <SearchIcon className="hidden md:inline-flex h-8 text-white bg-red-400 rounded-full p-2 cursor-pointer mr-2 flex-shrink-0" />
      </div>

      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500 cursor-pointer">
      <p className="hidden md:inline">Become a host</p>
      <GlobeAltIcon className="h-6"/>
      <div className="flex border-2 p-2 rounded-full ">
        <MenuIcon className="h-6"  />
        <UserCircleIcon className="h-6" />
      </div>
      </div>
 
    </header>
  )
}

export default Header

