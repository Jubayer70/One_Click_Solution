import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loaders/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  // const isLoggedIN = useSelector();
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-information",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);
  
  return (
    <div className="bg-zinc-200 px-2 md:px-12 py-8 md:py-8 flex flex-col md:flex-row  gap-4 text-white">
      {!profile && <Loader className="w-full h-[100%] flex items-center justify-center"/>}
      {profile && (
      <>
        <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
            <MobileNav />
        </div>
        <div className="w-full md:w-5/6">
          <Outlet />
        </div>
      </>
      )}
    </div>
  )
};
export default Profile;