import Image from "next/image";
import { useRouter} from "next/router";
function Banner() {
  const router = useRouter();
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
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="text-sm sm:text-lg lg:text-4xl text-primary-color">Not sure where to go?</p>
        <button  onClick={() => router.push({
          pathname: "/searchPage"
        })}
          className="text-purple-500 bg-white px-10 py-4
         rounded-full shadow-md font-bold my-3 lg:mt-16 hover:shadow-xl active:scale-90 transition duration-150 "
        >
          lets explore
        </button>
      </div>
    </div>
  );
}

export default Banner;
