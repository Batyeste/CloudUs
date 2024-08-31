import logo from './logo.svg';
import { useState } from "react";
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import './App.css';
import Button from 'react-bootstrap/Button';

function App() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
