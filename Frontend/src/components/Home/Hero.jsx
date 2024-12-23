import React from 'react'
import heroimg from "../../assets/cover.jpeg"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gray-200">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-start justify-center px-4 md:px-8">
        <h1 className="text-4xl lg:text-6xl md:text-5xl font-semibold text-green-600 text-left">
          Your One-Click for Home Comfort
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-600">
          "From driving and childcare to cleaning, plumbing, and electrical repairs making your life easier, safer, and more comfortable."
        </p>
        <div className='mt-8'>
          <Link
            to='/all-services'
            className="text-red-500 text-2xl font-semibold border border-black px-10 py-3 hover:bg-green-200 rounded-full">
            Discover Services
          </Link>
        </div>
      </div>
      <div className="mt-20 w-full lg:w-3/6 flex items-center justify-center px-4 md:px-8">
        <img src={heroimg} alt='hero' className="object-contain w-3/4 h-auto" />
      </div>
    </div>
  );
};

export default Hero;