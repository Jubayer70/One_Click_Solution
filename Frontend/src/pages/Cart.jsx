import React, { useEffect, useState } from 'react';
import Loader from '../components/Loaders/Loader';
import axios from 'axios';
import { MdCleanHands, MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(res.data.data);
      // console.log(Cart)
    }; fetch();
  }, [Cart]);

  const deletedItem = async (servicesid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${servicesid}`, {}, { headers });
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);

const PlaceOrder = async () => {
  try {
    const response = await axios.post(
    `http://localhost:1000/api/v1/place-order`,
    { order: Cart },
    { headers }
    );
    alert(response.data.message);
    navigate("/profile/orderHistory");
  } catch (error) {
    alert(error);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-white px-4 md:px-12">
      <div className="flex-grow">
        {!Cart && <Loader />}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-400">
                Empty Cart
              </h1>
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <div className="h-auto">
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 mb-8">
              Your Cart
            </h1>
            {Cart.map((items, i) => (
              <div
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-green-700 justify-between items-center"
                key={i}
              >
                <img
                  src={items.url}
                  alt="/"
                  className="h-[20vh] md:h-[10vh] object-cover"
                />
                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-4">
                  <h1 className="text-xl md:text-2xl text-zinc-900 font-semibold text-start">
                    {items.title}
                  </h1>
                  <p className="text-sm md:text-normal text-zinc-900 mt-2 hidden lg:block">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-sm md:text-normal text-zinc-900 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0, 65)}...
                  </p>
                  <p className="text-sm md:text-normal text-zinc-900 mt-2 block md:hidden">
                    {items.desc.slice(0, 50)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between md:justify-start">
                  <h2 className="text-black text-2xl md:text-3xl font-semibold flex">
                    ৳ {items.price}
                  </h2>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 p-2 ml-4 md:ml-12"
                    onClick={() => deletedItem(items._id)}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}

            {Cart && Cart.length > 0 && (
              <div className="mt-4 w-full flex intem-center justify-end">
                <div className="p-4 bg-green-700 rounded">
                  <h1 className="text-3xl text-black font-semibold">
                    Total Amount
                  </h1>
                  <div className="mt-3 flex items-center justify-between text-xl text-zinc-900">
                    <h2>{Cart.length} Services </h2> <h2>৳ {Total}</h2>
                  </div>
                  <div className="w-[100%] mt-3">
                    <button
                      className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold"
                    onClick={PlaceOrder}>
                      Place Your Order
                    </button>          
                  </div>
                </div>
              </div>   
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;