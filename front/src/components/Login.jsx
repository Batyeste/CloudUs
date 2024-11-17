import React, { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCloud } from '@fortawesome/free-solid-svg-icons';
import { jwtDecode } from 'jwt-decode';  // Correction de l'import
import { loginUser } from '../functions/CallApi/callLogin';

const Login = () => {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await loginUser({ username, password });

        if (response.token) {
            // Stocker le token dans le localStorage
            localStorage.setItem('token', response.token);

            // Décoder le token
            const decodedToken = jwtDecode(response.token);
            console.log('Token décodé :', decodedToken); // Affiche les informations du token

            // Vérifier les rôles dans le token
            if (decodedToken.roles.includes('ROLE_ADMIN')) {
                // Rediriger vers la page admin si l'utilisateur est un administrateur
                window.location.href = '/admin';
            } else {
                // Rediriger vers la page par défaut (par exemple, /drive ou autre)
                window.location.href = '/drive';
            }
        } else {
            console.error('Erreur de connexion :', response.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="login-icon">
                <FontAwesomeIcon icon={faCloud} size="3x" />
            </div>
            <h2>Connexion</h2>
            <div className="form-group">
                <label htmlFor="email">Adresse mail</label>
                <input
                    type="email"
                    id="email"
                    value={username}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="password-container">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={toggleShowPassword}
                        className="toggle-password"
                    />
                </div>
            </div>
            <button type="submit" className="submit-btn">Se connecter</button>
            <div className="connexion-container">
                <p className='connexion-text'>Vous n'avez pas de compte ?</p>
                <a href="/signup" className="connexion-link">Inscrivez-vous</a>
            </div>
        </form>
    );
};

export default Login;
