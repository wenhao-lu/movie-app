import React, { useState } from 'react';
import { useAuth } from '../Auth';

// login module in process

const Login = () => {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (userName === userPassword && userName !=="") {
      setIsLoggedIn(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please sign up first');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserPassword('');
  };

  const handleSignup = () => {
    setIsSigningUp(true);
  }

  if (isLoggedIn) {
    return (
      <div className="loginContainer">
        <p className="welcomeP">Welcome Back <span className='loggedName'>{userName}</span></p>
        <button className="logoutBtn" onClick={handleLogout}>Log out</button>
        <button className="watchlistBtn" >WATCHLIST</button>
      </div>
      
    );
  }
  

  if (isSigningUp) {
    return (
      <div className="loginContainer">
        <input
          className={`userName ${isSigningUp ? 'errorInput' : ''}`}
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className={`userPassword ${isSigningUp ? 'errorInput' : ''}`}
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className="signupBtn" onClick={handleLogin}>
          Sign Up
        </button>
      </div>
    );
  }


  return (
    <div className="loginContainer">
      <input
        className={`userName ${errorMessage ? 'errorInput' : ''}`}
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className={`userPassword ${errorMessage ? 'errorInput' : ''}`}
        type="password"
        placeholder="Password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      <button className="loginBtn" onClick={handleLogin}>
        Login
      </button>
      <button className="signupBtn" onClick={handleSignup}>
        Sign Up
      </button>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;

