import React, { useState } from 'react';
import { registerCode } from '../../functions/CallApi/callCode';
import { TextField, Box, Typography, Button } from '@mui/material';
import theme from '../theme/theme';


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
<Box mb={10}>
            <Box mb={2}>
                <Typography variant="h3" gutterBottom>
                    Code de vérification
                </Typography>
                <TextField
                    fullWidth
                    label="Code de vérification"
                    id="verifCode"
                    name="verifCode"
                    value={formData.verifCode}
                    onChange={handleInputChange}
                    placeholder="Entrez le code reçu par email"
                    variant="filled"
                />
            </Box>

            <Box mb={2}>
                <Button 
                    variant="contained" 
                    sx={{ ...theme.components.MuiButton.styleOverrides.secondaryButton }}
                    onClick={generateCode}
                    fullWidth
                >
                    Générer un nouveau code
                </Button>
            </Box>

            {statusMessage && (
                <Typography variant="body2" color="textSecondary">
                    {statusMessage}
                </Typography>
            )}
        </Box>
    );
};

export default VerificationCode;
