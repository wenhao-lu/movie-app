import React, { useState } from 'react';
import { useAuth } from '../Auth';


// signup module in process

const Signup = ({ handleRegistrationSuccess }) => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Call the signup function from the useAuth hook to register the user
    signup(username, password)
      .then(() => {
        // Call the handleRegistrationSuccess function to handle successful registration
        handleRegistrationSuccess(username, password);
      })
      .catch((error) => {
        // Handle any errors that occurred during signup
        console.log('Signup error:', error);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
      <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
