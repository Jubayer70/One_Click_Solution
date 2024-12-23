import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../Loaders/Loader';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewServicesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  // console.log(isLoggedIn);
  // console.log(role);
 
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-services-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    servicesid: id,
  }
  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-services-to-favourite", {}, { headers });
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers })
    alert(response.data.message);
  };
  const deleteServices = async () => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-services",
      { headers }
    );
    //console.log(response.data.message);
    alert(response.data.message);
    navigate("/all-services");
  }

  return (
    <>
      {Data ? (
        <div className="px-4 md:px-12 py-8 bg-white flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            <div className="flex flex-col md:flex-row justify-around bg-white p-6 md:p-12 rounded">
              <img
                src={Data.url}
                alt={Data.title}
                className="max-h-[50vh] lg:max-h-[70vh] rounded object-cover mb-4 md:mb-0"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col gap-4 md:gap-8 mt-4 md:mt-0">
                  <button className="bg-white rounded-full text-3xl p-3 text-red-700 hover:bg-red-100 transition duration-300" onClick={handleFavourite}>
                    <FaHeart />
                  </button>
                  <button className="bg-white rounded-full text-3xl p-3 text-blue-700 hover:bg-blue-100 transition duration-300 flex items-center" onClick={handleCart}>
                    <FaCartPlus />
                    <span className="ml-2 block md:hidden text-sm">Add to Cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col gap-4 md:gap-8 mt-4 md:mt-0">
                  <Link
                    to={`/updateservices/${id}`}
                    className="bg-white rounded-full text-3xl p-3 text-red-700 hover:bg-red-100 transition duration-300"
                  >
                    <FaEdit />
                  </Link>
                  <button className="bg-white rounded-full text-3xl p-3 text-blue-700 hover:bg-blue-100 transition duration-300 flex items-center" onClick={deleteServices}>
                    <MdOutlineDelete />{" "}
                    <span className="ml-2 block md:hidden text-sm">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full lg:w-1/2">
            <h1 className="text-4xl text-green-500 font-semibold">{Data.title}</h1>
            <p className="text-black mt-4 text-xl">{Data.desc}</p>
            <p className="mt-4 text-black text-3xl font-semibold">
              Price : ৳ {Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewServicesDetails;
