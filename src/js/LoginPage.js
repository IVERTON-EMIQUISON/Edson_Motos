import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importe o contexto

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);

        // Simulação de autenticação: verifique credenciais hardcoded
        if (username === 'iverton' && password === '123456') {
            const fakeToken = 'some-super-secret-token';
            login(fakeToken); // Atualiza o estado de autenticação e salva o token
            navigate('/admin'); // Redireciona para a página de administração
        } else {
            setError('Usuário ou senha inválidos.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Usuário:
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </label>
                <label>
                    Senha:
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </label>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginPage;