/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { HeartIcon as OutlineIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";

function InfoCard({ data }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div className="flex hover:opacity-80 hover:shadow-lg transition duration-200 ease-out pr-4 py-7 px-2 border-b cursor-pointer  first:border-t ">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={data.img}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl"
        />
      </div>
      <div className=" flex flex-grow flex-col pl-5">
        <div className="flex justify-between">
          <p>{data.location}</p>

          {!click ? (
            <OutlineIcon onClick={handleClick} className="h-7 cursor-pointer" />
          ) : (
            <SolidIcon
              onClick={handleClick}
              className="h-7 cursor-pointer text-red-500"
            />
          )}
        </div>

        <h4 className="text-xl">{data.title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 ">{data.description}</p>
        <div className="flex justify-between flex-grow items-end">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {data.star}
          </p>
          <div>
            <p className="text-lg md:text-2xl pb-2 font-semibold">
              {data.price}
            </p>
            <p className="text-right font-extralight">{data.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
