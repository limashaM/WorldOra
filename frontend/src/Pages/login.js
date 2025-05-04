import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loginAnimation from "../Assests/Animation 4.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3001/api/login", { email, password })
      .then((response) => {
        const { data } = response;
        console.log(data);

        if (data.status === "success") {
          const user = data.user;
          console.log("Login successful!");

          sessionStorage.setItem("userID", user._id);
          sessionStorage.setItem("userEmail", user.email);
          sessionStorage.setItem("token", data.token);

          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });

          setTimeout(() => {
            navigate("/");
          }, 3000); // delay navigation to allow user to see toast
        } else {
          toast.error(data.message || "Incorrect email or password", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to log in:", error);
        toast.error("Failed to log in. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />

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
              Welcome Back to Worldora
            </h2>
            <p className="text-gray-600">Log in to your account</p>
          </div>

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
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-700 text-sm">Password</label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter 6 characters or more"
              required
              className="w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-blue-400 text-base"
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-base rounded-lg hover:bg-blue-700 transition duration-300"
          >
            LOGIN
          </button>
          <p className="mb-6 text-base text-gray-600">
            Doesn’t have an account yet?{" "}
            <a href="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
