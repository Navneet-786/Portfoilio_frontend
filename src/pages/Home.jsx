import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import MyApps from "./miniComponents/MyApps";
import About from "./miniComponents/About";
import { ThemeProvider } from "@/components/theme-provider";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";

const Home = () => {
  return (
    <article className="   md:mt-16 lg:mt-24 xl:mt-10 sm:mx-auto w-full md:max-w-[90%] flex flex-col gap-14   px-10 py-10 rounded-lg shadow-lg">
      <Hero />
      <Timeline />
      <About />
      <Portfolio />
      <Skills />
      <MyApps />
      <Contact />
    </article>
  );
};

export default Home;
