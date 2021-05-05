import React from "react";
import Application from "../components/Application";
import About from "../components/About";
import Carosel from "../components/carousel/Carosel";
import Footer from "../components/Footer";
import HomeBar from "../components/navigation/HomeBar";
import OurOffers from "../components/OurOffers";

const Home = () => {
  return (
    <>
      <HomeBar />
      <Carosel />
      <OurOffers />
      <Application />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <About />
      <Footer />
    </>
  );
};

export default Home;