import React, { Components } from 'react';
import TextField from '../components/textField.jsx';
import PasswordField from '../components/passwordField.jsx';
import SignupBtn from '../components/signupBtn.jsx';
import LoginLink from '../components/loginLink.jsx';

function Signup() {
  return (
    <div className="signup-container">
      <TextField inputText="Username" />
      <PasswordField />
      <SignupBtn />
      <LoginLink />
    </div>
  );
}

export default Signup;
