import React from 'react';
import "./Header.css";

const Header = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar-brand">
                <a href="#" class="cloudus-link">
                    <img src="/cloudUs.png" alt="CloudUs Logo" class="img-cloud"/>
                    <span>CloudUs</span>
                </a>

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
