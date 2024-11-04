import { Button } from '@/components/ui/button';
import React from 'react';
import { FaRobot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-black via-gray-800 to-black text-white bg-cover">
      <h1 className="text-cyan-400 text-4xl font-bold m-4 flex items-center">
        Error 404
        <FaRobot className="w-10 h-10 ml-2" />
      </h1>

      <h2 className="text-2xl md:text-4xl font-semibold mb-4">
        Oops! We couldn’t find that page.
      </h2>

      <p className="text-gray-400 max-w-md mb-10">
        Looks like you’re lost in space. But don’t worry, our heroes are here to guide you back.
      </p>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Link to="/">
          <Button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full font-bold transition duration-300">
            Return Home
          </Button>
        </Link>
        <Link to="/jobs">
          <Button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition duration-300">
            Browse Jobs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
