 import Image from "next/image";
 import { useRouter } from "next/router";

function BigCard({img, title, description, buttonText}) {
  const router = useRouter();
  return (
    <div className="relative py-16">
        <div className="relative h-96 min-w-[300px]">
        {/*eslint-disable-next-line jsx-a11y/alt-text*/}
            <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl"/>
        </div>

        <div className="absolute top-32 left-12 text-white"> 
            <h3 className="text-4xl mb-3 w-64">{title}</h3>
            <p>{description}</p>

            <button onClick={() => router.push("/searchPage")} className="text-sm bg-gray-900 px-4 py-2 rounded-lg mt-5">{buttonText}</button>
        </div>
    </div>
  )
}

export default BigCard