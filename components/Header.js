import { useState } from "react";
import Image from "next/image";
import { useRouter} from "next/router";
import { useSession } from "next-auth/react";
import AuthModal from "../components/AuthModal";

import Logo from "./Logo";

import {
  SearchIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import ProfileDropdownCard from "./ProfileDropdownCard";
import "react-date-range/dist/styles.css"; //date library main css file
import "react-date-range/dist/theme/default.css"; //date library theme css file
import { DateRange } from "react-date-range";
// import {addDays} from "date-fns";

function Header({placeholder}) {
  const [isOpen, setIsOpen] = useState(false);

  
  const [searchInput, setSearchInput] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [noOfGuests, setNoOfGuests] = useState(1);

  const [click, setClick] = useState(false);

  const [inputClick, setInputClick] = useState(false)

  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const {data: session} = useSession();

  const closeModal = () => setIsOpen(false);
 
  const openModal = () => setIsOpen(true);;
  

  return (
    <header
      className="fixed w-full top-0 z-50 grid grid-cols-3 
    bg-white/0 p-5 md:px-10 "
    >
      {/* left-logo */}
      <Logo />

      {/* middle-search */}
      <div className="flex items-center md:border-2 rounded-full py-2 shadow-sm w-9/12 md:w-full m-auto">
        <input
          onChange={handleChange}
          onClick={() => setInputClick(prev => !prev)}
          value={searchInput}
          className="flex-grow text-primary-color placeholder:text-primary-color placeholder:text-center bg-transparent outline-none w-full"
          type="text"
          placeholder={placeholder}
        />
        <SearchIcon onClick={() => router.push({
          pathname: "/searchPage",
          query: {
            searchInput,
            noOfGuests,
            startDate: range[0].startDate.toISOString(),
            endDate: range[0].endDate.toISOString()
          }
        })} className="hidden md:inline-flex h-8 text-white bg-primary-color rounded-full p-2 cursor-pointer mr-2 flex-shrink-0" />
      </div>

      {/* right */}
      <div className="relative flex items-center space-x-4 justify-end text-gray-500 cursor-pointer">
        <div className="flex border-2 border-slate-200 border-solid hover:border-primary-color hover:border-dashed transition duration-150 p-2 rounded-full hover:shadow-md" onClick={() => setClick(prevState => !prevState)}>
          <MenuIcon className="h-6 mr-1 text-primary-color" />
          {session ? <Image src={session.user.image} width="24" height="24" className="rounded-full" />
                   : <UserCircleIcon className="h-6 text-slate-200" />
           } 
            
        </div>
        {click && <ProfileDropdownCard openModal={openModal} />}
        <AuthModal isOpen = {isOpen} closeModal = {closeModal}/>
      </div>

      {inputClick && (
        <div className="col-span-3 mx-auto mt-2 sm:mt-0">
          {/* calendar */}
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            minDate={new Date()}
            rangeColors={["#ff385c"]}
          />
          {/* Guest number */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-primary-color font-semibold">Number of guests</h2>
            <div className="flex items-center">
              <UsersIcon className="h-5 text-primary-color mr-2" />
              <input
                className="outline-none w-12 pl-2 text-lg text-[#ff385c]"
                onChange={(e) => setNoOfGuests(e.target.value)}
                value={noOfGuests}
                type="number"
                min={1}
              />
            </div>
          </div>
          {/* cancel & search */}
          <div className="flex font-bold justify-around ">
            <button className="text-primary-color" onClick={() => setInputClick(prev => !prev)}>Cancel</button>
            
            <button onClick={() => router.push({
              pathname: "/searchPage",
              query: {
                searchInput,
                noOfGuests,
                startDate: range[0].startDate.toISOString(),
                endDate: range[0].endDate.toISOString()
              }
            })} className="text-[#ff385c]" >Search</button>
            
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
