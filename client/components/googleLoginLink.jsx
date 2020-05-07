import React, { Components } from 'react';
import { Link } from 'react-router-dom';

function GoogleLoginLink() {
  return (
    <Link to="/google-OAth" className="btn google-login-btn">Login with Google</Link>
  );
}

export default GoogleLoginLink;
