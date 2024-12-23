import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from '../components/Loaders/Loader';
import Bookcard from '../components/Bookcard/Bookcard';
const AllServices = () => {
  const [Data, setData] = useState();
    useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-services"
      );
      // console.log(response.data.data);
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-gray-200 px-12 py-8 h-auto ">
      <h4 className="text-3xl text-green-500">All Services</h4>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader /> {" "}
        </div>
      )}
      <div className="my-8  grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
        {Data && Data.map((items, i) => (
          <div key={i}>
            <Bookcard data={items} /> {" "}
          </div> 
      ))}
      </div>
    </div>
  )
}

export default AllServices;