import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const MobileNav = () => {
  const role = useSelector((state) => state.auth.role); 

  return (
    <>
      {role === "user" && (
      <div className="w-full flex lg:hidden items-center justify-between my-4">
        <Link
          to="/profile"
          className="text-black font-semibold w-full text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
            Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-black font-semibold w-full  text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Order History
        </Link>

        <Link
          to="/profile/settings"
          className="text-black font-semibold w-full text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Settings
        </Link>
    </div>
      )}
      {role === "admin" && (
      <div className="w-full flex lg:hidden items-center justify-between my-4">
        <Link
          to="/profile"
          className="text-black font-semibold w-full text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
            All Request
        </Link>
        <Link
          to="/profile/add-services"
          className="text-black font-semibold w-full  text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Add Services
        </Link>
    </div>
      )}
    </>
  )
}

export default MobileNav
