import HeroSection from "./HeroSection";
import SearchBar from "./SearchBar";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "../Jobs/LatestJobs";
import Departments from "./Departments";
import TestimonialCarousel from "./TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

const Home = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <HeroSection />
      <SearchBar />
      <CategoryCarousel />
      <LatestJobs />
      <Departments />
      <section className="py-20 bg-gray-800 text-white mt-10">
        <h2 className="text-4xl text-center text-cyan-400 font-bold tracking-wide mb-10">
          Hero Testimonials
        </h2>
        <TestimonialCarousel />
      </section>
      <section className="py-20 bg-black">
        <h2 className="text-4xl text-center text-cyan-400 font-bold tracking-wide mb-10">
          Apply Now
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
          Ready to join the fight? Sign up or log in to apply for exclusive
          positions with the Avengers. Make a difference and become a part of
          something bigger.
        </p>
        <p  className="text-gray-400 text-center mb-10">
          *Disclaimer: Superhero suits are not included. Capes are optional but
          highly recommended for dramatic effect!
        </p>
        <div className="flex justify-center space-x-4">
          <Button  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold transition duration-300">
          <p onClick={()=>(
          navigate('/signup')
         )}>Signup</p>
          </Button>


          <Button  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold transition duration-300" >
         <p onClick={()=>(
          navigate('/login')
         )}>Login</p>

          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
