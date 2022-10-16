/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { HeartIcon as OutlineIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";

function InfoCard({ data, createCheckoutSession }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };
 

  return (
    <div className="flex flex-col md:flex-row hover:shadow-lg transition duration-200 ease-out pr-4 py-7 px-2 border-b cursor-pointer  first:border-t ">
      <div className="relative w-full h-52 md:w-80 flex-shrink-0">
        <Image
          src={data.img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className=" flex flex-grow flex-col p-5">
        <div className="flex justify-between">
          <p>{data.location}</p>

          {!click ? (
            <OutlineIcon onClick={handleClick} className="h-7 cursor-pointer" />
          ) : (
            <SolidIcon
              onClick={handleClick}
              className="h-7 cursor-pointer text-[#ff385c]"
            />
          )}
        </div>

        <h4 className="text-xl">{data.title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 ">{data.description}</p>
        <div className="flex justify-between flex-grow items-end">
        <div>
          <button onClick={() => createCheckoutSession(data._id)} className="w-24 py-2 hover:py-[6px] hover:bg-white hover:text-black hover:border-solid hover:border-black hover:border-2 my-4 rounded-md bg-[#ff385c] text-white">
            Book
          </button>
          <p className="flex items-center">
            <StarIcon className="h-5" />
            {data.star}
          </p>
          </div>
          <div>
            <p className="text-lg md:text-2xl font-semibold">
              ₹{data.price}/day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
