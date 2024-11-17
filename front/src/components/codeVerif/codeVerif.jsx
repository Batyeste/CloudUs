import React, { useState } from 'react';
import { registerCode } from '../../functions/CallApi/callCode';

const VerificationCode = ({ formData, handleChange, setGeneratedCode }) => {
    const [statusMessage, setStatusMessage] = useState('');
    const [sentCode, setSentCode] = useState(''); // Stocke le code envoyé

    const generateCode = async () => {
        try {
            // Appel à registerCode pour envoyer le code par email
            const response = await registerCode({ email: formData.email });

            if (!response.error) {
                const receivedCode = response;

                setSentCode(receivedCode); // Sauvegarde du code envoyé
                setGeneratedCode(receivedCode); // Envoie le code au composant parent
                setStatusMessage('Le code de vérification a été envoyé par email.');
            } else {
                setStatusMessage('Erreur lors de l\'envoi de l\'email. Veuillez réessayer.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            setStatusMessage('Erreur lors de la connexion au serveur.');
        }
    };

    const handleInputChange = (e) => {
        handleChange(e); 
    };

    return (
        <div>
            <div className="form-group">
                <label htmlFor="verifCode">Code de vérification</label>
                <input
                    type="text"
                    id="verifCode"
                    name="verifCode"
                    value={formData.verifCode}
                    onChange={handleInputChange}
                    placeholder="Entrez le code reçu par email"
                />
            </div>

            <button className="submit-button" type="button" onClick={generateCode}>
                Générer un nouveau code
            </button>
            <p>{statusMessage}</p>
        </div>
    );
};

export default VerificationCode;
