import Image from "next/image";
import Link from 'next/link'

const Logo = () => {
  return (
    <div  className="relative flex items-center h-10 cursor-pointer">
    <Link href="/">
    <Image 
      src="/shelter.png"
      layout="fill"
      objectFit="contain"
      objectPosition="left"
      alt="logo"
    />
    </Link>
  </div>
  )
}

export default Logo