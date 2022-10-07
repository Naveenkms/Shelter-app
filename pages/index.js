import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import BigCard from "../components/BigCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";


export default function Home({ exploreData, cardsData }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
 
  const openModal = () => setIsOpen(true);;

 

  return (
    <div className={styles.container}>
    
      <Head>
        <title>Airbnb clone</title>
      </Head>

      <Header openModal={openModal} />

      <AuthModal isOpen = {isOpen} closeModal = {closeModal}/>
      
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">

        <section className="pt-6">
          <h1 className="text-4xl font-semibold pb-5 ">Explore Nearby</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 my-5">
            {exploreData?.map((item /* optionalchaining */) => (
              <SmallCard
                key={item.img}
                img={item.img}
                loc={item.location}
                dis={item.distance}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8  ">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide p-3 -m-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={title} img={img} title={title} />
            ))}
          </div>
        </section>

        <section>
          <BigCard 
            img="https://links.papareact.com/4cj"
            title="The Greatest Outdoors"
            description="wishlist curated by Airbnb."
            buttonText="Get Inspired"
          />
        </section>

      </main>

      <Footer />
      
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then((res) =>
    res.json()
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
