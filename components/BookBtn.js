import { useState } from "react";

const BookBtn = ({ createCheckoutSession, id }) => {
  const [click, setClick] = useState(false);
  return (
    <button
      onClick={() => {
        setClick(true);
        createCheckoutSession(id);
      }}
      className={`w-24 py-2 hover:py-[6px] hover:bg-white hover:text-black hover:border-solid hover:border-black hover:border-2 my-4 rounded-md bg-primary-color text-white`}
    >
      {click ? <span className="animate-ping font-mono font-extrabold">....</span> : "Book"}
    </button>
  );
};

export default BookBtn;
