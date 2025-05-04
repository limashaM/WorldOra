import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import Login from "./Pages/login";
import SignUp from "./Pages/signup";
import Countries from "./Pages/countries";
import Details  from "./Pages/Details";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/details/:countryCode" element={<Details />} />   
      </Routes>
  </BrowserRouter>
);

reportWebVitals();
