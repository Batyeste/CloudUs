import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";

const Header = () => {
    return (
        <div className="header-container">
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="navbar-brand">
                        <Link to={"/accueil"} className="cloudus-link">
                            <img src="/img/cloudUs.png" alt="CloudUs Logo" className="img-cloud" />
                            <span>CloudUs</span>
                        </Link>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Pourquoi nous choisir ?</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Nos produits</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Contact</a>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link signup-btn">S'inscrire</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
