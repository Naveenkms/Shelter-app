import Image from "next/image";

function SmallCard({ img, loc, dis }) {
  return (
    <div className="flex items-center space-x-4  rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-200 ease-out">
    {/* left-image */}
      <div className="relative h-16 w-16 ">
        <Image src={img} alt="image" layout="fill" className="rounded-lg" />
      </div>
      {/*right  */}
      <div>
        <h2>{loc}</h2>
        <h3 className="text-gray-500">{dis}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
