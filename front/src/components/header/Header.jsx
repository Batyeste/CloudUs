import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import Accueil from "../Accueil";

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">
                <Link to={"/accueil"} className="cloudus-link">
                        <img src="/cloudUs.png" alt="CloudUs Logo" className="img-cloud"/>
                        <span>CloudUs</span>
                    </Link>
                </div>
                <ul className="navbar-nav">
                    <li><a href="#">Pourquoi nous choisir ?</a></li>
                    <li><a href="#">Nos produits</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#" className="signup-btn">S'inscrire</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
