import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { useState } from "react";
import MediumCard from "./MediumCard";

function HrScrollContainer({ cardsData }) {
  const [scrollEnd, setScrollEnd] = useState(false);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth;
    if (bottom) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  };
  return (
    <>
      <h2 className="text-4xl font-semibold py-8  ">Live Anywhere</h2>
      <div className="relative">
        <div
          onScroll={handleScroll}
          className="flex space-x-3 overflow-x-auto scrollbar-hide p-3 -m-3"
        >
          {cardsData?.map(({ img, title }) => (
            <MediumCard key={title} img={img} title={title} />
          ))}
        </div>
        {!scrollEnd && (
          <ArrowCircleRightIcon className="animate-pulse absolute right-0 top-[35%] z-40 h-14 text-[#ff385c]" />
        )}
      </div>
    </>
  );
}

export default HrScrollContainer;
