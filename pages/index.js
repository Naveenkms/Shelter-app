import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import SmallCard from "../components/SmallCard";
import BigCard from "../components/BigCard";
import Footer from "../components/Footer";
import HrScrollContainer from "../components/HrScrollContainer";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="google-site-verification"
          content="mJTNjd0R12pInGPFlVdPEzc05DnabgetzaiTDkhIbLk"
        />
        <title>Shelter</title>
      </Head>

      <Header placeholder="Search Place"/>

      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold pb-5 ">Explore Nearby</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-5 my-5">
            {exploreData?.map((item) => (
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
          <HrScrollContainer cardsData={cardsData}/>
        </section>

        <section>
          <BigCard
            img="/house-cartoon.jpg"
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
  const exploreData = await fetch("https://www.jsonkeeper.com/b/QW2Z").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://www.jsonkeeper.com/b/VBWJ").then(
    (res) => res.json()
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
