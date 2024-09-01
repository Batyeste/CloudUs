import logo from './logo.svg';
import { useState } from "react";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Accueil from './components/Accueil.jsx';
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

        {/* <Route path="/produits" element={<Produits />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
