import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const Login = () => {
    const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        alert("All Fields are required");
      }
      else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-in",
          values
        );
        dispatch(authActions.login());
        if (response && response.data) {
          dispatch(authActions.changeRole(response.data.role));
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
        }
        console.log(response);
        navigate("/profile");
      }
    }
    catch (error) {
      alert(error.response.data.message);
    }
  }; 

  return (
    <div className="min-h-screen bg-zinc-200 px-4 py-8 flex items-center justify-center">
      <div className="bg-green-800 rounded-lg px-8 py-5 w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/4">
        <p className="text-white text-xl">Sign In</p>
        <div className="mt-4">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-white text-zinc-800 p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={values.username}
            onChange={change}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">
            Password
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-white text-zinc-800 p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={values.password}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:text-red-500" onClick={submit}>
            Log In
          </button>
        </div>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold"> Or </p>
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Don't have an account? &nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;