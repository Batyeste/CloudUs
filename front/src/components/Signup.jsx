import React, { useState } from 'react';
import "./Signup.css";
import alreadyAcc from './alreadyAcc';

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
        tituleCB: '',
        paymentMethod: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    });

    const [step, setStep] = useState(1);
    const [error, setError] = useState('')
    const [siretError, setSiretError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;

        //-- si le champ est siret
        if (name === 'siret') {
            //-- Si le SIRET contient autre chose que des chiffres, erreur
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

        //-- partie numéro de carte valide
        if (name === "cardNumber" && value.length <= 16 && /^\d*$/.test(value)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        //-- partie CVV valide
        if (name === "cvv" && value.length <= 4 && /^\d*$/.test(value)) {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (name !== "cardNumber" && name !== "cvv" ) {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    //-- Validation des étapes - Etape 1 du formulaire
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

    //-- Validation des étapes - Etape 2 du formulaire
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

    //-- Validation des étapes - Etape 3 du formulaire
    const validateStep3 = () => {
        if (!formData.verifCode) {
            setError("Le code de vérification est requis !");
            return false;
        }
        return true;
    };

    //-- Validation des étapes - Etape 4 du formulaire
    const validateStep4 = () => {
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

//-- A faire : 
//-- Si la deuxième étape est valide, envoyer un mail de vérification à l'adresse e-mail fournie
//-- Donc créer un script qui envoie un mail de vérif avec un code aléatoire qui sera retourner par la fonction et qui sera comparé avec celui écrit

//-- Mettre à l'étape 4 un choix d'abonnement (genre 3 cartes, 9,99, 14,99 et 50,99 euros par mois) et espace de stockage (10, 50, 100 Go)
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        //-- vérif pour l'étape 1
        //-- Validation des étapes
        if (step === 1 && validateStep1()) {
            setStep(2); //-- Passe à l'étape 2 si valide
        } else if (step === 2 && validateStep2()) {
            setStep(3); //-- Passe à l'étape 3 si valide
        } else if (step === 3 && validateStep3()) {
            setStep(4); //-- Passe à l'étape 4 si valide
        } else if (step === 4 && validateStep4()) {
            console.log('Form Data:', formData);
        } else {
            console.log('Error:', error);
        }
    };

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
                        <div className="form-group">
                            <label htmlFor="verifCode">Code de vérification</label>
                            <input 
                                type="text" id="verifCode" name="verifCode" value={formData.verifCode} onChange={handleChange} />
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <div className="form-group">
                            <label htmlFor="tituleCB">Titulaire carte</label>
                            <input type="text" id="tituleCB" name="tituleCB" value={formData.tituleCB} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="paymentMethod">Méthode de paiement</label>
                            <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                                <option value="">Sélectionnez une méthode</option>
                                <option value="creditCard">Carte de crédit</option>
                                <option value="paypal">PayPal</option>
                                <option value="bankTransfer">Virement bancaire</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cardNumber">Numéro de carte</label>
                            <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} maxLength={16}/>
                        </div>

                        <div className="form-group">
                            <label>Date d'expiration</label>
                            <div>
                                <select id="expiryMonth" name="expiryMonth" value={formData.expiryMonth} onChange={handleChange} >
                                    <option value="">Mois</option>
                                    {[...Array(12)].map((_, i) => (
                                        <option key={i+1} value={i+1 < 10 ? `0${i+1}` : i+1}>
                                            {i+1 < 10 ? `0${i+1}` : i+1}
                                        </option>
                                    ))}
                                </select>

                                <select id="expiryYear" name="expiryYear" value={formData.expiryYear} onChange={handleChange} >
                                    <option value="">Année</option>
                                    {[...Array(10)].map((_, i) => (
                                        <option key={i} value={new Date().getFullYear() + i}>
                                            {new Date().getFullYear() + i}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} maxLength={4}/>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}  

                <div className="form-navigation">
                    {step > 1 && <button type="button" className="submit-button" onClick={handlePrevious}>Précédent</button>}
                    <button type="submit" className="submit-button">
                        {step === 4 ? "S'inscrire" : "Suivant"}
                    </button>
                </div>
            </form>
            {/* <div>
                <alreadyAcc />
            </div> */}
        </div>
    );
};

export default SignUp;
