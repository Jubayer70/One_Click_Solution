import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';

const UpdateServices = () => {
  const [Data, setData] = useState(
    {
      url: "",
      title: "",
      price: "",
      desc: "",
    }
  );

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  
  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  servicesid: id,
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.price === "" ||
        Data.desc === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-services",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          price: "",
          desc: "",
        });
        alert(response.data.message);
        navigate(`/view-services-details/${id}`)
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }
    useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-services-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, [id]);

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl fonr-semibold text-zinc-500 mb-8">
        Update Services
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400"> 
            Image
          </label>
          <input
            type='text'
            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of Service
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of services"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Price
          </label>
          <input
            type="number"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="price of Services"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Description 
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="Description of Services"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          onClick={submit}
        >
        Update services
        </button>
      </div>
    </div>
  )
}

export default UpdateServices

