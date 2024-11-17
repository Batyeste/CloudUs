import React from 'react';
import { Link } from 'react-router-dom';
import './Page404.css';

export default function Page404() {
    return (
        <div className="t-404-center">
            <div className="container-colors">
                <div className="max-w-md">
                    <div className="t-404">404</div>
                    <p className="text-lign">
                        Oops cette page n'existe pas...
                    </p>
                    <p className="mb-8">
                        Pas de soucis, revenez dans la bonne direction sur ce bouton :)
                    </p>
                    <Link to="/" className="link-button">
                        Page d'accueil
                    </Link>
                </div>
                <div className="error-image"></div>
            </div>
        </div>
    );
}