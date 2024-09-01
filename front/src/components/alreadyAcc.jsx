import React from 'react';

const alreadyAcc = () => {
    return (
        <div className="connexion-container">
            <p className='connexion-text'>Vous avez déjà un compte ?</p>
            <a href="/login" className="connexion-link">Connectez-vous</a>
        </div>
    );
};

export default alreadyAcc;
