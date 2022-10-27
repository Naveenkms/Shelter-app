import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import { loadStripe } from "@stripe/stripe-js";

import clientPromise from "../lib/mongodb";

import { useSession } from "next-auth/react";

import { useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import InfoCard from "../components/InfoCard";

import { EmojiSadIcon }  from "@heroicons/react/outline";

import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const wishList = ({data}) => {
  const { data: session } = useSession();
  const [wishList, setWishList] = useState(data);

  const isEmpty = data.length === 0;

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

  const toggleWishList =  (id, data) => {
    setWishList(prev => {
      const isWishListed = prev.find(({_id}) => {
       return _id === id
      })
      // Remove from wishlist
      if(isWishListed) {
         axios.delete(`/api/wishLists/${id}/${session.user.email}`) 
            return prev.filter(({_id}) => _id !== id);
      }
      // Add to wishlist
      else {
        axios.post("/api/wishLists", {
          data,
          email: session.user.email,
        })
            return [...prev, {_id: id}];
      }

    })
  }

  
  return (
    <div>
    <Header />
    <div className="p-5 md:px-10">
    {isEmpty ? <div className="flex justify-center items-center h-72 my-12 bg-orange-200"><h1 className="text-2xl md:text-5xl font-semibold text-gray-600">No WishList Item</h1><EmojiSadIcon className="h-12 md:h-24" stroke="#4B5563" /></div> : data.map(item => <InfoCard key={item._id} data={item} wishListed={!!wishList.find(({_id}) => _id === item._id)} toggleWishList={toggleWishList} createCheckoutSession={createCheckoutSession}/>)}
    </div>
    <Footer />
    </div>
  )
}

export default wishList;

export async function getServerSideProps(context) {
  try {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
 

  if (!session) {
    return {
      redirect: {
      destination: "/",
      permanent: false,
    },
    }
    }
  
  if (session) {
    const email = session.user.email;
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("wishList");
    const data = await collection.find({email: email}).toArray();
    const wishLists = JSON.parse(JSON.stringify(data));
    const filtered = wishLists.map((property) => {
     

      return {
        _id: property.productId,
        description: property.description,
        img: property.img,
        lat: property.lat,
        location: property.location,
        long: property.long,
        price: property.price,
        star: property.star,
        title: property.title,
      };
    });
    return {
      props: { data: filtered },
    };
  }

} catch (err) {
  console.log(err);
}
}