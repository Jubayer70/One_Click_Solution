import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loaders/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => { 
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-order-history",{ headers });
      console.log(response.data.data);
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);
  
  return (
    <>
      {!OrderHistory && <div className="flex items-center justify-center h-[100%]"><Loader /></div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-black">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-black mb-8">
                No Order History
            </h1>
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-black">
          <h1 className="text-3xl md:text-5xl font-semibold text-black mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-200 w-full rounded py-2 px-4 flex  gap-2">
            <div className="w-[10%] md:w-[3%]">
              <h1 className="text-center">Sr.</h1> 
            </div>
            <div className="w-[30%] md:w-[22%]">
              <h1 className="">Services</h1>
            </div>
            <div className="w-[40%] md:w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[20%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1 className="">Payment</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            items.services ? (
              <div key={i} className="bg-zinc-200 w-full rounded py-2 px-4 flex gap-2">
                <div className="w-[10%] md:w-[3%]">
                  <h1 className="text-center">{i+1}</h1>
                </div>
                <div className="w-[30%] md:w-[22%]">
                  <Link to={`/view-services-details/${items.services._id}`}
                    className="hover:text-blue-300">
                      {items.services.title}
                  </Link>
                </div>
                <div className="w-[40%] md:w-[45%]">
                  <h1 className="">{ items.services.desc.slice(0,50)}...</h1>
                </div>
                <div className="w-[20%] md:w-[9%]">
                  <h1 className="">৳ {items.services.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold text-black">
                  {items.status === "Request Placed" ? (
                    <div className="text-blue-500">{items.status}</div>
                  ) : items.status === "Services is coming" ? (
                    <div className="text-yellow-500">{items.status}</div>
                  ) : items.status === "Resolved" ? (
                    <div className="text-green-500">{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">{items.status}</div>
                  ) : items.status === "Pending" ? (
                    <div className="text-blue-200">{items.status}</div>
                  ) : items.status === "Rejected" ? (
                    <div className="text-red-900">{items.status}</div>
                  ) : (items.status)}
                  </h1>                 
                </div>
                <div className="w-[20%] md:w-[5%]">
                  <h1 className="text-sm text-black">COD</h1>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
