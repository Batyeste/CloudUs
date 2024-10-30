import React, { useState } from 'react';

const VerificationCode = ({ formData, handleChange, setGeneratedCode }) => {
    const [generatedCode, setLocalGeneratedCode] = useState('');
    const [codeGenerated, setCodeGenerated] = useState(false);

    const generateCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase(); 
        setLocalGeneratedCode(code);
        setGeneratedCode(code); 
        setCodeGenerated(true);
        console.log('Code de vérification généré et envoyé :', code);

        // a lier avec le back-end mailing etc
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
                    onChange={handleChange}
                    disabled={!codeGenerated}
                />
            </div>

            <button className="submit-button" type="button" onClick={generateCode}>
                Générer un nouveau code
            </button>
            <p>Un mail vous sera envoyé !</p>
        </div>
    );
};

export default VerificationCode;