import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Register.scss';

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (isRegistering) {
      if (!username) newErrors.username = 'Username is required';
      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      else if (!/^[^\d]+$/.test(username)) newErrors.username = 'Username cannot be numeric';
    } else {
      if (!email) newErrors.email = 'Email is required';
      if (!password) newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isRegistering) {
        const userData = { username, email, password };
        localStorage.setItem('userData', JSON.stringify(userData));
        alert('Registration successful!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        alert('Login successful!'); 
      }
    }
  };


  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="register-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }} 
    >
      <h2>{isRegistering ? 'Register' : 'Sign In'}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <motion.div 
            className="form-field"
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.3 }}
          >
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </motion.div>
        )}
        <motion.div 
          className="form-field"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.3 }}
        >
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </motion.div>
        <motion.div 
          className="form-field"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.3 }}
        >
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </motion.div>
        <button type="submit">{isRegistering ? 'Register' : 'Sign In'}</button>
      </form>
      <motion.p 
        onClick={() => {
          
          setIsRegistering(!isRegistering);
        }} 
        className="toggle"
        whileHover={{ scale: 1.05 }} 
        transition={{ duration: 0.2 }}
      >
        {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
      </motion.p>
    </motion.div>
  );
};

export default Register;
