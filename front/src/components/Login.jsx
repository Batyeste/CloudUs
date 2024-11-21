import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCloud } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';  // Correction de l'import
import { loginUser } from '../functions/CallApi/callLogin';
import theme from './theme/theme';

const Login = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');  // Ajout de l'état pour gérer les erreurs

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser l'erreur avant chaque nouvelle tentative de connexion

        try {
            const response = await loginUser({ username, password });

            if (response.token) {
                localStorage.setItem('token', response.token);
                const decodedToken = jwtDecode(response.token);
                console.log('Token décodé :', decodedToken);

                if (decodedToken.roles.includes('ROLE_ADMIN')) {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/drive';
                }
            } else {
                console.error('Erreur de connexion :', response.error);
                setError('Adresse email ou mot de passe incorrect');  // Message d'erreur personnalisé
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Adresse email ou mot de passe incorrect');  // Message d'erreur pour l'erreur 401
            } else {
                setError('Une erreur s\'est produite, veuillez réessayer plus tard');  // Autre erreur
            }
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
            <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                <FontAwesomeIcon icon={faCloud} size="3x" color={theme.palette.primary[500]} />
            </Box>
            <Typography variant="h2" sx={{ marginBottom: 2 }}>
                Connexion
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 400 }}>
                <TextField
                    label="Adresse mail"
                    type="email"
                    variant="filled"
                    fullWidth
                    required
                    value={username}
                    onChange={handleEmailChange}
                    sx={{ marginBottom: 2 }}
                />
                <Box sx={{ position: 'relative', marginBottom: 3 }}>
                    <TextField
                        label="Mot de passe"
                        type={showPassword ? 'text' : 'password'}
                        variant="filled"
                        fullWidth
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <IconButton
                        onClick={toggleShowPassword}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 8,
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </IconButton>
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    sx={{ ...theme.components.MuiButton.styleOverrides.primaryButton }}
                    fullWidth
                >
                    Se connecter
                </Button>
            </Box>
            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.tertiary', marginBottom: 1 }}
                >
                    Vous n'avez pas de compte ?
                </Typography>
                <Button
                    href="/signup"
                    sx={{ ...theme.components.MuiButton.styleOverrides.secondaryButton }}
                    fullWidth
                >
                    Inscrivez-vous
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
