import React, { useState } from 'react';
import '../styles/authModal.css';

function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Lógica inicio de sesión
      console.log('Logging in with', { email, password });
      // Aquí podrías llamar a tu API de login con fetch/axios
    } else {
      // Lógica registro
      console.log('Signin up with', { email, password });
      // Aquí podrías llamar a tu API de registro con fetch/axios
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {isLogin ? (
          <div>
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Log in</button>
            </form>
            <p>Don't have an account? <span className="toggle" onClick={toggleForm}>Sign up here</span></p>
          </div>
        ) : (
          <div>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign up</button>
            </form>
            <p>Already have an account? <span className="toggle" onClick={toggleForm}>Log in here</span></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
