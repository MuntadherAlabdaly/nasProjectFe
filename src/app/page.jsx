import Head from 'next/head';
import AboutUs from "../components/About/AboutUs";
import Footer from "../components/Footer/Footer";
import Banner from "../components/Header/Banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Bu-Taama - Watch Your Food Being Made Live!</title>
        <meta name="description" content="Experience the magic of cooking! Watch live streams of our chefs preparing your food in real-time. A dining experience like never before!" />
        
        <meta property="og:title" content="Bu-Taama - Watch Your Food Being Made Live!" />
        <meta property="og:description" content="See your meal being cooked by expert chefs in real-time. A unique and transparent dining experience!" />
        <meta property="og:url" content="https://bu-taama.fly.dev/" />
        
        <meta name="twitter:title" content="Bu-Taama - Live Kitchen Streaming 🍽️🔥" />
        <meta name="twitter:description" content="At Bu-Taama, we bring the kitchen to you! Watch your dish being crafted live by our chefs." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main>
        <Banner />
        <AboutUs />
        <Footer />
      </main>
    </>
  );
}
