import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { getToken } from '../../utils/auth';

const Header = () => {
    const [token, setToken] = useState(null); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const storedToken = getToken();
        setToken(storedToken); 
    }, []);

    // pour déconnecter l'utilisateur
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setToken(null); 
        navigate('/login'); 
    };

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
                                <Link to="/contact" className="nav-link">Contact</Link>
                            </li>
                            {!token ? (
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link signup-btn">S'inscrire</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/drive" className="nav-link">Votre drive</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add-stockage" className="nav-link">Ajouter du stockage</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="nav-link logout-btn">Se déconnecter</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
