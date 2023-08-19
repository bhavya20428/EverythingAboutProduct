import React from "react";
import { Route,BrowserRouter as Router,Routes } from "react-router-dom";
import Product from "./product";
import Seller from "./seller";
import Admin from "./admin";
import Customer from "./customer";
import Signin from "./signin";
import Notfound from "./notfound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Signin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  ); 
  
}


export default App;
