import React, { Components } from 'react';
import TextField from '../components/textField.jsx';
import PasswordField from '../components/passwordField.jsx';
import LoginBtn from '../components/loginBtn.jsx';
import SignupLink from '../components/signupLink.jsx';
import GoogleLoginLink from '../components/googleLoginLink.jsx';

function Login() {
  return (
    <div className="login-container">
      <TextField inputText="Username" />
      <PasswordField />
      <LoginBtn />
      <SignupLink />
      <GoogleLoginLink />
    </div>
  );
}

export default Login;
