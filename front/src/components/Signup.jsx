import React, { useState } from 'react';
import "./Signup.css";
import { useNavigate } from 'react-router-dom'; 
import PricingCard from './CardPrice/PricingCard';
import VerificationCode  from './codeVerif/codeVerif';
import PaiementMethod from './PaiementMethod/PaiementMethod';

import { submitRegistration } from '../functions/CallApi/callRegister';

import { submitRegistration } from '../functions/CallApi/callRegister';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        adressePostale: '',
        password: '',
        confirmPassword: '',
        nomSoce: '',
        adressePostaleSoce: '',
        siret: '',
        verifCode: '',
        prix: '',
        stockage: '',
        tituleCB: '',
        paymentMethod: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [siretError, setSiretError] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        //-- Si le champ est SIRET
        if (name === 'siret') {
            //-- Vérification du format du SIRET
            if (!/^\d*$/.test(value)) {
                setSiretError('Le SIRET doit contenir uniquement des chiffres');
            } else if (value.length > 14) {
                setSiretError('Le SIRET ne doit pas dépasser 14 caractères');
            } else if (value.length < 14) {
                setSiretError('Le SIRET doit contenir 14 caractères');
            } else {
                setSiretError(''); 
            }
        }

        //-- Vérification du numéro de carte
        if (name === "cardNumber" && value.length <= 16 && /^\d*$/.test(value)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        //-- Vérification du CVV
        if (name === "cvv" && value.length <= 4 && /^\d*$/.test(value)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (name !== "cardNumber" && name !== "cvv") {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleCardClick = (price, storage) => {
        setFormData(prevFormData => ({ ...prevFormData, prix: price, stockage: storage }));
    };

    //-- Validation des étapes - Etape 1
    const validateStep1 = () => {
        if (!formData.nom || !formData.prenom || !formData.email || !formData.adressePostale || !formData.tel || !formData.password || !formData.confirmPassword) {
            setError("Tous les champs sont obligatoires à l'étape 1.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return false;
        }
        return true;
    };

    //-- Validation des étapes - Etape 2
    const validateStep2 = () => {
        if (!formData.nomSoce || !formData.adressePostaleSoce || !formData.siret) {
            setError("Tous les champs sont obligatoires lors de cette étape !");
            return false;
        }
        if (siretError) {
            setError("Le SIRET n'est pas valide !");
            return false;
        }
        return true;
    };

    //-- Validation des étapes - Etape 3
    const validateStep3 = () => {
        if (!formData.verifCode) {
            setError("Le code de vérification est requis !");
            return false;
        }
        if (formData.verifCode !== generatedCode) {
            setError("Le code de vérification est incorrect !");
            return false;
        }
        return true;
    };

    //-- Validation des étapes - Etape 5
    const validateStep5 = () => {
        if (!formData.tituleCB || !formData.paymentMethod || !formData.cardNumber || !formData.expiryMonth || !formData.expiryYear || !formData.cvv) {
            setError("Tous les champs sont obligatoires lors de cette étape !");
            return false;
        }
        if (!/^\d{16}$/.test(formData.cardNumber)) {
            setError("Le numéro de carte doit comporter exactement 16 chiffres !");
            return false;
        }
        if (!/^\d{3,4}$/.test(formData.cvv)) {
            setError("Le CVV doit comporter 3 à 4 chiffres !");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        //-- Vérification des étapes
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        } else if (step === 3 && validateStep3()) {
            setStep(4);
        } else if (step === 4 ) {
            setStep(5);
        } else if (step === 5 && validateStep5()) {
            //-- Appel de la fonction submitRegistration
            const response = await submitRegistration(formData);
            if (response.success) {
                //-- Redirection vers la page de facture si tout est valide
                navigate('/pdf', { state: { formData } });
            } else {
                setError(response.data.error || 'Une erreur est survenue lors de l\'inscription.');
            }
        } else {
            console.log('Error:', error);
        }


    };
    const formule1 = { prix: '10', stockage: '10', raison1: 'Support standard', raison2: '1Go de transfert' };
    const formule2 = { prix: '50', stockage: '50', raison1: 'Support prioritaire', raison2: '10Go de transfert'  };
    const formule3 = { prix: '100', stockage: '100', raison1: 'Support 7/7', raison2: '50Go de transfert'  };

    const handlePrevious = () => {
        // si supérieur à l'étape 1
        if (step > 1) {
            setStep(step - 1); //-- Revient à l'étape précédente 
        }
    };

    return (
        <div className="form-container">
            <h2>Créer votre compte</h2>
            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="nom">Nom</label>
                            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="prenom">Prénom</label>
                            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tel">Téléphone</label>
                            <input type="tel" id="tel" name="tel" value={formData.tel} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Adresse postale</label>
                            <input type="text" id="adressePostale" name="adressePostale" value={formData.adressePostale} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
                            <input type="password" id="confirm-password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="nom-soc">Nom de votre société</label>
                            <input type="text" id="nomSoce" name="nomSoce" value={formData.nomSoce} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="text">Adresse postale de votre société</label>
                            <input type="text" id="adressePostaleSoce" name="adressePostaleSoce" value={formData.adressePostaleSoce} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="siret">Siret</label>
                            <input type="text" id="siret" name="siret" value={formData.siret} onChange={handleChange} maxLength={14} />
                        </div>
                        {siretError && <p className="error-message">{siretError}</p>}
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <VerificationCode
                            formData={formData}
                            handleChange={handleChange}
                            setGeneratedCode={setGeneratedCode}
                        />
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <div className="pricing-container">
                        <PricingCard
                            title="Standard"
                            price={formule1.prix}
                            storage={formule1.stockage}
                            raison1={formule1.raison1}
                            raison2={formule1.raison2}
                            onClick={() => handleCardClick(formule1.prix, formule1.stockage)}
                        />
                        <PricingCard
                            title="Premium"
                            price={formule2.prix}
                            storage={formule2.stockage}
                            raison1={formule2.raison1}
                            raison2={formule2.raison2}
                            onClick={() => handleCardClick(formule2.prix, formule2.stockage)}
                        />    
                            <PricingCard
                            title="Pro"
                            price={formule3.prix}
                            storage={formule3.stockage}
                            raison1={formule3.raison1}
                            raison2={formule3.raison2}
                            onClick={() => handleCardClick(formule3.prix, formule3.stockage)}
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}
                
                {step === 5 && (
                    <div>
                       <PaiementMethod
                        formData={formData}
                        handleChange={handleChange}
                        error={error}
                    />
                    </div>
                )}  

                <div className="form-navigation">
                    {step > 1 && <button type="button" className="submit-button" onClick={handlePrevious}>Précédent</button>}
                    {step !== 4 && <button type="submit" className="submit-button">
                        {step === 4 ? "S'inscrire" : "Suivant"}
                    </button>}
                </div>
            </form>
            <div className="connexion-container">
                <p className='connexion-text'>Vous avez déjà un compte ?</p>
                <a href="/login" className="connexion-link">Connectez-vous</a>
            </div>
        </div>
    );
};

export default SignUp;
