import React, { useState } from 'react';
import "./Signup.css";
import { useNavigate } from 'react-router-dom'; 
import PricingCard from './CardPrice/PricingCard';
import VerificationCode  from './codeVerif/codeVerif';
import { TextField, Box, Typography, Button } from '@mui/material';
import theme from './theme/theme';
import PaiementMethod from './PaiementMethod/PaiementMethod';



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
    const formule1 = { prix: '20', stockage: '10', raison1: 'Support standard', raison2: '1Go de transfert' };

    const handlePrevious = () => {
        // si supérieur à l'étape 1
        if (step > 1) {
            setStep(step - 1); //-- Revient à l'étape précédente 
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '88vh',
                backgroundColor: 'background.default',
                padding: 3,
            }}
        >
            <Typography variant="h2" sx={{ marginBottom: 5 }}>
                Créer votre compte
            </Typography>

            {step === 1 && (
                <Box sx={{width: '25vw'}}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Nom"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Prénom"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Téléphone"
                            id="tel"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            type="tel"
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Adresse postale"
                            id="adressePostale"
                            name="adressePostale"
                            value={formData.adressePostale}
                            onChange={handleChange}
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Mot de passe"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            variant="filled" // Style Filled
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Confirmer le mot de passe"
                            id="confirm-password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            type="password"
                            variant="filled" // Style Filled
                        />
                    </Box>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                </Box>
            )}


            {step === 2 && (
                <Box sx={{
                    width: '25vw'      
                }}>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Nom de votre société"
                            id="nomSoce"
                            name="nomSoce"
                            value={formData.nomSoce}
                            onChange={handleChange}
                            variant="filled" 
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Adresse postale de votre société"
                            id="adressePostaleSoce"
                            name="adressePostaleSoce"
                            value={formData.adressePostaleSoce}
                            onChange={handleChange}
                            variant="filled" 
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Siret"
                            id="siret"
                            name="siret"
                            value={formData.siret}
                            onChange={handleChange}
                            maxLength={14}
                            variant="filled" 
                        />
                    </Box>
                    {siretError && <Typography color="error" variant="body2">{siretError}</Typography>}
                </Box>
            )}

            {step === 3 && (
                <Box>
                    <VerificationCode
                        formData={formData}
                        handleChange={handleChange}
                        setGeneratedCode={setGeneratedCode}
                    />
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                </Box>
            )}


            {step === 4 && (
                <Box mb={5}>
                    <Box className="pricing-container">
                        <PricingCard
                            title="Standard"
                            price={formule1.prix}
                            storage={formule1.stockage}
                            raison1={formule1.raison1}
                            raison2={formule1.raison2}
                            onClick={() => handleCardClick(formule1.prix, formule1.stockage)}
                        />
                    </Box>
                    {error && <Typography color="error" variant="body2">{error}</Typography>}
                </Box>
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
                <Box sx={{
                    width: '25vw'      
                }}>
                    {step > 1 && <Button type="button" onClick={handlePrevious} sx={{...theme.components.MuiButton.styleOverrides.primaryButton, mb: 1}} fullWidth>Précédent</Button>}
                    {step !== 4 && <Button type="submit" sx={{ ...theme.components.MuiButton.styleOverrides.primaryButton }} fullWidth >
                        {step === 4 ? "S'inscrire" : "Suivant"}
                    </Button>}
                </Box>
            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.tertiary', marginBottom: 1 }}
                >
                    Vous avez déjà un compte ?
                </Typography>
                <Button
                    href="/login"
                    sx={{ ...theme.components.MuiButton.styleOverrides.secondaryButton }}
                    fullWidth
                >
                    Connectez-vous
                </Button>
            </Box>
        </Box>
    );
};

export default SignUp;
