import { useState } from "react";
import Image from "next/image";
import { useRouter} from "next/router"

import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; //date library main css file
import "react-date-range/dist/theme/default.css"; //date library theme css file
import { DateRange } from "react-date-range";
// import {addDays} from "date-fns";

function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [noOfGuests, setNoOfGuests] = useState(1);

  const router = useRouter();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <header
      className="sticky top-0 z-50 grid grid-cols-3 
    bg-white shadow-md p-5 md:px-10 "
    >
      {/* left-logo */}
      <div onClick={() => router.push("/")}  className="relative flex items-center h-10 cursor-pointer">
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
        <input
          onChange={handleChange}
          value={searchInput}
          className="flex-grow bg-transparent pl-2 outline-none w-full"
          type="text"
          placeholder={placeholder ? placeholder :"search here"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 text-white bg-red-400 rounded-full p-2 cursor-pointer mr-2 flex-shrink-0" />
      </div>

      {/* right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500 cursor-pointer">
        <p className="hidden md:inline">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex border-2 p-2 rounded-full ">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="col-span-3 mx-auto mt-2 sm:mt-0">
          {/* calendar */}
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
          />
          {/* Guest number */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Number of guests</h2>
            <div className="flex items-center">
              <UsersIcon className="h-5" />
              <input
                className="outline-none w-12 pl-2 text-lg text-red-400"
                onChange={(e) => setNoOfGuests(e.target.value)}
                value={noOfGuests}
                type="number"
                min={1}
              />
            </div>
          </div>
          {/* cancel & search */}
          <div className="flex justify-around ">
            <button className="text-gray-500" onClick={() => setSearchInput("")}>Cancel</button>
            
            <button onClick={() => router.push({
              pathname: "/searchPage",
              query: {
                searchInput,
                noOfGuests,
                startDate: range[0].startDate.toISOString(),
                endDate: range[0].endDate.toISOString()
              }
            })} className="text-red-400" >Search</button>
            
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
