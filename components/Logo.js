import Image from "next/image";
import { useRouter} from "next/router";

const Logo = () => {
    const router = useRouter();
  return (
    <div onClick={() => router.push("/")}  className="relative flex items-center h-10 cursor-pointer">
    <Image 
      src="/shelter.png"
      layout="fill"
      objectFit="contain"
      objectPosition="left"
      alt="logo"
    />
  </div>
  )
}

export default Logo