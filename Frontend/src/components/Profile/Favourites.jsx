import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import Bookcard from '../Bookcard/Bookcard';

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-services", { headers });
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [FavouriteBooks]);
  
  return (
    <>
        {
          FavouriteBooks && FavouriteBooks.length === 0 &&
          <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full">
            No Favourites Added 
          </div>
        }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          FavouriteBooks && FavouriteBooks.map((items, i) =>
          <div key={i}>
            <Bookcard data={items} favourite={true} />
          </div>)
        }
      </div>
    </>
  );
};

export default Favourites;
