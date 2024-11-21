import logo from './logo.svg';
import { useState } from "react";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import Accueil from './components/Accueil.jsx';
import Signup from './components/Signup.jsx';
import FacturePDF from './components/FacturePDF.jsx';
import Login from './components/Login.jsx';
import Page404 from './components/page404/Page404.jsx';
import Contact from './components/Contact/Contact.jsx';
import PageConnecte from './components/pageConnecte/PageConnecte.jsx';
import HomeAdmin from './pages/Admin/homeAdmin.jsx'
import AddStockage from './components/AddStockage/AddStockage.jsx';

import './App.css';
import Button from 'react-bootstrap/Button';
import { Link, Route, Routes } from "react-router-dom";
import InfosDetails from './pages/Admin/InfosDetails/InfosDetails.jsx';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pdf" element={<FacturePDF />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/drive" element={<PageConnecte />} />
        <Route path="/add-stockage" element={<AddStockage />} />
        {/* <Route path="/produits" element={<Produits />} />
        <Route path="/contact" element={<Contact />} /> */}

        {/* ADMIN */}
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/client-details/:clientId" element={<InfosDetails />} />
      </Routes>
      <Footer />

      

    </>
  );
}

export default App;
