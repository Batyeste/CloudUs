import React, { useState } from 'react';
import "./Signup.css";
import alreadyAcc from './alreadyAcc';

const SignUp = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="form-container">
            <h2>Créer votre compte</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="submit-button">S'inscrire</button>
            </form>
            <div> 
            <alreadyAcc/>

            </div>
           
        </div>
    );
};

export default SignUp;