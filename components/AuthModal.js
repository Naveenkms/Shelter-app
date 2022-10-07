import { signIn } from "next-auth/react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";

const AuthModal = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState(" ")
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!email) return false;

    signIn("email", { email, redirect: false });
  };

    const handleChange = (e) => {
      setEmail(e.target.value)
    }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex flex-col justify-center w-full h-[80vh] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 shrink-0 p-1 rounded-md hover:bg-gray-100 transition focus:outline-none"
                >
                  <XIcon className="w-5 h-5" />
                </button>
                <div className="flex flex-col text-center">
                  <form onSubmit={handleSubmit} className="flex flex-col items-center mb-8">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                      placeholder="your email here"
                      className="w-full inline-flex justify-center rounded-md border  bg-blue-50 px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 text-center"
                    />
                    <button
                      className="w-full mt-6 inline-flex justify-center rounded-md border border-transparent bg-[#ff385c] px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Verify With Email
                    </button>
                  </form>
                
                    <p className="my-auto text-gray-500">or</p>

                <div className="mt-8">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => signIn("google")}
                  >
                  <Image
                    src="/google.png"
                    width="16"
                    height="16"
                   />
                    <span className="ml-4"> Google</span> 
                  </button>
                </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
