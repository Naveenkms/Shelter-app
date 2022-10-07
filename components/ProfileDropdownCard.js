import { useSession, signIn, signOut } from "next-auth/react";



 
function ProfileDropdownCard({openModal}) {
    const { data: session } = useSession();
  
  return (
    <div className="absolute top-full max-w-[50vw] md:w-2/4 m-2 z-50 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)] bg-white rounded-md ">
        <div className="flex flex-col py-4 border-b-2">
        { session  
                 ? <a onClick={() => signOut()} className="hover:bg-gray-100 p-2">Sign out</a>
                 :  <><a onClick={() => openModal()} className="text-black hover:bg-gray-100 p-2">Log in</a>
                      <a onClick={() => openModal()} className="hover:bg-gray-100 p-2">Sign up</a>
                    </>
                }
 
        </div>
        <div className="py-4">
            <ul>
            <li className="hover:bg-gray-100 p-2">Host your home</li>
            <li className="hover:bg-gray-100 p-2">Host an experience</li>
            <li className="hover:bg-gray-100 p-2">Help</li>
            </ul>
        </div>   
    </div>
  )
}

export default ProfileDropdownCard