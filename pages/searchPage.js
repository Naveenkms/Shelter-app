import { useRouter } from "next/router";

import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";

import { format } from "date-fns";


export default function SearchPage({data}) {
  const router= useRouter();
  const {searchInput, noOfGuests, startDate, endDate} = router.query;
  const formattedDate = `${format(new Date(startDate), "dd MMMM yy")} - ${format(new Date(endDate), "dd MMMM yy")}`;

  return (
    <>
      <Header placeholder={`${searchInput} | ${formattedDate} | ${noOfGuests}`}/>
      <main>
        <section>
          <p className="text-sm"> {formattedDate} stays for {noOfGuests} guests</p>

          <h1 className="text-3xl font-semibold mt-2 mb-4">Stays in {searchInput}</h1>

          <div className="hidden lg:flex mt-2 mb-6 space-x-4">
          {
            ["Cancellation Flexibility", "Type of Place", "Price", "Rooms and Beds", "More Filter"].map(filter => (
              // eslint-disable-next-line react/jsx-key
              <p className=" px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transform duration-100 ease-out">{filter}</p> 

            ))
          }
          </div>
          <div>
          {data.map(item => (<InfoCard key={item.img} data={item} />)
          )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

// "https://links.papareact.com/isz"
export async function getServerSideProps() {
  const res = await fetch("https://links.papareact.com/isz")
  const data = await res.json();

  return {
    props: {data}
  }
}
