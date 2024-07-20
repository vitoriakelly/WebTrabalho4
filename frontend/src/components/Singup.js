import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Singup.css';

function Signup() {
  const [nome, setName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !senha.trim()) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    const user = { nome, email, senha };

    try {
        const response = await fetch('https://localhost:7248/api/usuario/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Erro na autenticação');
        }
        navigate('/my-list');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao autenticar. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container"> {}
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Signup;
