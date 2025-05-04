import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Lottie from "lottie-react";
import loginAnimation from "../Assests/Animation 4.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const payload = {
        firstname,
        lastname,
        email,
        password,
      };

      Axios.post('http://localhost:3001/api/createUser', payload)
        .then((response) => {
          toast.success('Account created successfully!');
          navigate('/login');
        })
        .catch((error) => {
          if (error.response?.data?.message) {
            toast.error(error.response.data.message);
          } else if (error.request) {
            toast.error('No response from server. Please try again.');
          } else {
            toast.error('Something went wrong. Please try again later.');
          }
        });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!firstname) {
      formErrors.firstname = "First Name is required.";
      isValid = false;
    }

    if (!lastname) {
      formErrors.lastname = "Last Name is required.";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer position="top-center" autoClose={3000} />
      
      {/* Left side animation and tagline */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-white-100">
        <div className="w-full max-w-xl p-4 text-center">
          <Lottie animationData={loginAnimation} loop={true} />
          <div className="text-center mt-6 text-sm text-gray-600">
            <p>
              <strong>Discover the World, One Country at a Time.</strong>
              <br />
              Explore cultures, facts, and stories from every nation, 
              <br />
              all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white p-10 shadow-2xl rounded-2xl"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Sign Up to Worldora
            </h2>
            <p className="text-gray-600">Create your account</p>
          </div>

          {/* First Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">
              First Name
            </label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              placeholder="Enter your first name"
              required
              className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 text-base"
            />
            {errors.firstname && <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>}
          </div>

          {/* Last Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              placeholder="Enter your last name"
              required
              className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 text-base"
            />
            {errors.lastname && <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 text-base"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a password"
              required
              className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 text-base"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-base rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <p className="mb-6 text-base text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
