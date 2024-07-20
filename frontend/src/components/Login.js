import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }
    
        try {
            const response = await axios.post('https://localhost:7248/api/usuario/login', {
                email: username,
                senha: password
            });
    
            const { data } = response;
    
            if (data) {
                alert('Login efetuado');
                navigate('/home');
            } else {
                alert('Credenciais Inválidas');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
            
            <div className="link">
                <p>Cadastre-se <Link to="/signup">Sing Up</Link> </p>
            </div>
        </div>
    );
}

export default Login;
