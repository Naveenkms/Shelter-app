import clientPromise from "../lib/mongodb"
import { loadStripe } from '@stripe/stripe-js';

import { useEffect } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";

import { format } from "date-fns";
import axios from "axios";



const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function SearchPage({data}) {
  const router= useRouter();
  const {searchInput, noOfGuests, startDate, endDate} = router.query;
  const formattedDate = `${format(new Date(startDate), "dd MMMM yy")} - ${format(new Date(endDate), "dd MMMM yy")}`;
  
  const createCheckoutSession = async (_id) => {
    const stripe = await stripePromise;
  
  console.log("hello");
    const checkoutSession = await axios.post("/api/checkout_sessions",
    {
      _id: _id,
    })
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    console.log(result);
    if (result.error) {
      alert(result.error.message);
    }
  }
useEffect(() => {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);
  if (query.get('success')) {
    console.log('Order placed! You will receive an email confirmation.');
  }

  if (query.get('canceled')) {
    console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  }
}, []);

  return (
    <div>
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
          {data.map(item => (<InfoCard key={item._id} data={item} createCheckoutSession={createCheckoutSession} />)
          )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export async function getServerSideProps() {
  try {
    const client = await clientPromise;

    const db = client.db("test");

    const datas = await db.collection("datas").find({}).toArray();
   
    const properties = JSON.parse(JSON.stringify(datas))
    const filtered = properties.map(property => {
      const star = JSON.parse(JSON.stringify(property.star));

      return {
        _id: property._id,
        description: property.description,
        img: property.img,
        lat: property.lat,
        location: property.location,
        long: property.long,
        price: property.price,
        star: star.$numberDecimal,
        title: property.title,
      }
    })
  
    return {
      props: { data: filtered }
    }

  } catch (err) {
    console.log(err);
  }
}
