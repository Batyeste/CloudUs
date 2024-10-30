import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { CCarousel, CCarouselItem } from '@coreui/react';  
import "./Accueil.css";
import PricingCard from './CardPrice/PricingCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Accueil = () => {
    const navigate = useNavigate();  

    const formule1 = { prix: '10', stockage: '10', raison1: 'Support standard', raison2: '1Go de transfert' };
    const formule2 = { prix: '50', stockage: '50', raison1: 'Support prioritaire', raison2: '10Go de transfert'  };
    const formule3 = { prix: '100', stockage: '100', raison1: 'Support 7/7', raison2: '50Go de transfert'  };

    const handleCardClick = (price, storage) => {
        navigate('/signup');  
    };

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

            {/* Section Témoignages Carrousel */}
            <div className='testimonials'>
                <h2>Ce que nos utilisateurs disent</h2>
                <CCarousel controls className="custom-carousel">
                    <CCarouselItem className="custom-carousel-item">
                        <div className='testimonial-item'>
                            <p>"CloudUs m'a permis de centraliser mes fichiers tout en restant mobile. Un service fiable et rapide !"</p>
                            <p>- Xavier Niel, Directeur</p>
                        </div>
                    </CCarouselItem>
                    <CCarouselItem className="custom-carousel-item">
                        <div className='testimonial-item'>
                            <p>"Le partage facile des fichiers a vraiment changé la manière dont mon équipe collabore."</p>
                            <p>- Lucas Moreau, CEO de Safran</p>
                        </div>
                    </CCarouselItem>
                    <CCarouselItem className="custom-carousel-item">
                        <div className='testimonial-item'>
                            <p>"Je suis impressionné par la sécurité de la plateforme, surtout pour mes documents sensibles."</p>
                            <p>- Caroline Petit, Avocate</p>
                        </div>
                    </CCarouselItem>
                </CCarousel>
            </div>

            {/* Section "Comment ça marche" */}
            <div className='how-it-works'>
                <h2>Comment ça marche ?</h2>
                <div className='step'>
                    <h3>1. Inscrivez-vous</h3>
                    <p>Créez un compte en quelques minutes et commencez à utiliser notre plateforme.</p>
                </div>
                <div className='step'>
                    <h3>2. Téléchargez vos fichiers</h3>
                    <p>Ajoutez vos documents en toute sécurité dans le cloud.</p>
                </div>
                <div className='step'>
                    <h3>3. Partagez et collaborez</h3>
                    <p>Collaborez facilement avec votre équipe où que vous soyez.</p>
                </div>
            </div>

            {/* Section Abonnements */}
            <div className='pricing'>
                <h2>Choisissez le plan qui vous correspond</h2>
                <div className='pricing-plan'>
                    <PricingCard
                        title="Standard"
                        price={formule1.prix}
                        storage={formule1.stockage}
                        raison1={formule1.raison1}
                        raison2={formule1.raison2}
                        onClick={() => handleCardClick(formule1.prix, formule1.stockage)}
                    />
                </div>
                <div className='pricing-plan'>
                    <PricingCard
                        title="Premium"
                        price={formule2.prix}
                        storage={formule2.stockage}
                        raison1={formule2.raison1}
                        raison2={formule2.raison2}
                        onClick={() => handleCardClick(formule2.prix, formule2.stockage)}
                    />
                </div>
                <div className='pricing-plan'>
                    <PricingCard
                        title="Pro"
                        price={formule3.prix}
                        storage={formule3.stockage}
                        raison1={formule3.raison1}
                        raison2={formule3.raison2}
                        onClick={() => handleCardClick(formule3.prix, formule3.stockage)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Accueil;
