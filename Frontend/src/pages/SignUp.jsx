import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const navigate = useNavigate();
  
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.email === "" || Values.password === "" || Values.contact === "" || Values.address === "") {
        alert("All Fields are required");
      }
      else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up",
          Values
        );
        alert(response.data.message);
        navigate("/LogIn");
      }
    }
    catch (error) {
       alert(error.response.data.message);
    }
  }; 

  return (
    <div className="h-auto bg-zinc-200 px-12 py-8 flex items-center justify-center">
      <div className="bg-green-700 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-white texl-xl">Sign Up</p>
        <div className="mt-1">
          <label htmlFor="" className="text-white">
            Username
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
          />
        </div>
        <div className="mt-1">
          <label htmlFor="" className="text-white">
            Email
          </label>
          <input
            type="email"
            className="w-full mt-2 bg-white text-zinc-900 p-2 outline-none"
            placeholder="abc@gamil.com"
            name="email"
            required
            value={Values.email}
            onChange={change}
          />
        </div>
        <div className="mt-1">
          <label htmlFor="" className="text-white">
            Password
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text- p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
          />   
        </div>
        <div className="mt-1">
          <label htmlFor="" className="text-white">
           Contact Number
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            placeholder="contact"
            name="contact"
            required
            value={Values.contact}
            onChange={change}
          />   
        </div>
        <div className="mt-1">
          <label htmlFor="" className="text-white">
           Address
          </label>
          <textarea
            className="w-full mt-2 bg-white text-black p-2 outline-none"
            rows="5"
            placeholder="address"
            name="address"
            required
            value={Values.address}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-red-500" onClick={submit}>
            SignUP
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-white font-semibold"> Or </p>
        <p className="flex mt-4 items-center justify-center text-white font-semibold">
          Already have an account? &nbsp;  
          <Link to="/login" className="hover:text-blue-500">
            <u>LogIn</u>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup;
