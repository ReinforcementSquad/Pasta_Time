import React, { Components } from 'react';
import TextField from '../components/textField.jsx';
import PasswordField from '../components/passwordField.jsx';
import LoginBtn from '../components/loginBtn.jsx';
import LoginLink from '../components/loginLink.jsx';
import SignupLink from '../components/signupLink.jsx';

function GoogleLogin() {
  return (
    <div className="login-container">
      <TextField inputText="Username" />
      <PasswordField />
      <LoginBtn />
      <LoginLink />
      <SignupLink />
    </div>
  );
}

export default GoogleLogin;
