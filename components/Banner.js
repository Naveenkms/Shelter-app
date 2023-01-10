import Image from "next/image";
import Link from 'next/link'
function Banner() {
  return (
    <div
      className="relative h-[300px] sm:h-[400px]
                     lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
    >
      <Image
        src="/banner-img.jpg"
        layout="fill"
        objectFit="cover"
        alt="banner image"
        priority
        className=""
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-4xl md:text-6xl lg:text-8xl 2xl:text-9xl text-slate-50">Your travel is our journey</p>
        <button
          className="text-primary-color border-y-2 border-white text-2xl
          shadow-md font-bold my-6 lg:mt-16 hover:border-slate-400 active:scale-90 transition duration-150 "
        >
        <Link href="/searchPage">
          lets explore
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Banner;
