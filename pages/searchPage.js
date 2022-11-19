import clientPromise from "../lib/mongodb";
import { loadStripe } from "@stripe/stripe-js";

import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import SearchInputDisplay from "../components/SearchInputDisplay";
import InfoCard from "../components/InfoCard";
import Footer from "../components/Footer";

import dateFormat from "../util/dateFormat";

import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function SearchPage({ data }) {
  const { data: session } = useSession();
  const [wishList, setWishList] = useState([]);
  const router = useRouter();
  const {searchInput, noOfGuests} = router.query;
  const createCheckoutSession = async (_id) => {
    const stripe = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout_sessions", {
      _id: _id,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  useEffect(() => {
    if (session) {
      const getWishListItem = async () => {
        const result = await axios
          .get(`/api/get/${session.user.email}`)
          .then((res) => {
            return res.data;
          });
        setWishList(result.data);
      };
      getWishListItem();
    }
  }, [session]);


  const toggleWishList =  (id, data) => {
    setWishList(prev => {
      const isWishListed = prev.find(({productId}) => {
       return productId === id
      })
      // Remove from wishlist
      if(isWishListed) {
         axios.delete(`/api/wishLists/${id}/${session.user.email}`) 
            return prev.filter(({productId}) => productId !== id);
      }
      // Add to wishlist
      else {
        axios.post("/api/wishLists", {
          data,
          email: session.user.email,
        })
            return [...prev, {productId: id}];
      }

    })
  }


  return (
    <div>
      <Header
        placeholder= "Search Place"
      />
      <main>
        <section className="p-5 md:px-10">
   
        <SearchInputDisplay query={router.query}/>
         
         

          <div className="hidden lg:flex mt-2 mb-6 space-x-4">
            {[
              "Cancellation Flexibility",
              "Type of Place",
              "Price",
              "Rooms and Beds",
              "More Filter",
            ].map((filter, index) => (
              <p key={index} className=" px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transform duration-100 ease-out">
                {filter}
              </p>
            ))}
          </div>
          <div>
            {data.map(item => <InfoCard key={item._id} data={item} wishListed={!!wishList.find(({productId}) => productId === item._id)} toggleWishList={toggleWishList} createCheckoutSession={createCheckoutSession}/>)}
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

    const properties = JSON.parse(JSON.stringify(datas));
    const filtered = properties.map((property) => {
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
      };
    });

    return {
      props: { data: filtered },
    };
  } catch (err) {
    console.log(err);
  }
}
