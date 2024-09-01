import React from 'react';
import { Link } from 'react-router-dom';
import "./Accueil.css";

const Accueil = () => {
    return (
        <div className='accueil-container'>
            {/* Hero Section */}
            <div className='first'>
                <h1>La dernière génération de stockage dans le cloud !</h1>
                <p>Sécurisé, rapide et accessible partout.</p>
                <Link to="/signup" className='cta-button'>Créer un compte</Link>
            </div>

            {/* Section des features */}
            <div className='features'>
                <h2>Pourquoi choisir notre Cloud ?</h2>
                <div className='features-list'>
                    <div className='feature-item'>
                        <h3>Sécurité Avancée</h3>
                        <p>Protégez vos données avec nos protocoles de sécurité de pointe.</p>
                    </div>
                    <div className='feature-item'>
                        <h3>Vitesse Éclair</h3>
                        <p>Accédez à vos fichiers en un instant grâce à notre infrastructure optimisée.</p>
                    </div>
                    <div className='feature-item'>
                        <h3>Partage Facile</h3>
                        <p>Partagez vos documents avec vos collègues en quelques clics.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;
