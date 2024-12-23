import React, { useState } from 'react'
import logo from '../../../src/naion.png'
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About US",
      link: "/about-us",
    },
    {
      title: "All services",
      link: "/all-services",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  
  if (isLoggedIn === false) {
    links.splice(3, 3);
    links.splice(1, 1);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(5, 1);
    links.splice(1, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 2);
    links.splice(1, 1);
  }

  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="z-50 relative flex bg-green-800 text-white font-bold px-8 py-4 items-center justify-between">
        <div className='flex items-center'>
          <Link to = "/">
            <img className='h-10 mr-4' src={logo} alt='logo'/>
          </Link>
          <Link to ="/">
              <h1 className="text-2xl font-semibold">ONE CLICK SOLUTION</h1>
          </Link>
        </div>
        <div className="navlinks block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) =>(
              <div className="flex items-center justify-center" key={i}>
                {item.title === "Profile" || item.title === "Admin Profile" ?
                  <Link to={item.link} className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    {item.title}
                  </Link> :
                  <Link to={item.link} className="hover:text-green-500 transition duration-300">
                    {item.title}
                  </Link>
                }
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link to="/LogIn" className="px-4 py-2 border border-green-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">Log In</Link>
              <Link to="/SignUp" className="px-4 py-2 bg-green-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">Sign Up</Link>
            </div>
          )}
          <button className='block md:hidden text-white text-2xl hover:text-red-500' onClick={() => (MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
            <FaGripLines />
          </button>
        </div>
      </nav> 
      <div className={`${MobileNav} bg-green-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((item, i) =>(
          <Link to={item.link} className="mb-8 text-white text-4xl font-semibold hover:text-green-500 transition-all duration-300"
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")}>
              {item.title}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link to="/LogIn"
              onClick={() =>
              MobileNav === "block"
                ? setMobileNav("hidden")
                : setMobileNav("block")}
              className="mb-8 text-3xl font-semibold px-8 py-2 border border-green-500 rounded bg-white hover:bg-red-700 text-zinc-800 transition duration-300">Log In</Link>
            <Link to="/SignUp"
              onClick={() =>
              MobileNav === "block"
                ? setMobileNav("hidden")
                : setMobileNav("block")}
              className="mb-8 text-3xl font-semibold px-8 py-2 bg-green-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300">Sign Up</Link>
          </>
        )}
      </div>
    </>
  )
}

export default Navbar;