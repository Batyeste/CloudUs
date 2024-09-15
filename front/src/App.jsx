import logo from './logo.svg';
import { useState } from "react";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Accueil from './components/Accueil.jsx';
import Signup from './components/Signup.jsx';
import alreadyAcc from './components/alreadyAcc.jsx';
import FacturePDF from './components/FacturePDF.jsx'; 

import './App.css';
import Button from 'react-bootstrap/Button';
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pdf" element={<FacturePDF />} /> 

        {/* <Route path="/produits" element={<Produits />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
