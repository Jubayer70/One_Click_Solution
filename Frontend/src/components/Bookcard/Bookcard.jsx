import axios from 'axios';
import React from 'react';
import { Link } from "react-router-dom";

const Bookcard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    servicesid: data._id,
  };

  const handleRemoveServices = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/delete-services-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="max-w-sm mx-auto my-4 sm:w-full">
      <Link to={`/view-services-details/${data._id}`}>
        <div className="bg-[#c0dfd0] rounded-lg p-4 flex flex-col hover:shadow-xl transition-shadow duration-300">
          <div className="bg-[#c0dfd0] rounded-lg flex items-center justify-center overflow-hidden">
            <img src={data.url} alt={data.title} className="h-64 w-full object-cover transform hover:scale-105 transition-transform duration-300" />
          </div>
          <h2 className="mt-4 text-xl text-black font-bold">{data.title}</h2>
          <p className="mt-2 text-black font-bold text-xl">৳ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-red-500 px-4 py-2 rounded border text-white hover:bg-red-600 transition-colors duration-300 mt-4"
          onClick={handleRemoveServices}
        >
          Remove From Favourites
        </button>
      )}
    </div>
  );
};

export default Bookcard;
