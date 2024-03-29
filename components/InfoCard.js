/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import { HeartIcon as OutlineIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AuthModal from "./AuthModal";
import BookBtn from "./BookBtn";

function InfoCard({ data, wishListed=false, toggleWishList, createCheckoutSession }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);


  return (
    <div className="flex flex-col md:flex-row hover:shadow-lg transition duration-200 ease-out border-b cursor-pointer  first:border-t ">
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

          {session ? (
            <OutlineIcon
              onClick={(e) => {
                e.preventDefault();
                toggleWishList(data._id, data)
              } }
              className="h-7 cursor-pointer"
              fill={wishListed ? "#ff385c" : "none"}
              stroke={wishListed ? "#ff385c" : "currentColor"}
            />
          ) : (
            <OutlineIcon
              onClick={() => openModal()}
              className="h-7 cursor-pointer"
            />
          )}
        </div> 

        <AuthModal isOpen={isOpen} closeModal={closeModal} />

        <h4 className="text-xl">{data.title}</h4>

        <div className="border-b w-10 pt-2" />

        <p className="pt-2 text-sm text-gray-500 ">{data.description}</p>
        <div className="flex justify-between flex-grow items-end">
          <div>
           <BookBtn createCheckoutSession={createCheckoutSession} id={data._id} openModal={openModal} session={session}/>
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
